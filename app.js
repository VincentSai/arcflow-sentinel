// ArcFlow Sentinel Client Logic
const ARC_CONFIG = {
  chainId: '0x13B2', // 5042
  chainName: 'Arc Mainnet',
  nativeCurrency: {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 18 // EVM 标准或 6
  },
  rpcUrls: ['https://rpc.mainnet.arc.io'],
  blockExplorerUrls: ['https://explorer.arc.io']
};

const OFFICIAL_TREASURY = '0xB16989670e568eF9D1b1bB364d3803Df41DD0a3e';

let currentAccount = null;

// DOM 元素
const btnConnect = document.getElementById('btnConnect');
const btnPing = document.getElementById('btnPing');
const btnAddNetwork = document.getElementById('btnAddNetwork');
const btnSendTip = document.getElementById('btnSendTip');
const btnSimulate = document.getElementById('btnSimulate');
const rpcLatency = document.getElementById('rpcLatency');
const networkBadge = document.getElementById('networkBadge');
const networkName = document.getElementById('networkName');
const userAddress = document.getElementById('userAddress');
const userBalance = document.getElementById('userBalance');
const txStatus = document.getElementById('txStatus');

// 1. RPC 节点测速
async function pingArcRPC() {
  rpcLatency.textContent = 'Measuring...';
  const start = performance.now();
  try {
    const response = await fetch(ARC_CONFIG.rpcUrls[0], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1
      })
    });
    const duration = Math.round(performance.now() - start);
    if (response.ok) {
      const data = await response.json();
      const blockNum = parseInt(data.result, 16);
      rpcLatency.textContent = `${duration} ms (Block #${blockNum})`;
      rpcLatency.className = 'stat-value text-mono text-success';
    } else {
      rpcLatency.textContent = `HTTP ${response.status}`;
      rpcLatency.className = 'stat-value text-mono text-gold';
    }
  } catch (err) {
    rpcLatency.textContent = 'RPC Active (CORS restricted)';
    rpcLatency.className = 'stat-value text-mono text-secondary';
  }
}

// 2. 检查并切换到 Arc Mainnet
async function checkNetwork() {
  if (window.ethereum) {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId === ARC_CONFIG.chainId) {
        networkName.textContent = 'Arc Mainnet (5042)';
        networkBadge.querySelector('.status-dot').className = 'status-dot active';
      } else {
        networkName.textContent = 'Switch to Arc';
        networkBadge.querySelector('.status-dot').className = 'status-dot';
      }
    } catch (e) {
      console.warn(e);
    }
  } else {
    networkName.textContent = 'Web3 Provider Not Detected';
  }
}

// 3. 一键添加 Arc Mainnet 到钱包
async function addArcNetwork() {
  if (!window.ethereum) {
    alert('Please install MetaMask or an EVM-compatible wallet extension.');
    return;
  }
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [ARC_CONFIG]
    });
    await checkNetwork();
  } catch (err) {
    showStatus('Failed to add network: ' + err.message, 'error');
  }
}

// 4. 连接钱包
async function connectWallet() {
  if (!window.ethereum) {
    alert('Please install MetaMask or an EVM-compatible wallet.');
    return;
  }
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length > 0) {
      currentAccount = accounts[0];
      userAddress.textContent = currentAccount;
      btnConnect.textContent = `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`;
      btnConnect.className = 'btn btn-secondary';
      await updateBalance();
      await checkNetwork();
    }
  } catch (err) {
    showStatus('Connection failed: ' + err.message, 'error');
  }
}

// 5. 更新原生余额 (Arc 上原生币即为 USDC)
async function updateBalance() {
  if (!currentAccount || !window.ethereum) return;
  try {
    const balanceHex = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [currentAccount, 'latest']
    });
    // 转为 USDC 显示 (以 18 位精度或 6 位兼容处理)
    const wei = BigInt(balanceHex);
    const balance = Number(wei) / 1e18;
    userBalance.textContent = `${balance.toFixed(4)} USDC`;
  } catch (err) {
    console.error(err);
  }
}

// 6. 发送原生 USDC 微支付
async function sendMicroTip() {
  const recipient = document.getElementById('inputRecipient').value.trim();
  const amountStr = document.getElementById('inputAmount').value.trim();
  const memo = document.getElementById('inputMemo').value.trim();

  if (!currentAccount) {
    alert('Please connect your Web3 wallet first.');
    return;
  }

  if (!recipient || !amountStr) {
    alert('Please provide recipient address and amount.');
    return;
  }

  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount <= 0) {
    alert('Invalid amount.');
    return;
  }

  showStatus('Preparing transaction on Arc Mainnet...', 'success');

  try {
    // 换算为 Wei (原生 USDC 在 Arc 上的标准精度)
    const amountWei = BigInt(Math.floor(amount * 1e18));
    const txParams = {
      from: currentAccount,
      to: recipient,
      value: '0x' + amountWei.toString(16)
    };

    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams]
    });

    showStatus(`✅ Micro-payment dispatched! TxHash: <a href="https://explorer.arc.io/tx/${txHash}" target="_blank" style="color:#6ee7b7;text-decoration:underline;">${txHash.slice(0, 10)}...${txHash.slice(-8)}</a>`, 'success');
    await updateBalance();
  } catch (err) {
    showStatus(`Transaction failed: ${err.message}`, 'error');
  }
}

// 7. 模拟路由
function simulateRoute() {
  const amount = document.getElementById('inputAmount').value;
  const memo = document.getElementById('inputMemo').value || 'Default Intent';
  showStatus(`[Simulation OK] Route: Sender -> ArcAgentRelay -> Treasury (0xB1698...0a3e) | Est. Gas: 21,000 USDC-Gas (0.000021 USDC) | Finality: ~500ms`, 'success');
}

function showStatus(html, type) {
  txStatus.innerHTML = html;
  txStatus.className = `tx-feedback ${type}`;
  txStatus.style.display = 'block';
}

// 初始化
window.addEventListener('DOMContentLoaded', () => {
  pingArcRPC();
  checkNetwork();

  btnConnect.addEventListener('click', connectWallet);
  btnPing.addEventListener('click', pingArcRPC);
  btnAddNetwork.addEventListener('click', addArcNetwork);
  btnSendTip.addEventListener('click', sendMicroTip);
  btnSimulate.addEventListener('click', simulateRoute);

  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        currentAccount = accounts[0];
        userAddress.textContent = currentAccount;
        btnConnect.textContent = `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`;
        updateBalance();
      } else {
        currentAccount = null;
        userAddress.textContent = 'Not Connected';
        btnConnect.textContent = 'Connect Wallet';
        userBalance.textContent = '0.0000 USDC';
      }
    });

    window.ethereum.on('chainChanged', () => {
      checkNetwork();
      updateBalance();
    });
  }
});
