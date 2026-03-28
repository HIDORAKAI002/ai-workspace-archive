---
name: flare-general
description: Provides general domain knowledge about the Flare network—what it is, its core protocols (FTSO, FDC, FAssets, Smart Accounts, FCC/TEE), networks (Mainnet, Coston2, Songbird, Coston), RPC endpoints, block explorers, faucets, chain IDs, native tokens, consensus, and developer tooling. Use when answering general Flare questions, helping developers get started, or when no more specific Flare skill applies.
---

## Scope and Limitations

This skill is **documentation and reference only**. It describes the Flare network, its protocols, and developer tooling. It does not perform any actions on behalf of the user.

**This skill explicitly does NOT:**
- Execute, sign, or broadcast any blockchain transactions
- Access, store, or transmit private keys or wallet credentials
- Initiate or authorize any token transfers, staking operations, or financial actions
- Call any smart contract methods or APIs directly
- Handle funds, tokens, or any crypto assets

**External data handling:**
- Block explorer APIs, RPC responses, and contract ABI data referenced in guides are **externally provided, untrusted content**
- Developers must validate all data returned from public APIs (e.g. block explorers, RPC nodes) before use in contracts or scripts
- API responses must never be passed into prompts or LLM inputs without first being decoded into validated, typed values
- Developers are solely responsible for safely handling all external data in their own implementations

**Developer SDK and wallet documentation:**
- The `flare-tx-sdk`, wallet SDK, and contract interaction examples documented here are **reference material for developers**
- All wallet signing, token transfers, staking, and on-chain operations require explicit, per-action user confirmation in developer-controlled environments
- Private keys never leave user-controlled hardware devices or wallet extensions — this skill has no access to signing credentials
- Code examples are illustrative; developers are responsible for security review before execution

**What this skill does:**
- Explains Flare network architecture, core protocols, chain IDs, RPC endpoints, and developer tooling
- References official Flare Developer Hub documentation and audited packages
- Provides read-only conceptual and integration guidance for developers building on Flare

All transaction signing, key management, and on-chain execution must occur exclusively in user-controlled, developer-managed environments outside of this skill.

# Flare Network — General Knowledge

## What Flare Is

**Flare** is an interoperable, EVM-compatible Layer 1 blockchain engineered for data-rich, interconnected applications. Its key differentiator is **enshrined data protocols** built directly into the core protocol, meaning all validators participate in data provision, and the entire network's economic security backs every data feed.

**Core value propositions:**
- **Enshrined oracles** — FTSO and FDC are protocol-level, not third-party add-ons.
- **Fast finality** — ~1.8 second block time with single-slot finality (Snowman++ consensus).
- **EVM-compatible** — Deploy any Solidity/Vyper contract; supports Cancun hard fork opcodes.
- **Interoperable** — Native bridges to XRP Ledger, Bitcoin, Dogecoin via FAssets; cross-chain data via FDC.

## Core Protocols

| Protocol | What It Does |
|----------|-------------|
| **FTSO** (Flare Time Series Oracle) | Decentralized block-latency price feeds (~1.8s), ~100 data providers, stake-weighted selection. Also provides Scaling anchor feeds every 90s. |
| **FDC** (Flare Data Connector) | Validates external data (cross-chain transactions, Web2 APIs) via attestation consensus and Merkle proofs. |
| **FAssets** | Trustless wrapped tokens (FXRP, FBTC, FDOGE) enabling XRP, BTC, and DOGE holders to use Flare DeFi. |
| **Smart Accounts** | Account abstraction letting XRPL users interact with Flare without holding FLR. |
| **FCC** (Flare Confidential Compute) | Extends Flare with Trusted Execution Environments (TEEs) for secure offchain computation, cross-chain transaction signing, and fast data attestation. |

Validators on Flare serve a dual role: they participate in consensus **and** act as data providers for FTSO and FDC.

## Networks

| Network | Role | Native Token | Chain ID |
|---------|------|--------------|----------|
| **Flare Mainnet** | Production | FLR (18 decimals) | 14 |
| **Coston2** | dApp testnet | C2FLR (18 decimals) | 114 |
| **Songbird** | Canary / protocol experiments | SGB (18 decimals) | 19 |
| **Coston** | Protocol testnet | CFLR (18 decimals) | 16 |

**Development path:**
- **dApp development:** Coston2 → Flare Mainnet
- **Protocol development:** Coston → Songbird → Coston2 → Flare Mainnet

## RPC Endpoints

### Flare Mainnet
- HTTPS: `https://flare-api.flare.network/ext/C/rpc`
- WSS: `wss://flare-api.flare.network/ext/C/ws`

### Coston2 (Testnet)
- HTTPS: `https://coston2-api.flare.network/ext/C/rpc`
- WSS: `wss://coston2-api.flare.network/ext/C/ws`

### Songbird
- HTTPS: `https://songbird-api.flare.network/ext/C/rpc`
- WSS: `wss://songbird-api.flare.network/ext/C/ws`

### Coston
- HTTPS: `https://coston-api.flare.network/ext/C/rpc`
- WSS: `wss://coston-api.flare.network/ext/C/ws`

## Block Explorers

| Network | Explorer |
|---------|----------|
| Flare Mainnet | https://flare-explorer.flare.network |
| Coston2 | https://coston2-explorer.flare.network |
| Songbird | https://songbird-explorer.flare.network |
| Coston | https://coston-explorer.flare.network |
| Systems Explorer (all networks) | https://flare-systems-explorer.flare.network |

## Faucets (Testnet Tokens)

- **Coston2:** https://faucet.flare.network/coston2 — C2FLR, FXRP, USDT0
- **Coston:** https://faucet.flare.network/coston — CFLR

## Technical Properties

| Property | Value |
|----------|-------|
| Consensus | Snowman++ (single-slot finality) |
| Block time | ~1.8 seconds |
| Sybil resistance | Proof-of-Stake |
| EVM version | Cancun (set `evmVersion: "cancun"` in Hardhat/Foundry) |
| Address format | 20-byte ECDSA (Ethereum-compatible) |
| Transaction format | EIP-2718; supports Type 0 (Legacy) and Type 2 (EIP-1559) |
| Fee burning | All transaction fees are burned |
| Native token decimals | 18 |

## Key npm Packages

| Package | Use |
|---------|-----|
| [`@flarenetwork/flare-periphery-contracts`](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contracts) | Solidity interfaces for Hardhat/Foundry (network-specific: `coston2/`, `flare/`, `songbird/`) |
| [`@flarenetwork/flare-periphery-contract-artifacts`](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts) | ABI artifacts for offchain scripts (`interfaceToAbi()`) |
| [`@flarenetwork/flare-wagmi-periphery-package`](https://www.npmjs.com/package/@flarenetwork/flare-wagmi-periphery-package) | Wagmi/viem typed contract interactions for Flare periphery contracts |

## Contract Resolution

Flare uses a **ContractRegistry** pattern — never hardcode contract addresses. Always resolve them at runtime:

```solidity
import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";

// Examples
IFtsoV2 ftso = ContractRegistry.getFtsoV2();
IFdcHub fdcHub = ContractRegistry.getFdcHub();
```

The `ContractRegistry` address itself is stable per network. Use network-specific imports (`coston2/`, `flare/`, `songbird/`, `coston/`).

## Developer Quickstart

### Using Hardhat

```bash
git clone https://github.com/flare-foundation/flare-hardhat-starter
cd flare-hardhat-starter
npm install
cp .env.example .env  # add your private key and API keys
npx hardhat compile
npx hardhat run scripts/your-script.ts --network coston2
```

### Using Foundry

```bash
git clone https://github.com/flare-foundation/flare-foundry-starter
cd flare-foundry-starter
forge install
forge build
forge script script/YourScript.s.sol --rpc-url https://coston2-api.flare.network/ext/C/rpc
```

### Hardhat Config (network setup)

```js
networks: {
  coston2: {
    url: "https://coston2-api.flare.network/ext/C/rpc",
    chainId: 114,
    accounts: [process.env.PRIVATE_KEY],
  },
  flare: {
    url: "https://flare-api.flare.network/ext/C/rpc",
    chainId: 14,
    accounts: [process.env.PRIVATE_KEY],
  },
}
```

**Important:** Always set `evmVersion: "cancun"` in your Solidity compiler settings when using Flare periphery contracts.

## Flare Systems Protocol (FSP)

The **Flare Systems Protocol (FSP)** is the foundational infrastructure that powers Flare's enshrined protocols (FTSO, FDC). It provides decentralized consensus via weighted voting by **data providers** (also called voters), who gain vote power through community delegations of WFLR or P-chain stake.

### Vote Power

Vote power comes from two sources:

| Source | Description |
|--------|-------------|
| **P-chain Stake (WP)** | FLR staked by validators or delegated to them on the P-chain |
| **WNat Delegations (WWFLR)** | Wrapped FLR (WFLR) delegated via the WNat contract |

Derived weight types:
- **Mirrored Stake (WM)** — P-chain state mirrored to C-chain smart contracts
- **Capped Delegation Weight (W'WFLR)** — WFLR delegation capped at 2.5% of total WFLR weight
- **Registration Weight** — `(W'WFLR + WM)^0.75`
- **Signing Weight (WS)** — normalized registration weight, compressed to 2-byte values per provider

### Timing

| Period | Duration |
|--------|----------|
| **Voting epoch** | 90 seconds |
| **Reward epoch** | 3,360 voting epochs (~3.5 days) |

### System Protocols

FSP comprises four core protocols:

| Protocol | Trigger | Purpose |
|----------|---------|---------|
| **Signing Policy Definition** | ~2 hrs before reward epoch end | Locks data providers and weights for the next epoch |
| **Validator Uptime Voting** | After each reward epoch | Providers vote on which validators achieved ≥80% uptime |
| **Reward Voting** | After uptime voting | Providers aggregate reward claims into a Merkle tree; `RewardManager` executes payouts |
| **Random Number Generation** | Each voting epoch | Derived from FTSOv2 commit-reveal; stored in `Relay` contract |

**Consensus threshold:** >50% signing weight required. Rises to 60%+ if delayed.

### Rewarding

Rewards are distributed per reward epoch by the `RewardManager` contract. Providers start with 0 passes (max 3) and gain/lose passes based on minimum participation:

| Protocol | Minimum Participation |
|----------|-----------------------|
| Staking | ≥80% validator uptime + ≥1M FLR active self-bond |
| FTSO anchor feeds | Estimates within 0.5% of consensus median in ≥80% of rounds |
| FTSO block-latency feeds | Submit ≥80% of expected updates (waived if weight <0.2%) |
| FDC | Participate in ≥60% of voting rounds |

**Reward claim types:** Direct, Fee (provider delegation/staking fees), WFLR (delegator rewards), Mirror (stake delegator rewards).

Reference: [dev.flare.network/network/fsp](https://dev.flare.network/network/fsp)

## Developer Tools

### Bridges

| Tool | Description |
|------|-------------|
| **LayerZero V2** | Omnichain interoperability protocol for messaging and asset transfers between chains |
| **Stargate V2** | Cross-chain liquidity protocol with unified liquidity pools |
| **zkBridge** | Zero-knowledge proof-based cross-chain bridge |

### RPCs

| Tool | Description |
|------|-------------|
| **QuickNode** | High-performance APIs for queries, transactions, and cross-chain operations |
| **Ankr** | Infrastructure and developer tools for blockchain application deployment |
| **ChainList** | Directory of all public RPCs supporting Flare (chain ID 14) |

### OFTs (Omnichain Fungible Tokens)

| Token | Description |
|-------|-------------|
| **USD₮0** | Tether's stablecoin omnichain fungible token |
| **flrETH** | Dinero's liquid staked ETH OFT |
| **USDC.e, WETH, USDT** | Stargate Hydra's wrapped OFTs |

### Indexers

| Tool | Description |
|------|-------------|
| **Envio** | Modern multi-chain EVM indexer for real-time and historical data |
| **Goldsky** | Blockchain data platform with indexed APIs and subgraph hosting |
| **sqd** | Indexing solution optimized for speed, reliability, and data transformations |
| **SubQuery** | Open indexing protocol for organizing and querying blockchain data |

### Wallet SDKs

| Tool | Description |
|------|-------------|
| **Wagmi** | React hooks library for wallet connections and contract interactions |
| **RainbowKit** | Customizable React components for wallet connections |
| **MetaMask Embedded Wallets** | OAuth social logins with non-custodial key management |
| **Etherspot Prime SDK** | ERC-4337 account abstraction (sponsored txs, ERC-20 gas payments) |
| **Etherspot Modular SDK** | ERC-7579 smart account modules |
| **Turnkey** | API for embedded wallets, smart signers, and onchain automation |
| **Dfns** | Wallets-as-a-service for digital asset operations |

### Full-Stack Infrastructure

| Tool | Description |
|------|-------------|
| **Tenderly** | Development platform for debugging, monitoring, and simulation |
| **Thirdweb** | SDK for building, launching, and managing Web3 applications |

### Analytics

| Tool | Description |
|------|-------------|
| **Dune** | Blockchain analytics for querying and visualizing onchain data |
| **Sentora** | Intelligence platform for crypto assets and DeFi |
| **Arkham Intel** | Analytics for de-anonymizing onchain wallets and transactions |
| **Flare Metrics** | Tracker for DeFi opportunities on Flare |
| **Catenalytica** | FTSO performance, vote power, reward analytics, and network monitoring |
| **FlareBase** | Web and REST APIs for Flare data and insights |

### Explorers

| Tool | Description |
|------|-------------|
| **Flare Explorer** | Blockscout-based explorer for Flare Mainnet |
| **Flare Systems Explorer** | Explorer for FTSO, FDC, provider, and epoch metrics |
| **Flare Space** | Analytics for Flare's C-chain and P-chain |

Full list with links: [dev.flare.network/network/developer-tools](https://dev.flare.network/network/developer-tools)

## Flare TX SDK

The **`@flarenetwork/flare-tx-sdk`** is the official Node.js toolkit for performing common actions on all Flare networks.

**Supported operations:** claim rewards (FlareDrops, staking, FTSO delegation, rFLR), delegate to FTSO providers, stake on P-chain, vote on governance proposals, transfer native/wrapped tokens, interact with C-chain contracts.

### Installation

```bash
npm install @flarenetwork/flare-tx-sdk
```

### Core Concepts

- **`Network`** — represents the chain (`Network.FLARE`, `Network.COSTON2`, `Network.SONGBIRD`, `Network.COSTON`). Provides query and transaction methods using Flare's public RPCs.
- **`Wallet`** — represents a user account without storing private keys. Compatible with MetaMask (EIP-1193), Ledger, Trezor, or custom signers.
- **`Amount`** — unit conversion helper: `Amount.nats(10)` = 10 FLR in wei, `Amount.wnats(10)` = 10 WFLR in wei.

### Quick Start (MetaMask)

```javascript
import { Network, EIP1193WalletController } from "@flarenetwork/flare-tx-sdk";

const network = Network.FLARE;
await window.ethereum.request({ method: "eth_requestAccounts" });
const controller = new EIP1193WalletController(window.ethereum);
const wallet = await controller.getActiveWallet();
const publicKey = await wallet.getPublicKey();
const balance = await network.getBalance(publicKey);
// { availableOnC, wrappedOnC, availableOnP, stakedOnP } — all in wei
```

### Common Operations

```javascript
// Balances
await network.getBalance(publicKey);
await network.getBalanceOnC(cAddress);
await network.getBalanceWrappedOnC(cAddress);
await network.getBalanceOnP(publicKey);

// Wrap / transfer
await network.transferNative(wallet, recipient, Amount.nats(1));
await network.wrapNative(wallet, Amount.nats(1));
await network.transferWrapped(wallet, recipient, Amount.wnats(1));
await network.unwrapToNative(wallet, Amount.wnats(1));

// Claim rewards
await network.claimFlareDropReward(wallet);
await network.claimStakingReward(wallet);
await network.claimFtsoReward(wallet);
await network.claimRNatReward(wallet, [projectId1, projectId2]);

// FTSO delegation
await network.delegateToFtso(wallet, providerAddress, Amount.percentages(100));
await network.undelegateFromFtso(wallet);

// P-chain staking
await network.transferToP(wallet, Amount.nats(100));
await network.delegateOnP(wallet, Amount.nats(50), nodeId, startTime, endTime);
await network.transferToC(wallet);  // move back to C-chain

// Governance
await network.castVoteForFoundationProposal(wallet, proposalId, FoundationProposalSupport.FOR);
await network.delegateGovernanceVotePower(wallet, delegateAddress);

// C-chain contract calls
await network.invokeContractCallOnC(contractAddress, abi, "methodName", [params]);
await network.invokeContractMethodOnC(wallet, contractAddress, abi, "methodName", value, [params]);
```

### Wallet Integrations

| Wallet | Package |
|--------|---------|
| MetaMask / WalletConnect (EIP-1193) | Built-in (`EIP1193WalletController`) |
| Ledger (Zondax Flare App) | `@zondax/ledger-flare` |
| Ledger (ETH App) | `@ledgerhq/hw-app-eth` |
| Trezor | `@trezor/connect` |

Private keys never leave the hardware device or wallet extension.

Full guide: [dev.flare.network/network/flare-tx-sdk](https://dev.flare.network/network/flare-tx-sdk)

## Wrapped Native Tokens (WNat)

Each Flare network has a native gas token (FLR, SGB, C2FLR, CFLR). `WNat` wraps native tokens into a standard ERC-20 token required for FTSO delegation and governance voting.

**WNat is required for:**
- **FTSO delegation** — delegating vote power to data providers to earn staking rewards
- **Governance voting** — participating in FIPs, STPs, and SIPs
- **DeFi** — any protocol expecting an ERC-20 token

| Operation | Method | Notes |
|-----------|--------|-------|
| Wrap | `deposit()` | `payable` — send native tokens as `msg.value` |
| Wrap to address | `depositTo(recipient)` | Wraps on behalf of another address |
| Unwrap | `withdraw(amount)` | Burns WNat, returns native tokens 1:1 |
| Unwrap to address | `withdrawTo(recipient, amount)` | Unwraps to a specific address |

Resolve the WNat contract via `ContractRegistry.getWNat()`. Full guide with Solidity and TypeScript examples: [wnat-guide.md](wnat-guide.md)

## Consensus

Flare uses **Snowman++**, a Byzantine fault-tolerant probabilistic consensus protocol from the Snow family (originally introduced by Avalanche).

### Protocol Layers

| Layer | Description |
|-------|-------------|
| **Slush** | Nodes sample peers and update preferences via majority voting (parameters: K = sample size, Alpha = vote threshold) |
| **Snowball** | Adds confidence counters tracking consecutive successful polls to improve finalization |
| **Snowman** | Linear blockchain ordering using Kahn's topological algorithm; runs multiple Snowball instances per block height |
| **Snowman++** | Adds stake-weighted proposer selection with time-based eligibility delays per validator |

### Key Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `maxWindows` | 6 | Validators selected per block height |
| `WindowDuration` | 5 seconds | Delay between proposer eligibility windows |
| `Beta` | — | Consecutive successful queries required for finalization |

### Validator Selection

Validators are chosen via **weighted sampling without replacement** based on stake. Selection is deterministic, using the validator set and chain height as inputs.

### Properties

- **Finality:** Single-slot finality — blocks are final once confidence reaches the Beta threshold.
- **Block time:** ~1.8 seconds.
- **Fault tolerance:** Byzantine fault-tolerant.
- **Chains:** Runs on both P-chain and C-chain in Flare networks.
- **Validator dual role:** Validators also serve as data providers for FTSO and FDC.

Reference: [dev.flare.network/network/consensus](https://dev.flare.network/network/consensus)

## Governance

Flare uses on-chain governance for protocol changes. There are three proposal types across two networks.

### Proposal Types

| Type | Network | Voting Token | Mechanism |
|------|---------|--------------|-----------|
| **FIP** (Flare Improvement Proposal) | Flare Mainnet | `WFLR` + staked FLR | Acceptance-based: >50% approval, no quorum required |
| **STP** (Songbird Test Proposal) | Songbird | `WSGB` | Rejection-based: requires 75% quorum AND >50% against to reject |
| **SIP** (Songbird Improvement Proposal) | Songbird | `WSGB` | Acceptance-based: >50% approval, no quorum required |

STPs are used to test changes on Songbird before proposing them as FIPs on Flare Mainnet.

### Voting

- **Eligibility:** Token holders at the snapshot block ("Vote Count Block"), selected randomly after proposal announcement.
- **Vote power:** Proportional to token holdings at snapshot time.
- **Delegation:** Voting power can be delegated to another address without transferring token ownership. Delegation is permanent until explicitly canceled.

### Proposal Lifecycle

1. Announcement + community discussion period
2. Random Vote Count Block selection window
3. Voting period (typically one week)
4. Execution — automatic via smart contracts or manual by the Flare Foundation

### Management Group

Introduced in FIP.02/STP.03 — a governance body of FTSO data providers that votes on:
- Punitive actions against non-compliant providers
- New data feed additions
- New attestation types for FDC
- Protocol parameter adjustments

Reference: [dev.flare.network/network/governance](https://dev.flare.network/network/governance)

## Flare Confidential Compute (FCC)

**Flare Confidential Compute (FCC)** extends the Flare blockchain with **Trusted Execution Environments (TEEs)** to enable secure offchain computation, cross-chain transaction signing, and fast data attestation.

**Status:** FCC is in final development stages and not yet publicly available.

Reference: [dev.flare.network/fcc/overview](https://dev.flare.network/fcc/overview)

### Key Features

| Feature | Description |
|---------|-------------|
| **Secure Offchain Computation** | TEE machines run verifiable code in hardware-isolated environments, protecting against untrusted operators |
| **Cross-Chain Transaction Signing** | Protocol Managed Wallets allow smart contracts to programmatically assemble and sign transactions on external blockchains (XRPL, Bitcoin) |
| **Fast Data Attestation** | A TEE-based Flare Data Connector rapidly attests external data; TEE signatures prove data provider consensus |
| **Extensible Architecture** | Developers build custom Flare Compute Extensions (FCE) running arbitrary computations within TEE machines with onchain-verifiable results |
| **Decentralized Consensus** | Instructions reach TEE machines only after achieving 50%+ signature weight from Flare's data providers |
| **Private Key Management** | TEE machines securely generate, store, backup, and restore private keys for multi-signature wallet operations |

### Architecture

Three core components work together:

| Component | Role |
|-----------|------|
| **Smart Contracts** | Govern logic and manage compute extensions, TEE registration, instruction issuance, and key administration |
| **Data Providers and Cosigners** | Relay instructions, parse events, augment with external data, and sign before transmission to TEE machines |
| **TEE Machines** | Verify consensus-weighted instructions, execute computations, and sign results with private keys |

### System Applications

**Protocol Managed Wallets (PMW):** Enable programmable transaction assembly and signing on external blockchains through Flare smart contracts, supporting multisig operations and nonce management.

**Flare Data Connector (FDC) via TEE:** Achieves rapid attestation by having data providers respond to attestation requests, with TEE signatures verifying consensus.

**Flare Compute Extensions (FCE):** Custom computation modules that developers can deploy to run arbitrary offchain logic within TEE machines, with results verifiable onchain.

## When to Use This Skill

- Answering general questions about what Flare is and how it works.
- Providing network configuration (chain IDs, RPC URLs, explorers, faucets).
- Explaining the relationship between Flare's core protocols (FTSO, FDC, FAssets, Smart Accounts).
- Helping developers set up their tooling (Hardhat, Foundry, viem/wagmi) for Flare.
- Explaining Flare Confidential Compute (FCC/TEE) — what it is, how it works, Protocol Managed Wallets, Flare Compute Extensions.
- Any question about Flare that doesn't fall squarely into FTSO, FDC, FAssets, or Smart Accounts territory.

## Additional Resources

- Detailed links and references: [reference.md](reference.md)
- Contract registry guide: [flare-contracts-registry-guide.md](flare-contracts-registry-guide.md)
- Secure random numbers guide: [secure-random-numbers-guide.md](secure-random-numbers-guide.md)
- Wrapped native tokens guide: [wnat-guide.md](wnat-guide.md)
- Hardhat & Foundry starter kit: [hardhat-foundry-starter-kit-guide.md](hardhat-foundry-starter-kit-guide.md)
- JavaScript guide: [flare-for-javascript-guide.md](flare-for-javascript-guide.md)
- React guide: [flare-for-react-guide.md](flare-for-react-guide.md)
- Python guide: [flare-for-python-guide.md](flare-for-python-guide.md)
- Rust guide: [flare-for-rust-guide.md](flare-for-rust-guide.md)
- Go guide: [flare-for-go-guide.md](flare-for-go-guide.md)
- FCC overview: [dev.flare.network/fcc/overview](https://dev.flare.network/fcc/overview)
- Flare Developer Hub: [dev.flare.network](https://dev.flare.network/)
- Network Overview: [dev.flare.network/network/overview](https://dev.flare.network/network/overview)
- FTSO skill: [flare-ftso](../flare-ftso-skill/SKILL.md)
- FDC skill: [flare-fdc](../flare-fdc-skill/SKILL.md)
- FAssets skill: [flare-fassets](../flare-fassets-skill/SKILL.md)
- Smart Accounts skill: [flare-smart-accounts](../flare-smart-accounts-skill/SKILL.md)
