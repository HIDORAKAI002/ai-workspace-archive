# Flare Network — Reference

Use these links for general Flare network documentation, tooling, and developer resources.

## Developer Hub

- [Flare Developer Hub](https://dev.flare.network/) — Central documentation for all Flare protocols
- [Network Overview](https://dev.flare.network/network/overview) — Networks, chain IDs, RPC endpoints, explorers, faucets
- [Flare Contracts Registry Guide](https://dev.flare.network/network/guides/flare-contracts-registry) — Retrieve contract addresses dynamically; see also [flare-contracts-registry-guide.md](flare-contracts-registry-guide.md)
- [Secure Random Numbers Guide](https://dev.flare.network/network/guides/secure-random-numbers) — On-chain and offchain random number consumption; see also [secure-random-numbers-guide.md](secure-random-numbers-guide.md)
- [Wrapped Native Tokens (WNat) Guide](https://dev.flare.network/network/guides/wnat) — Wrap/unwrap native tokens, FTSO delegation, governance; see also [wnat-guide.md](wnat-guide.md)
- [Hardhat & Foundry Starter Kit](https://dev.flare.network/network/guides/hardhat-foundry-starter-kit) — Setup, commands, network config; see also [hardhat-foundry-starter-kit-guide.md](hardhat-foundry-starter-kit-guide.md)
- [Flare for JavaScript](https://dev.flare.network/network/guides/flare-for-javascript-developers) — web3.js, compile, deploy, query; see also [flare-for-javascript-guide.md](flare-for-javascript-guide.md)
- [Flare for React](https://dev.flare.network/network/guides/flare-for-react-developers) — wagmi, viem, flare-wagmi-periphery-package; see also [flare-for-react-guide.md](flare-for-react-guide.md)
- [Flare for Python](https://dev.flare.network/network/guides/flare-for-python-developers) — web3.py, py-solc-x, async patterns; see also [flare-for-python-guide.md](flare-for-python-guide.md)
- [Flare for Rust](https://dev.flare.network/network/guides/flare-for-rust-developers) — alloy-rs, sol! macro, deploy; see also [flare-for-rust-guide.md](flare-for-rust-guide.md)
- [Flare for Go](https://dev.flare.network/network/guides/flare-for-go-developers) — go-ethereum, abigen, deploy; see also [flare-for-go-guide.md](flare-for-go-guide.md)

## Getting Started

- [Hardhat Starter Kit](https://github.com/flare-foundation/flare-hardhat-starter) — Hardhat project with FTSO, FDC, FAssets, and Smart Accounts examples
- [Foundry Starter Kit](https://github.com/flare-foundation/flare-foundry-starter) — Foundry equivalents

## Networks and Infrastructure

| Network | Chain ID | RPC | Explorer |
|---------|----------|-----|----------|
| Flare Mainnet | 14 | `https://flare-api.flare.network/ext/C/rpc` | https://flare-explorer.flare.network |
| Coston2 Testnet | 114 | `https://coston2-api.flare.network/ext/C/rpc` | https://coston2-explorer.flare.network |
| Songbird | 19 | `https://songbird-api.flare.network/ext/C/rpc` | https://songbird-explorer.flare.network |
| Coston Testnet | 16 | `https://coston-api.flare.network/ext/C/rpc` | https://coston-explorer.flare.network |

- [Systems Explorer](https://flare-systems-explorer.flare.network) — Live FTSO feeds, data providers, and protocol state
- [Coston2 Faucet](https://faucet.flare.network/coston2) — C2FLR, FXRP, USDT0
- [Coston Faucet](https://faucet.flare.network/coston) — CFLR

## npm Packages

- [`@flarenetwork/flare-periphery-contracts`](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contracts) — Solidity interfaces
- [`@flarenetwork/flare-periphery-contract-artifacts`](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts) — ABI artifacts for offchain scripts
- [`@flarenetwork/flare-wagmi-periphery-package`](https://www.npmjs.com/package/@flarenetwork/flare-wagmi-periphery-package) — Wagmi/viem typed contract interactions

## Developer Tools

Full directory: [dev.flare.network/network/developer-tools](https://dev.flare.network/network/developer-tools)

### Bridges
- [LayerZero V2](https://docs.layerzero.network/v2/deployments/chains/flare) — Omnichain interoperability protocol
- [Stargate V2](https://stargateprotocol.gitbook.io/stargate/v/v2-developer-docs/technical-reference/mainnet-contracts#flare) — Cross-chain liquidity protocol
- [zkBridge](https://docs.zkbridge.com/layerzero-zklightclient-configurations/layerzero-v2-zklightclient-dvn-addresses) — ZK proof-based cross-chain bridge

### RPCs
- [QuickNode](https://www.quicknode.com/chains/flare) — High-performance APIs
- [Ankr](https://www.ankr.com/rpc/flare/) — Infrastructure and developer tools
- [ChainList](https://chainlist.org/chain/14) — All public RPCs for Flare (chain ID 14)

### OFTs (Omnichain Fungible Tokens)
- [USD₮0](https://docs.usdt0.to/technical-documentation/deployments) — Tether's stablecoin OFT
- [flrETH](https://dinero.xyz/docs/deployed-contracts#flr-eth-contracts) — Dinero's liquid staked ETH OFT
- [USDC.e, WETH, USDT](https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/mainnet-contracts#flare) — Stargate Hydra wrapped OFTs

### Indexers
- [Envio](https://docs.envio.dev/docs/HyperIndex/flare) — Multi-chain EVM indexer
- [Goldsky](https://docs.goldsky.com/chains/flare) — Indexed APIs and subgraph hosting
- [sqd](https://docs.sqd.dev/subsquid-network/reference/networks/#evm--ethereum-compatible) — High-performance indexing
- [SubQuery](https://academy.subquery.network/indexer/quickstart/quickstart_chains/flare.html) — Open indexing protocol

### Wallet SDKs
- [Wagmi](https://wagmi.sh/react/chains) — React hooks for wallet connections and contract interactions
- [RainbowKit](https://www.rainbowkit.com/docs/introduction) — Customizable React wallet connection components
- [MetaMask Embedded Wallets](https://docs.metamask.io/embedded-wallets/connect-blockchain/evm/flare/) — OAuth social logins with non-custodial key management
- [Etherspot Prime SDK](https://etherspot.fyi/prime-sdk/other-chains/getting-started-on-flare) — ERC-4337 account abstraction
- [Etherspot Modular SDK](https://etherspot.fyi/modular-sdk/intro) — ERC-7579 smart account modules
- [Turnkey](https://docs.turnkey.com/networks/ethereum) — Embedded wallets and smart signers API
- [Dfns](https://docs.dfns.co/networks) — Wallets-as-a-service

### Full-Stack Infrastructure
- [Tenderly](https://docs.tenderly.co/supported-networks) — Debugging, monitoring, and simulation
- [Thirdweb](https://14.rpc.thirdweb.com) — Web3 app SDK

### Analytics
- [Dune](https://dune.com/flare/flare-network-overview) — Onchain data analytics
- [Sentora](https://sentora.com/research/dashboards/flare-defi-ecosystem) — DeFi intelligence platform
- [Arkham Intel](https://intel.arkm.com/explorer/entity/flare-network) — Onchain wallet analytics
- [Flare Metrics](https://flaremetrics.io/defi) — DeFi opportunity tracker
- [Catenalytica](https://catenalytica.com) — FTSO performance and network monitoring
- [FlareBase](https://flare-base.io/flare) — Web and REST APIs for Flare data

### Explorers
- [Flare Explorer](https://flare-explorer.flare.network) — Blockscout explorer for Flare Mainnet
- [Flare Systems Explorer](https://flare-systems-explorer.flare.network) — FTSO, FDC, and protocol metrics
- [Flare Space](https://flare.space) — C-chain and P-chain analytics

## Flare TX SDK

- [Flare TX SDK Overview](https://dev.flare.network/network/flare-tx-sdk) — Official Node.js toolkit for rewards, delegation, staking, governance, transfers
- [Getting Started](https://dev.flare.network/network/flare-tx-sdk/getting-started) — Installation, MetaMask/Ledger/Trezor wallet setup, unit conversion
- [Cookbook](https://dev.flare.network/network/flare-tx-sdk/cookbook) — Recipes for balances, wrap/transfer, claim rewards, delegate, stake, vote
- [GitHub: flare-foundation/flare-tx-sdk](https://github.com/flare-foundation/flare-tx-sdk)

## Flare Systems Protocol (FSP)

- [FSP Overview](https://dev.flare.network/network/fsp) — Foundational infrastructure for FTSO and FDC, weighted voting, data providers
- [Weights and Signing](https://dev.flare.network/network/fsp/weights-and-signing) — Vote power sources (P-chain stake, WFLR), weight types, signing thresholds
- [Rewarding](https://dev.flare.network/network/fsp/rewarding) — Reward epochs, claim types, participation requirements, RewardManager
- [System Protocols](https://dev.flare.network/network/fsp/system-protocols) — Signing Policy, Uptime Voting, Reward Voting, Random Number Generation

## Consensus

- [Consensus Overview](https://dev.flare.network/network/consensus) — Snowman++, validator selection, finality, block time, P-chain and C-chain details

## Governance

- [Governance Overview](https://dev.flare.network/network/governance) — FIPs, STPs, SIPs, voting mechanisms, proposal lifecycle, Management Group

## Core Protocol Docs

- [FTSO Overview](https://dev.flare.network/ftso/overview) — Price feeds oracle
- [FDC Overview](https://dev.flare.network/fdc/overview) — Cross-chain and Web2 attestations
- [FAssets Overview](https://dev.flare.network/fassets/overview) — Wrapped BTC, XRP, DOGE
- [Smart Accounts Overview](https://dev.flare.network/smart-accounts/overview) — XRPL account abstraction
- [FCC Overview](https://dev.flare.network/fcc/overview) — Flare Confidential Compute: TEEs, Protocol Managed Wallets, Flare Compute Extensions

## Flare Network

- [Flare Network](https://flare.network/)
- [Flare Foundation GitHub](https://github.com/flare-foundation)
