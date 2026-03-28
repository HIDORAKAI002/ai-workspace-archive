# Flare Smart Accounts — Reference Links

Use these when you need detailed specs, contract ABIs, or step-by-step developer guides.

## Overview and Concepts

- [Smart Accounts Overview](https://dev.flare.network/smart-accounts/overview) — System summary, workflow, account abstraction for XRPL users
- [FAsset Instructions](https://dev.flare.network/smart-accounts/fasset-instructions) — Instruction types, byte formats, encoding for FXRP/Firelight/Upshift
- [Custom Instructions](https://dev.flare.network/smart-accounts/custom-instruction) — Arbitrary contract calls, registration, call hash generation

## Developer Guides — CLI

- [CLI Introduction](https://dev.flare.network/smart-accounts/guides/cli/introduction) — Installation, environment configuration, command structure
- [FAssets Cycle](https://dev.flare.network/smart-accounts/guides/cli/fassets-cycle) — Complete cycle: mint → deposit → withdraw → redeem
- [Mint and Transfer](https://dev.flare.network/smart-accounts/guides/cli/mint-and-transfer) — Mint FXRP and transfer to a Flare address

## Developer Guides — TypeScript + Viem

- [State Lookup](https://dev.flare.network/smart-accounts/guides/typescript-viem/state-lookup-ts) — Reading smart account state from Flare chain
- [Custom Instruction](https://dev.flare.network/smart-accounts/guides/typescript-viem/custom-instruction-ts) — Sending custom instructions using Viem

## CLI Repository

- [smart-accounts-cli (GitHub)](https://github.com/flare-foundation/smart-accounts-cli) — Python CLI for encoding and sending XRPL transactions with smart account instructions

## Related Documentation

### FAssets (for minting/redemption context)

- [FAssets Overview](https://dev.flare.network/fassets/overview) — System summary, workflow, participants
- [FXRP Overview](https://dev.flare.network/fxrp/overview) — FXRP architecture, mint/redeem paths
- [FAssets Minting](https://dev.flare.network/fassets/minting) — Minting flow, fees, payment deadlines
- [FAssets Redemption](https://dev.flare.network/fassets/redemption) — Redemption flow and agent payouts

### Supporting Protocols

- [FDC Overview](https://dev.flare.network/fdc/overview) — Flare Data Connector for payment attestation
- [FTSO Overview](https://dev.flare.network/ftso/overview) — Flare Time Series Oracle for price feeds

## Contract Interfaces

- [MasterAccountController](https://dev.flare.network/smart-accounts/overview) — Central contract for smart account management
- [IAssetManager](https://dev.flare.network/fassets/reference/IAssetManager) — FAssets asset manager interface

## External Resources

- [XRP Faucets](https://xrpl.org/resources/dev-tools/xrp-faucets) — Get XRPL testnet credentials
- [XRPL Documentation](https://xrpl.org/docs/) — XRP Ledger developer resources

## Networks

Smart Accounts are available on:

| Network | Type | RPC URL |
|---------|------|---------|
| Coston2 | Flare testnet | `https://coston2-api.flare.network/ext/C/rpc` |
| Flare | Mainnet | `https://flare-api.flare.network/ext/C/rpc` |

XRPL testnet: `wss://s.altnet.rippletest.net:51233`
