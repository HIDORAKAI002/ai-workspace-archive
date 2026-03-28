# Wrapped Native Tokens (WNat) Guide

How to wrap and unwrap native tokens on Flare networks using the `WNat` (Wrapped Native) contract.

**Source:** [dev.flare.network/network/guides/wnat](https://dev.flare.network/network/guides/wnat)

## What WNat Is

Each Flare network has a native gas token (FLR, SGB, C2FLR, CFLR). Native tokens cannot be used directly with ERC-20 interfaces. `WNat` wraps native tokens into a standard ERC-20 token, enabling them to be used in smart contracts, DeFi protocols, and Flare's on-chain systems.

**WNat is required for:**
- **FTSO delegation** — delegating vote power to FTSO data providers to earn rewards
- **Governance voting** — participating in FIPs, STPs, and SIPs
- **DeFi** — any protocol that expects an ERC-20 token

## Contract Addresses

| Network | Token | Address |
|---------|-------|---------|
| Flare Mainnet | WFLR | Resolve via `ContractRegistry.getWNat()` |
| Coston2 Testnet | WC2FLR | Resolve via `ContractRegistry.getWNat()` |
| Songbird | WSGB | Resolve via `ContractRegistry.getWNat()` |
| Coston Testnet | WCFLR | `0x767b25A658E8FC8ab6eBbd52043495dB61b4ea91` |

> Always resolve via `ContractRegistry` rather than hardcoding. See [flare-contracts-registry-guide.md](flare-contracts-registry-guide.md).

## Interface

`WNat` implements the standard ERC-20 interface plus deposit/withdraw:

```solidity
interface IWNat is IERC20 {
    // Wrap: send native tokens, receive WNat 1:1
    function deposit() external payable;

    // Wrap to a specific address
    function depositTo(address recipient) external payable;

    // Unwrap: burn WNat, receive native tokens 1:1
    function withdraw(uint256 amount) external;

    // Unwrap to a specific address
    function withdrawTo(address payable recipient, uint256 amount) external;
}
```

## Onchain (Solidity)

### Wrap Native Tokens

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
import {IWNat} from "@flarenetwork/flare-periphery-contracts/coston2/IWNat.sol";

contract WNatExample {
    IWNat public immutable wNat;

    constructor() {
        wNat = IWNat(address(ContractRegistry.getWNat()));
    }

    // Wrap native tokens sent with the call
    function wrap() external payable {
        wNat.deposit{value: msg.value}();
    }

    // Unwrap WNat back to native tokens
    function unwrap(uint256 amount) external {
        wNat.withdraw(amount);
    }

    // Check WNat balance of an address
    function wnatBalance(address account) external view returns (uint256) {
        return wNat.balanceOf(account);
    }
}
```

### Delegate Vote Power

After wrapping, you can delegate your WNat vote power to an FTSO data provider:

```solidity
import {IVPToken} from "@flarenetwork/flare-periphery-contracts/coston2/IVPToken.sol";

IVPToken wNatVP = IVPToken(address(ContractRegistry.getWNat()));

// Delegate 100% of vote power to a data provider
wNatVP.delegate(dataProviderAddress, 10000); // bips: 10000 = 100%

// Split delegation: 60% to provider A, 40% to provider B
wNatVP.delegate(providerA, 6000);
wNatVP.delegate(providerB, 4000);
```

## Offchain

### TypeScript (ethers + Hardhat)

```typescript
import { ethers } from "hardhat";
import { IWNat__factory } from "../typechain-types";

const WNAT_ADDRESS = "0x767b25A658E8FC8ab6eBbd52043495dB61b4ea91"; // Coston

async function main() {
  const [signer] = await ethers.getSigners();
  const wNat = IWNat__factory.connect(WNAT_ADDRESS, signer);

  // Wrap 0.1 native tokens
  const depositAmount = ethers.parseEther("0.1");
  const depositTx = await wNat.deposit({ value: depositAmount });
  await depositTx.wait();
  console.log("Wrapped:", ethers.formatEther(depositAmount), "tokens");

  // Check balance
  const balance = await wNat.balanceOf(signer.address);
  console.log("WNat balance:", ethers.formatEther(balance));

  // Unwrap 0.05
  const withdrawAmount = ethers.parseEther("0.05");
  const withdrawTx = await wNat.withdraw(withdrawAmount);
  await withdrawTx.wait();
  console.log("Unwrapped:", ethers.formatEther(withdrawAmount), "tokens");
}

main();
```

Run with:
```bash
npx hardhat run scripts/wnat.ts --network coston
```

### TypeScript (viem)

```typescript
import { createPublicClient, createWalletClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { flareTestnet } from "viem/chains";

const WNAT_ADDRESS = "0x767b25A658E8FC8ab6eBbd52043495dB61b4ea91"; // Coston

const WNAT_ABI = [
  { name: "deposit", type: "function", stateMutability: "payable", inputs: [], outputs: [] },
  { name: "withdraw", type: "function", stateMutability: "nonpayable", inputs: [{ name: "amount", type: "uint256" }], outputs: [] },
  { name: "balanceOf", type: "function", stateMutability: "view", inputs: [{ name: "account", type: "address" }], outputs: [{ type: "uint256" }] },
] as const;

const account = privateKeyToAccount("0x...");
const walletClient = createWalletClient({ account, chain: flareTestnet, transport: http() });
const publicClient = createPublicClient({ chain: flareTestnet, transport: http() });

// Wrap 0.1 native tokens
await walletClient.writeContract({
  address: WNAT_ADDRESS,
  abi: WNAT_ABI,
  functionName: "deposit",
  value: parseEther("0.1"),
});

// Check balance
const balance = await publicClient.readContract({
  address: WNAT_ADDRESS,
  abi: WNAT_ABI,
  functionName: "balanceOf",
  args: [account.address],
});
console.log("WNat balance:", balance);

// Unwrap 0.05
await walletClient.writeContract({
  address: WNAT_ADDRESS,
  abi: WNAT_ABI,
  functionName: "withdraw",
  args: [parseEther("0.05")],
});
```

## Key Notes

- Wrapping and unwrapping is always **1:1** — no fees, no slippage.
- `deposit()` is `payable` — send native tokens as `msg.value`.
- `withdraw()` burns WNat and returns native tokens to the caller.
- Use `depositTo` / `withdrawTo` to wrap/unwrap on behalf of another address.
- WNat vote power snapshot is taken at a specific block for governance and FTSO rewards — hold WNat before the snapshot block to be eligible.
- EVM version must be set to **cancun** when compiling contracts that import from `@flarenetwork/flare-periphery-contracts`.
