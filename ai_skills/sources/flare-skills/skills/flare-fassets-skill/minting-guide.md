# FAssets Minting Guide

Complete guide for minting FAssets (e.g. FXRP) on the Flare network. Minting wraps underlying tokens like XRP into ERC-20 FAssets for use within Flare's DeFi ecosystem.

**Sources:** [Mint FAssets](https://dev.flare.network/fassets/developer-guides/fassets-mint) | [Mint with Executor](https://dev.flare.network/fassets/developer-guides/fassets-mint-executor)

## Prerequisites

- Flare Hardhat Starter Kit or any Node.js project with ethers
- Flare periphery packages for ABI and type safety:
  - Solidity contracts: [@flarenetwork/flare-periphery-contracts](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contracts)
  - Artifacts: [@flarenetwork/flare-periphery-contract-artifacts](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts)
  - Wagmi types: [@flarenetwork/flare-wagmi-periphery-package](https://www.npmjs.com/package/@flarenetwork/flare-wagmi-periphery-package)
- For XRP payments: `xrpl` npm package

**Testing on Coston2:** Obtain testnet C2FLR and FXRP from the [Coston2 Faucet](https://faucet.flare.network/coston2) instead of executing the full minting flow.

## Minting Flow Overview

Minting FAssets is a four-step process:

```
1. Reserve Collateral  →  2. Send XRP Payment  →  3. Generate FDC Proof  →  4. Execute Minting
   (Flare tx)                (XRPL tx)               (FDC attestation)        (Flare tx)
```

## Step 1: Reserve Collateral from an Agent

Select an agent with sufficient free collateral and call `reserveCollateral()` on the AssetManager.

### Fees

| Fee | Paid In | Purpose |
|-----|---------|---------|
| Collateral Reservation Fee (CRF) | Native tokens (FLR/SGB) | Compensates agents and CPT holders for locked collateral |
| Minting Fee | Underlying currency (XRP) | Primary revenue source for agents and CPT holders |
| Executor Fee (optional) | Native tokens (FLR/SGB) | Incentivizes third-party minting execution |

**Important:** If minting fails, the CRF is **not refunded** — it distributes to the agent and their collateral pool.

### Agent Selection

Use `getAvailableAgentsDetailedList()` to fetch available agents. Filter by:
1. Sufficient `freeCollateralLots` for your mint amount
2. Agent `status === 0` (NORMAL / healthy)
3. Lowest `feeBIPS` (minting fee)

### Contract Calls

```
AssetManager.collateralReservationFee(lots) → fee amount (in native token)
AssetManager.reserveCollateral(agentVault, lots, maxFeeBIPS, executorAddress, { value: fee })
```

- Pass `address(0)` as executor if not using one.
- The `CollateralReserved` event contains:
  - `collateralReservationId` — needed for Step 4
  - `paymentAddress` — agent's underlying chain address
  - `paymentReference` — must be included in the XRP payment memo
  - `valueUBA` + `feeUBA` — total XRP to send
  - `lastUnderlyingBlock` / `lastUnderlyingTimestamp` — payment deadlines

**Skill script:** [scripts/reserve-collateral.ts](scripts/reserve-collateral.ts)

## Step 2: Send XRP Payment to Agent

Send XRP on the XRP Ledger to the agent's underlying address. The payment reference from the `CollateralReserved` event **must** be included in the transaction memo.

### Payment Amount

Calculate from the `CollateralReserved` event:

```
totalUBA = valueUBA + feeUBA
totalXRP = totalUBA / 10^assetMintingDecimals
```

### Payment Deadlines

The system enforces two constraints simultaneously:
- `lastUnderlyingBlock` — final valid block number on the underlying chain
- `lastUnderlyingTimestamp` — deadline timestamp

The payment must occur **before both** the last block **and** the last timestamp.

### Payment Failure

If payment is not made in time:
- The agent proves non-payment via the Flare Data Connector
- The agent's reserved collateral is released
- The agent receives the CRF (non-refundable to minter)
- The minter must restart the process

**Skill script:** [scripts/xrp-payment.ts](scripts/xrp-payment.ts)

## Step 3: Generate Proof with Flare Data Connector

After the XRP payment is confirmed on-ledger, use the FDC to validate the payment and generate a Merkle proof.

1. Prepare an attestation request for the `Payment` attestation type with source `testXRP` (testnet) or `XRP` (mainnet).
2. Submit the request to the FDC verifier.
3. Wait for the attestation to be included in a voting round.
4. Retrieve the Merkle proof from the Data Availability Layer using the voting round ID.

**Guide:** [FDC Payment (Hardhat)](https://dev.flare.network/fdc/guides/hardhat/payment)

## Step 4: Execute Minting

Call `executeMinting()` on the AssetManager with the FDC proof and the collateral reservation ID from Step 1.

```
AssetManager.executeMinting(proof, collateralReservationId)
```

Where `proof` contains:
- `merkleProof` — Merkle proof bytes from the DA Layer
- `data` — attestation response data

On success, the transaction emits:
- `MintingExecuted` — confirms FAssets have been minted
- `RedemptionTicketCreated` — a redemption ticket is added to the queue

The minter's wallet now holds the newly minted FXRP tokens.

**Skill script:** [scripts/execute-minting.ts](scripts/execute-minting.ts)

## Minting with Executor

Executors are external actors that monitor pending minting requests and execute them by submitting payment proofs on-chain. This decouples proof submission from the minter, enabling wallets or dApps to automate the complete minting workflow.

### How It Differs from Standard Minting

In standard minting, the minter handles all four steps. With an executor:
- The **minter** performs Steps 1–2 (reserve collateral, send XRP payment)
- The **executor** performs Steps 3–4 (generate FDC proof, call `executeMinting()`)
- The executor earns a configurable fee for this service

### Using an Executor

**Step 1 changes — Reserve Collateral:**
- Pass the executor's address (instead of `address(0)`) as the `_executor` parameter in `reserveCollateral()`
- Include the executor fee in the transaction value:

```
totalValue = collateralReservationFee + executorFee
AssetManager.reserveCollateral(agentVault, lots, maxFeeBIPS, executorAddress, { value: totalValue })
```

**Steps 2 remains the same** — the minter sends XRP payment as usual.

**Steps 3–4 handled by executor:**
- The executor monitors the `CollateralReserved` event for pending minting requests
- Once the XRP payment is confirmed, the executor obtains the FDC proof
- The executor calls `executeMinting()` with the proof and collateral reservation ID
- On success, the executor receives the agreed fee in native tokens (FLR/SGB)

### When to Use an Executor

- The minter cannot stay online to monitor FDC round completion
- A dApp or wallet service handles proof submission on behalf of users
- Automating the minting flow end-to-end for better UX

## Post-Minting

Successfully minted FAssets can be:
- Used in Flare DeFi (lending, liquidity pools, vaults like Firelight)
- Transferred to other addresses on Flare
- Bridged cross-chain via LayerZero OFT
- Redeemed back to native XRP

## Environment Variables

| Variable | Required For | Description |
|----------|-------------|-------------|
| `FLARE_RPC_URL` | Steps 1, 4 | Flare RPC endpoint (defaults to Coston2) |
| `PRIVATE_KEY` | Steps 1, 4 | Wallet private key for signing transactions |
| `COSTON2_DA_LAYER_URL` | Step 4 | FDC Data Availability Layer URL |
| `VERIFIER_URL_TESTNET` | Step 4 | FDC verifier endpoint |
| `VERIFIER_API_KEY_TESTNET` | Step 4 | FDC verifier API key |

## Additional Resources

- [FAssets Minting Concept](https://dev.flare.network/fassets/minting) — detailed minting flow, fees, and failure handling
- [FAssets Operational Parameters](https://dev.flare.network/fassets/operational-parameters) — `underlyingSecondsForPayment`, `underlyingBlocksForPayment`, etc.
- [FDC Overview](https://dev.flare.network/fdc/overview) — Flare Data Connector for payment verification
- [FXRP Overview](https://dev.flare.network/fxrp/overview) — FXRP architecture and usage
