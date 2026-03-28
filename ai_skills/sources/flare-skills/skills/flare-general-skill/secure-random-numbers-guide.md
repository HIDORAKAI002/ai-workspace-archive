# Secure Random Numbers Guide

How to get secure, decentralized random numbers on Flare using the `RandomNumberV2` contract.

**Source:** [dev.flare.network/network/guides/secure-random-numbers](https://dev.flare.network/network/guides/secure-random-numbers)

## How It Works

Random numbers are generated via the **Scaling protocol** every **90 seconds** (one voting round). ~100 independent data providers each commit a locally-generated random value, then reveal it. The final random number is:

```
R = (∑ rᵢ) mod 2ⁿ
```

Because commits are fixed before reveals, if any one `rᵢ` is uniformly random and not chosen adaptively after seeing others, `R` is uniformly random. If manipulation is detected (omission or mismatch), the `isSecure` flag is set to `false`, offenders are penalized, and their values are excluded.

**Four phases per round:**
1. **Commit** — providers hash their submission with a local random number
2. **Reveal** — all inputs revealed onchain
3. **Sign** — weighted medians and rewards packed into a Merkle root
4. **Finalize** — round completes once sufficient signatures agree on the same root

## Contract Addresses

| Network | Address |
|---------|---------|
| Coston2 (Testnet) | `0x5CdF9eAF3EB8b44fB696984a1420B56A7575D250` |
| Flare Mainnet | `0x97702e350CaEda540935d92aAf213307e9069784` |

> Prefer resolving via `ContractRegistry.getRandomNumberV2()` rather than hardcoding. See [flare-contracts-registry-guide.md](flare-contracts-registry-guide.md).

## Interface

```solidity
interface RandomNumberV2Interface {
    function getRandomNumber()
        external
        view
        returns (
            uint256 randomNumber,   // The random value
            bool isSecure,          // true = all providers committed/revealed correctly
            uint256 timestamp       // UNIX timestamp of the voting round end
        );
}
```

**Always check `isSecure` before using the value.** If `isSecure == false`, wait for the next round.

## Onchain (Solidity)

### Basic Consumer

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
import {RandomNumberV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/RandomNumberV2Interface.sol";

contract SecureRandomConsumer {
    RandomNumberV2Interface public immutable randomV2;

    constructor() {
        randomV2 = ContractRegistry.getRandomNumberV2();
    }

    function getSecureRandomNumber()
        external
        view
        returns (uint256 randomNumber, bool isSecure, uint256 timestamp)
    {
        (randomNumber, isSecure, timestamp) = randomV2.getRandomNumber();
        require(isSecure, "Random number is not secure yet");
    }
}
```

### Lottery Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {RandomNumberV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/RandomNumberV2Interface.sol";

contract LotteryWithRandomNumber {
    RandomNumberV2Interface internal randomNumberGenerator;
    address[] public participants;
    uint256 public lotteryId;
    uint256 public lotteryEndTimestamp;

    event LotteryDrawn(
        uint256 indexed lotteryId,
        address winner,
        uint256 randomNumber,
        uint256 timestamp
    );

    constructor(address _randomNumberGenerator) {
        randomNumberGenerator = RandomNumberV2Interface(_randomNumberGenerator);
    }

    function enterLottery() external {
        require(block.timestamp < lotteryEndTimestamp, "Lottery has ended");
        participants.push(msg.sender);
    }

    function startLottery(uint256 duration) external {
        require(participants.length == 0, "Previous lottery must be concluded first");
        lotteryId++;
        lotteryEndTimestamp = block.timestamp + duration;
    }

    function drawLottery() external {
        require(block.timestamp >= lotteryEndTimestamp, "Lottery is still ongoing");
        require(participants.length > 0, "No participants in the lottery");

        (uint256 randomNumber, bool isSecureRandom, uint256 randomTimestamp) =
            randomNumberGenerator.getRandomNumber();

        require(isSecureRandom, "Random number is not secure, try again");

        uint256 winnerIndex = randomNumber % participants.length;
        address winner = participants[winnerIndex];

        emit LotteryDrawn(lotteryId, winner, randomNumber, randomTimestamp);
        delete participants;
    }
}
```

**Important:** Set EVM version to **cancun** when compiling. Use network-specific imports (`coston2/`, `flare/`, `songbird/`).

## Offchain

The random number updates every **90 seconds**. Poll no more than once per voting round.

### TypeScript (ethers)

```typescript
import { ethers } from "ethers";

const ADDRESS = "0x5CdF9eAF3EB8b44fB696984a1420B56A7575D250"; // Coston2
const RPC_URL = "https://coston2-api.flare.network/ext/C/rpc";
const ABI = [
  {
    inputs: [],
    name: "getRandomNumber",
    outputs: [
      { internalType: "uint256", name: "_randomNumber", type: "uint256" },
      { internalType: "bool", name: "_isSecureRandom", type: "bool" },
      { internalType: "uint256", name: "_randomTimestamp", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const provider = new ethers.JsonRpcProvider(RPC_URL);
const randomV2 = new ethers.Contract(ADDRESS, ABI, provider);

const [randomNumber, isSecure, timestamp] = await randomV2.getRandomNumber();
console.log("Random Number:", randomNumber.toString());
console.log("Is secure:", isSecure);
console.log("Timestamp:", timestamp.toString());
```

### TypeScript (viem)

```typescript
import { createPublicClient, http } from "viem";
import { flareTestnet } from "viem/chains";

const ADDRESS = "0x5CdF9eAF3EB8b44fB696984a1420B56A7575D250"; // Coston2
const ABI = [
  {
    inputs: [],
    name: "getRandomNumber",
    outputs: [
      { name: "_randomNumber", type: "uint256" },
      { name: "_isSecureRandom", type: "bool" },
      { name: "_randomTimestamp", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const client = createPublicClient({
  chain: flareTestnet,
  transport: http(),
});

const [randomNumber, isSecure, timestamp] = await client.readContract({
  address: ADDRESS,
  abi: ABI,
  functionName: "getRandomNumber",
});
```

### Python (web3.py)

```python
from web3 import AsyncWeb3, AsyncHTTPProvider
import asyncio

ADDRESS = "0x5CdF9eAF3EB8b44fB696984a1420B56A7575D250"
RPC_URL = "https://coston2-api.flare.network/ext/C/rpc"
ABI = '[{"inputs":[],"name":"getRandomNumber","outputs":[{"internalType":"uint256","name":"_randomNumber","type":"uint256"},{"internalType":"bool","name":"_isSecureRandom","type":"bool"},{"internalType":"uint256","name":"_randomTimestamp","type":"uint256"}],"stateMutability":"view","type":"function"}]'

async def main():
    w3 = AsyncWeb3(AsyncHTTPProvider(RPC_URL))
    random_v2 = w3.eth.contract(
        address=w3.to_checksum_address(ADDRESS), abi=ABI
    )
    res = await random_v2.functions.getRandomNumber().call()
    print("Random Number:", res[0])
    print("Is secure random:", res[1])
    print("Timestamp:", res[2])

asyncio.run(main())
```

### Go (go-ethereum)

```go
package main

import (
    "context"
    "fmt"

    "github.com/ethereum/go-ethereum/accounts/abi/bind"
    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/ethclient"
)

func main() {
    address := common.HexToAddress("0x5CdF9eAF3EB8b44fB696984a1420B56A7575D250")
    client, _ := ethclient.Dial("https://coston2-api.flare.network/ext/C/rpc")

    randomV2, _ := NewRandomNumberV2(address, client)
    opts := &bind.CallOpts{Context: context.Background()}
    res, _ := randomV2.GetRandomNumber(opts)

    fmt.Println("Random number:", res.RandomNumber)
    fmt.Println("Is secure random:", res.IsSecureRandom)
    fmt.Println("Timestamp:", res.RandomTimestamp)
}
```

### Rust (alloy-rs)

```rust
use alloy::{primitives::address, providers::ProviderBuilder, sol};

sol!(
    #[sol(rpc)]
    RandomNumberV2,
    "RandomNumberV2.json"
);

#[tokio::main]
async fn main() -> eyre::Result<()> {
    let random_v2_address = address!("5CdF9eAF3EB8b44fB696984a1420B56A7575D250");
    let provider = ProviderBuilder::new()
        .connect_http("https://coston2-api.flare.network/ext/C/rpc".parse()?);
    let random_v2 = RandomNumberV2::new(random_v2_address, provider);

    let RandomNumberV2::getRandomNumberReturn {
        _randomNumber,
        _isSecureRandom,
        _randomTimestamp,
    } = random_v2.getRandomNumber().call().await?;

    println!("Random Number: {_randomNumber}");
    println!("Is secure random: {_isSecureRandom}");
    println!("Timestamp: {_randomTimestamp}");
    Ok(())
}
```

## Security Rules

- **Never use the value if `isSecure == false`.** Wait for the next voting round (~90s).
- The random number updates every 90 seconds — poll at most once per round.
- Use `randomNumber % N` to pick a winner from N participants (standard modulo reduction).
- Querying `getRandomNumber()` is a free view call — no gas or fee required.
