// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ArcAgentRelay
 * @notice 专为 Circle Arc 主网打造的 AI Agent 微支付中继与服务路由智能合约
 * @dev Arc 网络采用原生 USDC 支付 Gas 费。本合约支持 Agent 间的任务质押、微支付中继与自动结算。
 */
contract ArcAgentRelay {
    address public immutable owner;
    address public treasury;

    // 默认金库地址：绑定用户指定的安全收款钱包
    address public constant DEFAULT_TREASURY = 0xB16989670e568eF9D1b1bB364d3803Df41DD0a3e;

    // 任务状态
    enum TaskStatus { Created, Completed, Refunded }

    struct AgentTask {
        bytes32 taskId;
        address creator;
        address agent;
        uint256 rewardAmount;
        TaskStatus status;
        uint256 createdAt;
        string taskMetadataURI;
    }

    mapping(bytes32 => AgentTask) public tasks;
    uint256 public totalTasks;
    uint256 public totalVolumeUSDC;

    event TaskCreated(bytes32 indexed taskId, address indexed creator, address indexed agent, uint256 rewardAmount);
    event TaskCompleted(bytes32 indexed taskId, address indexed agent, uint256 rewardAmount);
    event TaskRefunded(bytes32 indexed taskId, address indexed creator, uint256 rewardAmount);
    event MicroTipReceived(address indexed from, address indexed to, uint256 amount, string memo);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner allowed");
        _;
    }

    constructor(address _treasury) {
        owner = msg.sender;
        treasury = _treasury != address(0) ? _treasury : DEFAULT_TREASURY;
    }

    /**
     * @notice 创建 Agent 付费任务并托管原生 USDC
     * @param taskId 唯一任务 ID
     * @param agent 指定履约 Agent 地址
     * @param taskMetadataURI 任务描述元数据
     */
    function createTask(bytes32 taskId, address agent, string calldata taskMetadataURI) external payable {
        require(msg.value > 0, "Reward must be > 0");
        require(tasks[taskId].createdAt == 0, "Task ID already exists");
        require(agent != address(0), "Invalid agent address");

        tasks[taskId] = AgentTask({
            taskId: taskId,
            creator: msg.sender,
            agent: agent,
            rewardAmount: msg.value,
            status: TaskStatus.Created,
            createdAt: block.timestamp,
            taskMetadataURI: taskMetadataURI
        });

        totalTasks += 1;
        totalVolumeUSDC += msg.value;

        emit TaskCreated(taskId, msg.sender, agent, msg.value);
    }

    /**
     * @notice 任务完成验收，资金划转给 Agent
     * @param taskId 任务 ID
     */
    function completeTask(bytes32 taskId) external {
        AgentTask storage t = tasks[taskId];
        require(t.status == TaskStatus.Created, "Task not active");
        require(msg.sender == t.creator || msg.sender == owner, "Unauthorized");

        t.status = TaskStatus.Completed;
        uint256 payout = t.rewardAmount;

        (bool success, ) = t.agent.call{value: payout}("");
        require(success, "Payout transfer failed");

        emit TaskCompleted(taskId, t.agent, payout);
    }

    /**
     * @notice 即时微支付 / 打赏中继（无锁直接到账）
     * @param recipient 接收者（Agent 或金库）
     * @param memo 附带备忘
     */
    function sendMicroTip(address recipient, string calldata memo) external payable {
        require(msg.value > 0, "Tip amount must be > 0");
        address target = recipient != address(0) ? recipient : treasury;

        (bool success, ) = target.call{value: msg.value}("");
        require(success, "Micro-tip transfer failed");

        totalVolumeUSDC += msg.value;
        emit MicroTipReceived(msg.sender, target, msg.value, memo);
    }

    /**
     * @notice 更新金库收款地址
     */
    function updateTreasury(address _newTreasury) external onlyOwner {
        require(_newTreasury != address(0), "Invalid address");
        treasury = _newTreasury;
    }

    // 接收原生币直接转账
    receive() external payable {
        (bool success, ) = treasury.call{value: msg.value}("");
        require(success, "Direct deposit forwarded to treasury");
    }
}
