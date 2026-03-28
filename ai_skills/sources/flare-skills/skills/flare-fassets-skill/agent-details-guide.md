# Read FAssets Agent Details Guide

How to retrieve FAssets agent information — name, description, logo, and terms of use — using the `AgentOwnerRegistry` smart contract.

**Source:** [dev.flare.network/fassets/developer-guides/fassets-agent-details](https://dev.flare.network/fassets/developer-guides/fassets-agent-details)

## What Agent Details Are

Each FAssets agent has the following metadata registered on-chain:

| Field | Description |
|-------|-------------|
| **Management Address** | The agent's operational control address (used as lookup key) |
| **Name** | Display name shown in UIs |
| **Description** | Detailed information about the agent |
| **Icon URL** | URL to the agent's logo/branding image |
| **Terms of Use URL** | URL to the agent's terms and conditions |

## Prerequisites

- `@flarenetwork/flare-periphery-contracts` — Solidity interfaces
- Basic understanding of the FAssets system and `ContractRegistry`

## Implementation

### Step 1 — Get the AgentOwnerRegistry Address

The `AgentOwnerRegistry` address is stored in the `AssetManager` settings. Resolve `AssetManager` via `ContractRegistry`:

```solidity
import {IAssetManager} from "@flarenetwork/flare-periphery-contracts/coston2/IAssetManager.sol";
import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";

IAssetManager assetManager = ContractRegistry.getAssetManagerFXRP();
address agentOwnerRegistryAddress = assetManager.getSettings().agentOwnerRegistry;
```

### Step 2 — Instantiate AgentOwnerRegistry

```solidity
import {IAgentOwnerRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/IAgentOwnerRegistry.sol";

IAgentOwnerRegistry agentOwnerRegistry = IAgentOwnerRegistry(agentOwnerRegistryAddress);
```

### Step 3 — Read Agent Details

```solidity
// Individual fields
string memory name        = agentOwnerRegistry.getAgentName(_managementAddress);
string memory description = agentOwnerRegistry.getAgentDescription(_managementAddress);
string memory iconUrl     = agentOwnerRegistry.getAgentIconUrl(_managementAddress);
string memory termsUrl    = agentOwnerRegistry.getAgentTermsOfUseUrl(_managementAddress);
```

## Complete Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {IAssetManager} from "@flarenetwork/flare-periphery-contracts/coston2/IAssetManager.sol";
import {IAgentOwnerRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/IAgentOwnerRegistry.sol";
import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";

contract AgentDetailsReader {
    function getAgentDetails(address _managementAddress)
        external
        view
        returns (
            string memory name,
            string memory description,
            string memory iconUrl,
            string memory termsOfUseUrl
        )
    {
        IAssetManager assetManager = ContractRegistry.getAssetManagerFXRP();
        address agentOwnerRegistryAddress = assetManager.getSettings().agentOwnerRegistry;
        IAgentOwnerRegistry agentOwnerRegistry = IAgentOwnerRegistry(agentOwnerRegistryAddress);

        name        = agentOwnerRegistry.getAgentName(_managementAddress);
        description = agentOwnerRegistry.getAgentDescription(_managementAddress);
        iconUrl     = agentOwnerRegistry.getAgentIconUrl(_managementAddress);
        termsOfUseUrl = agentOwnerRegistry.getAgentTermsOfUseUrl(_managementAddress);
    }
}
```

## IAgentOwnerRegistry Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getAgentName(address)` | `string` | Agent display name |
| `getAgentDescription(address)` | `string` | Agent description |
| `getAgentIconUrl(address)` | `string` | URL to agent logo/icon |
| `getAgentTermsOfUseUrl(address)` | `string` | URL to agent terms of use |

All methods take the agent's **management address** as the parameter and are `view` (no gas for off-chain reads).

## Key Notes

- The `AgentOwnerRegistry` address is not fixed — always resolve it from `assetManager.getSettings().agentOwnerRegistry`.
- Use `ContractRegistry.getAssetManagerFXRP()` for FXRP on Coston2/Flare; use the corresponding method for other FAssets (FBTC, FDOGE).
- Use network-specific imports: `coston2/` for testnet, `flare/` for mainnet.
- Set EVM version to **cancun** when compiling.
