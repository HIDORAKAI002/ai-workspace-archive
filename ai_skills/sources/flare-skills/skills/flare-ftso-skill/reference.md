# Flare Time Series Oracle (FTSO) — Reference

Use these links for detailed specs, contract interfaces, and step-by-step guides.

## Overview and Concepts

- [FTSO Overview](https://dev.flare.network/ftso/overview) — Architecture, block-latency feeds, Scaling, volatility incentives
- [FTSO Getting Started](https://dev.flare.network/ftso/getting-started) — End-to-end Solidity example: deploy a feed consumer on Coston2
- [FTSO Whitepaper](https://dev.flare.network/pdf/whitepapers/20240223-FlareTimeSeriesOracleV2.pdf) — Detailed mechanism design

## Feed Lists

- [Block-Latency Feeds](https://dev.flare.network/ftso/feeds) — Full list of feed IDs, indexes, categories, and risk ratings
- [Anchor Feeds (Scaling)](https://dev.flare.network/ftso/scaling/anchor-feeds) — Scaling feed list and IDs

## Scaling

- [Scaling Overview](https://dev.flare.network/ftso/scaling/overview) — Commit-reveal process, weighted median, incentivization

## Guides

- [Read Feeds Offchain](https://dev.flare.network/ftso/guides/read-feeds-offchain) — JavaScript/TypeScript example using web3 and RPC
- [Change Quote Feed](https://dev.flare.network/ftso/guides/change-quote-feed) — Cross-pair calculation (e.g. BTC/ETH from BTC/USD and ETH/USD)
- [Make a Volatility Incentive](https://dev.flare.network/ftso/guides/make-volatility-incentive) — Pay to temporarily increase expected sample size during high volatility
- [Create a Custom Feed](https://dev.flare.network/ftso/guides/create-custom-feed) — Create a custom price feed using Web2Json attestation via FDC and CoinGecko API
- [Migrate an App to FTSO (Adapters)](https://dev.flare.network/ftso/guides/adapters) — Migrate dApps from Chainlink, Pyth, API3, Band, or Chronicle using FTSO adapter libraries

## Solidity Reference (Contract Interfaces)

- [FtsoV2Interface](https://dev.flare.network/ftso/solidity-reference/FtsoV2Interface) — `getFeedById`, `getFeedsById`, `getFeedByIdInWei`, `getFeedsByIdInWei`, `verifyFeedData` (LTS interface)
- [IFeeCalculator](https://dev.flare.network/ftso/solidity-reference/IFeeCalculator) — `calculateFeeByIds(bytes21[])` for block-latency feed fees

## Network and RPC

- **Flare Mainnet RPC:** `https://flare-api.flare.network/ext/C/rpc`
- **Coston2 (Testnet) RPC:** `https://coston2-api.flare.network/ext/C/rpc`
- **Coston2 Faucet:** [faucet.flare.network/coston2](https://faucet.flare.network/coston2)
- **Flare Systems Explorer:** [flare-systems-explorer.flare.network](https://flare-systems-explorer.flare.network) — Live feed values and data provider info

## Contract Addresses (Testnet — Coston2)

- **ContractRegistry:** Resolve all other addresses via `ContractRegistry` — do not hardcode.

## Packages

- [`@flarenetwork/flare-periphery-contracts`](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contracts) — Solidity interfaces for Hardhat/Foundry (network-specific: `coston2/`, `flare/`, `songbird/`)
- [`@flarenetwork/flare-periphery-contract-artifacts`](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts) — ABI artifacts for offchain usage (`interfaceToAbi()`)
- [`@flarenetwork/flare-wagmi-periphery-package`](https://www.npmjs.com/package/@flarenetwork/flare-wagmi-periphery-package) — Wagmi/viem integration for Flare periphery contracts

## Starter Repositories

- [flare-hardhat-starter](https://github.com/flare-foundation/flare-hardhat-starter) — FTSO consumer contracts and scripts
- [flare-foundry-starter](https://github.com/flare-foundation/flare-foundry-starter) — Foundry equivalents

## Related Protocols

- [FDC Overview](https://dev.flare.network/fdc/overview) — Flare Data Connector (cross-chain attestations)
- [FAssets Overview](https://dev.flare.network/fassets/overview) — FAssets use FTSO for price feeds in collateral calculations
