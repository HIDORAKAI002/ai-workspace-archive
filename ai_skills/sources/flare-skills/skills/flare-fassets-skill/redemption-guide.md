# FAssets Redemption Guide

Complete guide for redeeming FAssets (e.g. FXRP) on the Flare network. Redemption is the process of burning FAssets on Flare in exchange for their equivalent value on the original chain (e.g. XRP on XRPL).

**Source:** [Redeem FAssets](https://dev.flare.network/fassets/developer-guides/fassets-redeem)

## Prerequisites

- Flare Hardhat Starter Kit or any Node.js project with ethers
- Flare periphery packages for ABI and type safety:
  - Solidity contracts: [@flarenetwork/flare-periphery-contracts](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contracts)
  - Artifacts: [@flarenetwork/flare-periphery-contract-artifacts](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts)
  - Wagmi types: [@flarenetwork/flare-wagmi-periphery-package](https://www.npmjs.com/package/@flarenetwork/flare-wagmi-periphery-package)
- FXRP tokens in the redeemer's wallet
- An XRP Ledger address to receive the underlying XRP

## Redemption Flow Overview

```
1. Approve FXRP  →  2. Call redeem()  →  3. Agent pays XRP  →  4. Redemption completes
   (ERC-20 approve)     (burn FAssets)     (on XRPL)             (or default if agent fails)
```

## Step 1: Calculate Redemption Amount

Redemption is denominated in **lots**. Query the AssetManager for the current lot size:

```
AssetManager.getSettings() → { lotSizeAMG, assetDecimals }
amountToRedeem = lotSizeAMG × numberOfLots
amountInXRP = amountToRedeem / 10^assetDecimals
```

## Step 2: Approve FXRP Transfer

Before redeeming, approve the AssetManager (or your redemption contract) to spend your FXRP tokens:

```
FXRP.approve(assetManagerAddress, amountToRedeem)
```

**Security note:** In production, use precise approval amounts rather than unlimited approvals.

## Step 3: Execute Redemption

Call `redeem()` on the AssetManager with your lot count and XRP Ledger address:

```
AssetManager.redeem(lots, redeemerUnderlyingAddressString, executorAddress)
```

- `lots` — number of lots to redeem
- `redeemerUnderlyingAddressString` — your XRP Ledger address (e.g. `"rSHYuiEvsYsKR8uUHhBTuGP5zjRcGt4nm"`)
- `executorAddress` — pass `address(0)` if not using an executor

### Events Emitted

**`RedemptionRequested`** — the primary event containing:
- `agentVault` — the agent handling the redemption
- `requestId` — unique redemption request ID
- `paymentAddress` — agent's underlying chain address
- `valueUBA` — FAssets value in base units
- `feeUBA` — redemption fee
- `firstUnderlyingBlock` / `lastUnderlyingBlock` — payment window blocks
- `lastUnderlyingTimestamp` — payment deadline
- `paymentReference` — reference for tracking

**`RedemptionTicketCreated`** / **`RedemptionTicketUpdated`** — track:
- `agentVault` — agent vault address
- `redemptionTicketId` — ticket ID
- `ticketValueUBA` — ticket value in underlying currency

### Checking Redemption Status

Query the redemption request info using the request ID from the event:

```
AssetManager.redemptionRequestInfo(requestId) → RedemptionRequestInfo
```

**Skill script:** [scripts/redeem-fassets.ts](scripts/redeem-fassets.ts)

## Step 4: Agent Pays on Underlying Chain

After the redemption request, the assigned agent must send the underlying XRP to the redeemer's address within the payment window.

### Payment Deadlines

Two operational parameters govern the agent's payment window:
- `underlyingBlocksForPayment` — number of blocks allowed
- `underlyingSecondsForPayment` — minimum time permitted

The agent must pay **before both** the last block **and** the last timestamp.

## Handling Redemption Defaults

If the agent fails to pay within the timeframe, the redeemer can trigger a default:

1. **Obtain proof of non-payment** — use the Flare Data Connector to prove the agent did not send the XRP payment within the deadline
2. **Call `redemptionPaymentDefault()`** — submit the non-payment proof to the AssetManager
3. **Receive collateral** — the redeemer receives the agent's collateral plus a premium as compensation

**Guide:** [Redemption Defaults](https://dev.flare.network/fassets/developer-guides/fassets-redemption-default)

## Redemption Queue

FAssets uses a redemption queue (redemption ticket system) to track pending redemptions. You can query the queue to see total pending redemption value and lots.

**Skill script:** [scripts/get-redemption-queue.ts](scripts/get-redemption-queue.ts)

**Guide:** [Redemption Queue](https://dev.flare.network/fassets/developer-guides/fassets-redemption-queue)

## Alternative Redemption Methods

### Swap and Redeem

Swap another token (e.g. WC2FLR) for FXRP on a DEX and redeem in a single transaction using the `SwapAndRedeem` contract pattern.

**Guide:** [Swap and Redeem](https://dev.flare.network/fassets/developer-guides/fassets-swap-redeem)

### Auto-Redeem via LayerZero

Bridge FXRP from another chain (e.g. Hyperliquid EVM) back to Flare and automatically redeem to native XRP using a LayerZero Composer contract.

**Guide:** [FXRP Auto-Redeem](https://dev.flare.network/fxrp/oft/fxrp-autoredeem)

## Environment Variables

| Variable | Required For | Description |
|----------|-------------|-------------|
| `FLARE_RPC_URL` | All steps | Flare RPC endpoint (defaults to Coston2) |
| `PRIVATE_KEY` | All steps | Wallet private key for signing transactions |

## Additional Resources

- [FAssets Redemption Concept](https://dev.flare.network/fassets/redemption) — detailed redemption flow and mechanics
- [FAssets Operational Parameters](https://dev.flare.network/fassets/operational-parameters) — payment deadlines, block times, etc.
- [FDC Overview](https://dev.flare.network/fdc/overview) — Flare Data Connector for payment/non-payment verification
- [FXRP Overview](https://dev.flare.network/fxrp/overview) — FXRP architecture and usage
