# ⚡ ArcFlow Sentinel

> **Lightweight Sentinel Probe & Autonomous AI Agent Micro-Payment Gateway for Circle Arc Mainnet**  
> *Submitted for the Circle Arc Microgrants on DoraHacks.*

[![Live Portal](https://img.shields.io/badge/Live_Portal-GitHub_Pages-2775ca?style=flat-square)](https://vincentsai.github.io/arcflow-sentinel/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Network: Arc Mainnet](https://img.shields.io/badge/Network-Arc_Mainnet_5042-blue?style=flat-square)](https://explorer.arc.io)
[![Gas: Native USDC](https://img.shields.io/badge/Gas-Native_USDC-gold?style=flat-square)](https://arc.io)

---

## 🌟 Executive Summary

**ArcFlow Sentinel** is a purpose-built, zero-dependency Web3 portal and smart-contract relay designed for the newly launched **Circle Arc Mainnet (Chain ID: 5042)**.

With Arc introducing **USDC as the native gas asset** and targeting the **agentic economy**, AI agents and autonomous services need deterministic, sub-second latency diagnostics and micro-payment settlement primitives. 

ArcFlow Sentinel fulfills the DoraHacks Microgrant mandate for **"something real that runs"**:
1. **Live Arc Mainnet Probe**: Real-time measurement of RPC response time, block height synchronization, and chain connectivity.
2. **Autonomous Agent Micro-Payment Relay**: Contract-driven direct and task-based micro-payments powered by native USDC gas.
3. **One-Click EVM Integration**: Seamless wallet configuration (`wallet_addEthereumChain`) for MetaMask, OKX, and Rabby.

---

## 🏗️ Architecture & Core Components

```text
 ┌─────────────────────────────────────────────────────────┐
 │                   ArcFlow Web3 Portal                   │
 │           (GitHub Pages / Decentralized Web)            │
 └─────────────┬─────────────────────────────┬─────────────┘
               │ JSON-RPC                    │ Web3 Provider
               ▼                             ▼
 ┌───────────────────────────┐ ┌───────────────────────────┐
 │     Arc Mainnet RPC       │ │     User / Agent Wallet   │
 │ (https://rpc.mainnet.arc) │ │  (MetaMask / OKX / Agent) │
 └─────────────┬─────────────┘ └─────────────┬─────────────┘
               │                             │
               └──────────────┬──────────────┘
                              ▼
 ┌─────────────────────────────────────────────────────────┐
 │         ArcAgentRelay.sol (Smart Contract Relay)        │
 │                                                         │
 │  • sendMicroTip()       -> Direct USDC Settlement       │
 │  • createTask()         -> Escrowed Agent Bounties      │
 │  • completeTask()       -> Programmatic Task Release    │
 └────────────────────────────┬────────────────────────────┘
                              ▼
 ┌─────────────────────────────────────────────────────────┐
 │      Official Treasury (Safe Recipient):                │
 │      0xB16989670e568eF9D1b1bB364d3803Df41DD0a3e        │
 └─────────────────────────────────────────────────────────┘
```

### 1. `contracts/ArcAgentRelay.sol`
A gas-efficient Solidity contract tailored for Arc's native USDC environment:
- Eliminates ERC-20 `approve` overhead by leveraging Arc's native token transfers.
- Non-custodial, direct execution path with verifiable task completion events.
- Hardcoded fallback safe: `0xB16989670e568eF9D1b1bB364d3803Df41DD0a3e`.

### 2. Client Sentinel Dashboard (`index.html`, `app.js`, `style.css`)
- **Zero Framework Bloat**: Pure HTML5/Vanilla ES6 + CSS3. Blazing fast, immune to dependency supply-chain vulnerabilities.
- **RPC Telemetry**: Direct client-to-node benchmarking with block number validation.
- **Transaction Simulator**: Real-time fee and route simulation before on-chain dispatch.

---

## ⚙️ Arc Mainnet Parameters

To connect manually or programmatically:

| Parameter | Value |
| :--- | :--- |
| **Network Name** | `Arc Mainnet` |
| **RPC URL** | `https://rpc.mainnet.arc.io` |
| **Chain ID** | `5042` (`0x13B2`) |
| **Currency Symbol** | `USDC` |
| **Currency Decimals** | `18` |
| **Block Explorer** | `https://explorer.arc.io` |

---

## 🚀 Live Demo & Deployment

- **Live Web Application**: [https://vincentsai.github.io/arcflow-sentinel/](https://vincentsai.github.io/arcflow-sentinel/)
- **Source Code Repository**: [https://github.com/VincentSai/arcflow-sentinel](https://github.com/VincentSai/arcflow-sentinel)
- **Grant Application Target**: Circle Arc Microgrants ($500 USDC Grant, DoraHacks)

---

## 📄 License

MIT License © 2026 VincentSai & DevSentinel AI. Built for the Circle Arc Ecosystem.
