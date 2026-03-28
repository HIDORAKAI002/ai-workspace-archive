# Hardhat & Foundry Starter Kit Guide

How to set up and use the official Flare starter kits for smart contract development.

**Source:** [dev.flare.network/network/guides/hardhat-foundry-starter-kit](https://dev.flare.network/network/guides/hardhat-foundry-starter-kit)

## Repositories

| Tool | Repository |
|------|-----------|
| Hardhat | https://github.com/flare-foundation/flare-hardhat-starter |
| Foundry | https://github.com/flare-foundation/flare-foundry-starter |

Both include FTSO, FDC, FAssets, and Smart Accounts examples.

## Hardhat Starter Kit

### Prerequisites

- Node.js v18+
- npm or yarn
- Optional: [Hardhat for VS Code](https://hardhat.org/hardhat-vscode/docs/overview)

### Setup

```bash
git clone https://github.com/flare-foundation/flare-hardhat-starter.git
cd flare-hardhat-starter
npm install --force   # or: yarn
cp .env.example .env
```

Edit `.env` and set your private key:

```env
PRIVATE_KEY=your_private_key_here
```

### Commands

```bash
# Compile contracts
yarn hardhat compile

# Run tests
yarn hardhat test

# Deploy to Coston2 testnet
yarn hardhat run scripts/tryDeployment.ts --network coston2

# Deploy to Flare mainnet
yarn hardhat run scripts/tryDeployment.ts --network flare
```

### Hardhat Config (network setup)

```typescript
// hardhat.config.ts
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.25",
    settings: {
      evmVersion: "cancun",  // Required for Flare periphery contracts
    },
  },
  networks: {
    coston2: {
      url: "https://coston2-api.flare.network/ext/C/rpc",
      chainId: 114,
      accounts: [process.env.PRIVATE_KEY!],
    },
    flare: {
      url: "https://flare-api.flare.network/ext/C/rpc",
      chainId: 14,
      accounts: [process.env.PRIVATE_KEY!],
    },
    songbird: {
      url: "https://songbird-api.flare.network/ext/C/rpc",
      chainId: 19,
      accounts: [process.env.PRIVATE_KEY!],
    },
    coston: {
      url: "https://coston-api.flare.network/ext/C/rpc",
      chainId: 16,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;
```

## Foundry Starter Kit

### Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation) installed (`curl -L https://foundry.paradigm.xyz | bash && foundryup`)

### Setup

```bash
git clone https://github.com/flare-foundation/flare-foundry-starter.git
cd flare-foundry-starter
forge soldeer install
cp .env.example .env
```

Edit `.env`:

```env
PRIVATE_KEY=your_private_key_here
```

Load environment variables:

```bash
source .env
```

Modify `remappings.txt` if needed to resolve `/src` paths for dependencies.

### Commands

```bash
# Build contracts
forge build

# Run tests
forge test

# Deploy to Coston2
forge script script/Counter.s.sol \
  --broadcast \
  --private-key $PRIVATE_KEY \
  --rpc-url https://coston2-api.flare.network/ext/C/rpc

# Deploy to Flare mainnet
forge script script/Counter.s.sol \
  --broadcast \
  --private-key $PRIVATE_KEY \
  --rpc-url https://flare-api.flare.network/ext/C/rpc
```

### foundry.toml (EVM version)

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
evm_version = "cancun"   # Required for Flare periphery contracts
```

## Configured Networks

| Network | Chain ID | RPC |
|---------|----------|-----|
| Flare Mainnet | 14 | `https://flare-api.flare.network/ext/C/rpc` |
| Coston2 Testnet | 114 | `https://coston2-api.flare.network/ext/C/rpc` |
| Songbird | 19 | `https://songbird-api.flare.network/ext/C/rpc` |
| Coston Testnet | 16 | `https://coston-api.flare.network/ext/C/rpc` |

## Key Notes

- Always set `evmVersion: "cancun"` — required when using `@flarenetwork/flare-periphery-contracts`.
- Get testnet tokens from the [Coston2 Faucet](https://faucet.flare.network/coston2).
- Never commit your `.env` file or private keys to version control.
- Use `ContractRegistry` to resolve all protocol contract addresses at runtime — never hardcode them.
