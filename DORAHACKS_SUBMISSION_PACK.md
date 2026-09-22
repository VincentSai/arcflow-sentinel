# 🏆 Circle Arc Microgrants (DoraHacks) 申报全套交付包

> **资助目标**：Circle Arc Microgrants · $500 USDC Grant (共 20 个名额，总奖池 10,000 USDC)  
> **申请截止**：2026 年 10 月 14 日  
> **官方申报通道**：[DoraHacks - Arc Microgrants 申报页](https://dorahacks.io/hackathon)  
> **状态**：**代码已开源并上线公网，已完成 100% 准备，随时可点击提交！**

---

## 📌 一、项目核心档案 (Project Profile)

| 表单字段 | 提交内容 (中英双语版) |
| :--- | :--- |
| **Project Name (项目名称)** | **ArcFlow Sentinel** |
| **Tagline (一句话简介)** | Lightweight Sentinel Probe & Autonomous AI Agent Micro-Payment Gateway for Circle Arc Mainnet (USDC-Native Gas) |
| **Category / Track (赛道分类)** | Infrastructure / Agentic Economy / Dev Tools |
| **Live Demo URL (在线公网演示)** | [https://vincentsai.github.io/arcflow-sentinel/](https://vincentsai.github.io/arcflow-sentinel/) |
| **GitHub Repository (开源仓库)** | [https://github.com/VincentSai/arcflow-sentinel](https://github.com/VincentSai/arcflow-sentinel) |
| **Contract File (智能合约源码)** | [`contracts/ArcAgentRelay.sol`](https://github.com/VincentSai/arcflow-sentinel/blob/main/contracts/ArcAgentRelay.sol) |
| **Primary Network (部署网络)** | **Arc Mainnet (Chain ID: 5042)** |
| **Payout Wallet (指定收款金库)** | **`0xB16989670e568eF9D1b1bB364d3803Df41DD0a3e`** |

---

## 📝 二、申报文案与问答 (Submission Q&A Copy)

### Q1: What problem does your project solve? (你的项目解决了什么痛点？)
**英文提交内容**：
> Circle officially launched the Arc Mainnet on September 16, 2026, introducing an institutional-grade Layer-1 powered by native USDC gas and tailor-made for the "Agentic Economy". However, developers and autonomous AI agents currently lack lightweight, zero-dependency diagnostics to inspect RPC performance, monitor block propagation, and dispatch programmatic micro-payments.
> 
> ArcFlow Sentinel bridges this critical gap. It delivers a sub-second live RPC telemetry probe alongside an optimized smart contract relay (`ArcAgentRelay.sol`) that enables instant, frictionless USDC task bounties and tipping directly on Arc Mainnet without requiring external ERC-20 approval workflows.

**中文对照**：
> Circle 于 2026 年 9 月 16 日上线了 Arc 主网，作为以 USDC 为原生 Gas 的 Layer-1 基础设施，专为智能体（Agentic Economy）而生。然而，开发者和自主 AI Agent 目前缺乏轻量级、零依赖的节点健康诊断工具，以及原生的微支付任务中继。
> ArcFlow Sentinel 解决了这一核心痛点：提供毫秒级 RPC 节点探针与状态监测，并搭载了专为 Arc 原生 USDC 优化的智能合约中继（`ArcAgentRelay.sol`），支持 Agent 间无摩擦任务结算与即时打赏，免去繁琐的 ERC-20 approve 流程。

---

### Q2: What have you built and how does it run on Arc Mainnet? (你构建了什么？它是如何在 Arc 主网上运行的？)
**英文提交内容**：
> ArcFlow Sentinel fulfills the DoraHacks Microgrant mandate for **"something real that runs"**:
> 1. **Zero-Dependency Mainnet Probe**: Direct JSON-RPC telemetry communicating with `https://rpc.mainnet.arc.io` (Chain ID: 5042), bench-marking node latency and latest block sync.
> 2. **ArcAgentRelay.sol Smart Contract**: A gas-optimized Solidity contract designed specifically for Arc's native USDC architecture, handling escrowed task bounties and direct micro-tipping.
> 3. **Seamless Web3 Wallet Gateway**: Automatically injects Arc Mainnet configurations into MetaMask, OKX, and Rabby with one click.
> 4. **Live & Accessible**: Fully deployed and operational via GitHub Pages at `https://vincentsai.github.io/arcflow-sentinel/`.

**中文对照**：
> ArcFlow Sentinel 严格遵照 DoraHacks 资助所要求的“可实际运行的真实产品”：
> 1. **零依赖主网探针**：直连 `https://rpc.mainnet.arc.io`（Chain ID: 5042），实时测试节点延迟并校验区块高度同步；
> 2. **ArcAgentRelay.sol 智能合约**：针对 Arc 原生 USDC 架构定制，支持微任务托管分发与即时微支付中继；
> 3. **一键 Web3 钱包接入**：支持 MetaMask / OKX 一键配置并切换至 Arc Mainnet；
> 4. **公网可用**：已通过 GitHub Pages 在线部署，任何人打开链接即可体验。

---

### Q3: How will the $500 USDC microgrant be used? (这笔 500 USDC 资助将如何使用？)
**英文提交内容**：
> The $500 USDC grant will be used to:
> 1. Fund native USDC gas reserves on Arc Mainnet to sponsor contract deployments and keep automated heartbeat pinging active.
> 2. Expand ArcFlow Sentinel to support automated Agent-to-Agent (A2A) RPC load-balancing.
> 3. Maintain continuous open-source contribution to the Circle Arc developer ecosystem.

---

## 🛠️ 三、项目技术参数与验证指南

- **RPC URL**: `https://rpc.mainnet.arc.io`
- **Chain ID**: `5042` (`0x13B2`)
- **Gas Asset**: Native `USDC`
- **Explorer**: `https://explorer.arc.io`
- **Target Recipient Safe**: `0xB16989670e568eF9D1b1bB364d3803Df41DD0a3e`
