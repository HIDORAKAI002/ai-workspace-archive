# Gasless FXRP Payments Guide

Gasless FXRP transfers use EIP-712 signed meta-transactions: users authorize payments off-chain and a relayer submits them on-chain, covering gas costs on the user's behalf.

**Source:** [Gasless FXRP Payments](https://dev.flare.network/fxrp/token-interactions/gasless-fxrp-payments)

## Standards

- **EIP-712** — typed structured data signing for secure off-chain message creation
- **EIP-3009-style meta-transactions** — implemented via a custom `GaslessPaymentForwarder` contract rather than at the token level

## Architecture

```
User (signs off-chain)  →  Relayer (submits tx)  →  GaslessPaymentForwarder  →  FXRP transferFrom
```

1. User calls `signPaymentRequest()` → creates an EIP-712 signature locally (no gas, no on-chain tx).
2. User POSTs the signed `PaymentRequest` to the relayer service.
3. Relayer validates (signature recovery, deadline, balance, allowance) then calls `executePayment()`.
4. Forwarder verifies signature on-chain and executes the FXRP `transferFrom`.

## Prerequisites

- Hardhat project with Node.js + npm
- Dependencies:
  ```
  npm install ethers viem express @openzeppelin/contracts @flarenetwork/flare-periphery-contracts
  ```
- A funded relayer wallet (needs FLR to cover gas)

## Components

### GaslessPaymentForwarder (Solidity)

- Implements EIP-712 domain separation (includes forwarder address + chainId)
- Fetches FXRP address from `FlareContractRegistry` at runtime — never hardcoded
- Nonce-based replay protection; reentrancy guards
- Relayer allowlist
- Key methods:
  - `executePayment(request, signature)` — verifies and executes the transfer
  - `getNonce(address)` — returns the current nonce for off-chain signing
  - `getPaymentRequestHash(request)` — returns the EIP-712 digest

### Payment Utilities (TypeScript)

| Function | Description |
|----------|-------------|
| `getNonce(address)` | Fetch current nonce from the forwarder |
| `signPaymentRequest(request)` | Create EIP-712 signature |
| `createPaymentRequest(from, to, amount, deadline)` | Assemble the full payment payload |
| `approveFXRP(amount)` | One-time token approval for the forwarder |
| `checkUserStatus(address)` | Verify balance and allowance before signing |
| `parseAmount()` / `formatAmount()` | Handle decimal conversions |

### Relayer Service (Express.js)

Endpoints:
- `GET /nonce/:address` — retrieve current nonce
- `POST /execute` — validate and submit a signed payment request

Validation before submission:
1. Recover signer from EIP-712 signature — must match `from`
2. Check deadline against chain time (prevents clock skew)
3. Confirm sufficient FXRP balance
4. Validate token allowance for the forwarder
5. Gas estimate with 30% buffer

## Payment Request Structure

```ts
{
  from:      string,   // sender address
  to:        string,   // recipient address
  amount:    bigint,   // amount in wei
  deadline:  number,   // unix timestamp
  signature: string,   // EIP-712 signature
}
```

## Replay Protection

- **Nonce** — increments per executed payment; prevents replay
- **Deadline** — unix timestamp; relayer rejects expired requests
- **EIP-712 domain** — binds signature to a specific forwarder address and chainId

## One-Time Setup

Users must call `approveFXRP()` once to approve the forwarder contract before their first gasless transfer. After that, subsequent payments require only an off-chain signature.

## Running the Example

```bash
# 1. Compile contracts
npx hardhat compile

# 2. Deploy forwarder
npx hardhat run scripts/deploy.ts --network coston2

# 3. Start the relayer
npx ts-node relayer/index.ts

# 4. Run the example flow
npx ts-node scripts/example-usage.ts
```

## Environment Variables

```
PRIVATE_KEY=          # deployer wallet
RELAYER_PRIVATE_KEY=  # relayer funded wallet
USER_PRIVATE_KEY=     # test user wallet
FORWARDER_ADDRESS=    # deployed forwarder contract
RPC_URL=              # network RPC endpoint
RELAYER_URL=          # relayer service URL
```

> **Security:** Private keys must never be exposed to AI assistants or stored in prompts. Keep keys in secure, user-controlled environments. The relayer wallet requires FLR — ensure it is funded and its key is protected.

## Supported Networks

| Network | Chain ID |
|---------|----------|
| Flare mainnet | 14 |
| Coston2 testnet | 114 |
| Songbird | 19 |
