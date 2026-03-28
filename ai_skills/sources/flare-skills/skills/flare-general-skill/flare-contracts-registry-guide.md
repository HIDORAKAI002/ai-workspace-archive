# Flare Contracts Registry Guide

How to retrieve Flare protocol contract addresses dynamically using the `FlareContractRegistry`.

**Source:** [dev.flare.network/network/guides/flare-contracts-registry](https://dev.flare.network/network/guides/flare-contracts-registry)

## Why Use the Registry

Never hardcode Flare contract addresses in production. Contract addresses can change on upgrades, and hardcoded or third-party-sourced addresses introduce security risks. The `FlareContractRegistry` is deployed at the **same stable address on every Flare network** and always returns the current, canonical addresses.

```
Registry address (all networks): 0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019
```

Applies to:
- Flare Mainnet (chain ID 14)
- Coston2 Testnet (chain ID 114)
- Songbird (chain ID 19)
- Coston Testnet (chain ID 16)

## Method 1: ContractRegistry Library (Recommended)

The `@flarenetwork/flare-periphery-contracts` package provides a `ContractRegistry` Solidity library with typed shorthand methods — the simplest and safest approach.

### Solidity

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
import {IFtsoV2} from "@flarenetwork/flare-periphery-contracts/coston2/IFtsoV2.sol";

contract MyContract {
    IFtsoV2 internal ftsoV2 = ContractRegistry.getFtsoV2();

    // Or resolve lazily per call:
    function getPrice() external {
        IFtsoV2 ftso = ContractRegistry.getFtsoV2();
        // use ftso...
    }
}
```

**Available shorthand methods (examples):**

| Method | Returns |
|--------|---------|
| `ContractRegistry.getFtsoV2()` | `IFtsoV2` |
| `ContractRegistry.getTestFtsoV2()` | `ITestFtsoV2` (Coston2 only, free view calls) |
| `ContractRegistry.getFdcHub()` | `IFdcHub` |
| `ContractRegistry.getFdcVerification()` | `IFdcVerification` |
| `ContractRegistry.getFeeCalculator()` | `IFeeCalculator` |
| `ContractRegistry.getRandomNumberV2()` | `IRandomNumberV2` |

Use network-specific imports: `coston2/`, `flare/`, `songbird/`, `coston/`.

> If a contract doesn't have a shorthand method, fall back to Method 2 below.

## Method 2: `getContractAddressByName`

Call `getContractAddressByName(string)` directly on the registry contract. Useful when `ContractRegistry` library doesn't have a shorthand for the contract you need.

### Solidity

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {IFlareContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/IFlareContractRegistry.sol";

contract MyContract {
    IFlareContractRegistry internal registry =
        IFlareContractRegistry(0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019);

    function getFtsoAddress() external view returns (address) {
        return registry.getContractAddressByName("FtsoV2");
    }

    function getAllContracts() external view returns (
        string[] memory names,
        address[] memory addresses
    ) {
        return registry.getAllContracts();
    }
}
```

### TypeScript (ethers)

```typescript
import { ethers } from "ethers";
import { interfaceToAbi } from "@flarenetwork/flare-periphery-contract-artifacts";

const REGISTRY_ADDRESS = "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";

const provider = new ethers.JsonRpcProvider(
  "https://coston2-api.flare.network/ext/C/rpc"
);

const registryAbi = interfaceToAbi("IFlareContractRegistry", "coston2");
const registry = new ethers.Contract(REGISTRY_ADDRESS, registryAbi, provider);

// Get a single contract address by name
const ftsoAddress = await registry.getContractAddressByName("FtsoV2");
console.log("FtsoV2:", ftsoAddress);

// List all registered contracts
const [names, addresses] = await registry.getAllContracts();
names.forEach((name: string, i: number) => {
  console.log(`${name}: ${addresses[i]}`);
});
```

### TypeScript (viem / wagmi)

```typescript
import { createPublicClient, http } from "viem";
import { flareTestnet } from "viem/chains";
import { flareContractsRegistryAbi } from "@flarenetwork/flare-wagmi-periphery-package";

const REGISTRY_ADDRESS = "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";

const client = createPublicClient({
  chain: flareTestnet,
  transport: http(),
});

// Get a single contract address by name
const ftsoAddress = await client.readContract({
  address: REGISTRY_ADDRESS,
  abi: flareContractsRegistryAbi,
  functionName: "getContractAddressByName",
  args: ["FtsoV2"],
});
console.log("FtsoV2:", ftsoAddress);

// List all registered contracts
const [names, addresses] = await client.readContract({
  address: REGISTRY_ADDRESS,
  abi: flareContractsRegistryAbi,
  functionName: "getAllContracts",
  args: [],
});
```

## Method 3: Hardcoded Address (Not Recommended)

Hardcoding any contract address other than the `FlareContractRegistry` itself is explicitly discouraged:

- Contract addresses **can change** on upgrades.
- Addresses from unofficial sources (social media, DMs, third-party sites) are a common attack vector.
- The registry address (`0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019`) is the only address safe to hardcode because it is stable across all networks and upgrades.

## Key Notes

- Always resolve addresses at runtime — do not pass them as constructor arguments or cache them permanently.
- On **Coston2**, use `ContractRegistry.getTestFtsoV2()` instead of `getFtsoV2()` — the test interface provides free view calls with no fees, suitable for development.
- Use `getAllContracts()` to discover all contract names registered on a given network.
- Import from the network-specific path matching your deployment target: `coston2/`, `flare/`, `songbird/`, `coston/`.
