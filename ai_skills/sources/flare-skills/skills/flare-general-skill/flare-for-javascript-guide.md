# Flare for JavaScript Developers Guide

How to interact with Flare smart contracts using JavaScript and web3.js.

**Source:** [dev.flare.network/network/guides/flare-for-javascript-developers](https://dev.flare.network/network/guides/flare-for-javascript-developers)
**Examples:** https://github.com/flare-foundation/developer-hub/tree/main/examples

## Prerequisites

- Node.js v18+
- Solidity compiler (`solc`)
- web3.js

### Install Solidity Compiler

**macOS:**
```bash
brew tap ethereum/ethereum
brew install solidity
```

**Ubuntu:**
```bash
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt update
sudo apt install solc
```

### Install web3.js

```bash
npm install web3
# or
yarn add web3
```

## RPC Endpoints & Key Addresses

| Network | RPC | Chain ID |
|---------|-----|----------|
| Coston2 Testnet | `https://coston2-api.flare.network/ext/C/rpc` | 114 |
| Flare Mainnet | `https://flare-api.flare.network/ext/C/rpc` | 14 |

**FlareContractRegistry:** `0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019` (same on all networks)

## Examples

### Get Chain ID

```javascript
import { Web3 } from "web3";

export async function main() {
  const web3 = new Web3("https://coston2-api.flare.network/ext/C/rpc");
  const chainId = await web3.eth.getChainId();
  console.log(chainId); // 114n
  return chainId;
}
```

### Fetch Contract ABI from Explorer

```javascript
const base_url = "https://coston2-explorer.flare.network/api";

export async function main() {
  const params =
    "?module=contract&action=getabi&address=0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";
  const response = await fetch(base_url + params);
  const abi = JSON.parse((await response.json())["result"]);
  return abi;
}
```

### Query a Contract

```javascript
import { Web3 } from "web3";

const registry_addr = "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";
const base_url = "https://coston2-explorer.flare.network/api";

export async function main() {
  const params = `?module=contract&action=getabi&address=${registry_addr}`;
  const response = await fetch(base_url + params);
  const abi = JSON.parse((await response.json())["result"]);

  const w3 = new Web3("https://coston2-api.flare.network/ext/C/rpc");
  const registry = new w3.eth.Contract(abi, registry_addr);

  const wnatAddress = await registry.methods
    .getContractAddressByName("WNat")
    .call();
  console.log("WNat address:", wnatAddress);
  return wnatAddress;
}
```

### Create a New Account

```javascript
import { Web3 } from "web3";

const w3 = new Web3();
w3.eth.accounts.wallet.create(1);
console.log(
  `Account: ${w3.eth.accounts.wallet[0].address}, ` +
  `Private key: ${w3.eth.accounts.wallet[0].privateKey}`
);
```

### Compile a Contract

```bash
solc --evm-version cancun FtsoV2FeedConsumer.sol --abi --bin -o build
```

Always compile with `--evm-version cancun` for Flare contracts.

### Deploy a Contract

```javascript
import { Web3 } from "web3";
import fs from "fs";
import abi from "./build/FtsoV2FeedConsumer.json" assert { type: "json" };

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://coston2-api.flare.network/ext/C/rpc")
);
const bytecode = fs.readFileSync("./build/FtsoV2FeedConsumer.bin", "utf8");

const FtsoV2FeedConsumer = new web3.eth.Contract(abi);
FtsoV2FeedConsumer.handleRevert = true;

async function deploy() {
  const privateKey = process.env.ACCOUNT_PRIVATE_KEY.toString();
  const wallet = web3.eth.accounts.wallet.add(privateKey);

  const contractDeployer = FtsoV2FeedConsumer.deploy({
    data: "0x" + bytecode,
  });

  const tx = await contractDeployer.send({
    from: wallet[0].address,
    nonce: await web3.eth.getTransactionCount(wallet[0].address),
    gasPrice: await web3.eth.getGasPrice(),
  });

  console.log("Contract deployed at:", tx.options.address);
}

deploy();
```

## Example FTSO Consumer Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IFlareContractRegistry {
    function getContractAddressByName(
        string calldata _name
    ) external view returns (address);
}

interface TestFtsoV2Interface {
    function getFeedsById(
        bytes21[] calldata _feedIds
    )
        external
        view
        returns (
            uint256[] memory _values,
            int8[] memory _decimals,
            uint64 _timestamp
        );
}

contract FtsoV2FeedConsumer {
    IFlareContractRegistry internal contractRegistry;
    TestFtsoV2Interface internal ftsoV2;

    bytes21[] public feedIds = [
        bytes21(0x01464c522f55534400000000000000000000000000), // FLR/USD
        bytes21(0x014254432f55534400000000000000000000000000), // BTC/USD
        bytes21(0x014554482f55534400000000000000000000000000)  // ETH/USD
    ];

    constructor() {
        contractRegistry = IFlareContractRegistry(
            0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019
        );
        ftsoV2 = TestFtsoV2Interface(
            contractRegistry.getContractAddressByName("FtsoV2")
        );
    }

    function getFtsoV2CurrentFeedValues()
        external
        view
        returns (
            uint256[] memory _feedValues,
            int8[] memory _decimals,
            uint64 _timestamp
        )
    {
        return ftsoV2.getFeedsById(feedIds);
    }
}
```

## Key Notes

- Store private keys in environment variables (`ACCOUNT_PRIVATE_KEY`), never in source code.
- Get testnet C2FLR from the [Coston2 Faucet](https://faucet.flare.network/coston2).
- Always compile with `--evm-version cancun`.
