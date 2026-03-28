# Flare for Python Developers Guide

How to interact with Flare smart contracts using Python and web3.py.

**Source:** [dev.flare.network/network/guides/flare-for-python-developers](https://dev.flare.network/network/guides/flare-for-python-developers)
**Examples:** https://github.com/flare-foundation/developer-hub/tree/main/examples

## Prerequisites

- Python 3.8+
- pip

## Installation

```bash
pip install web3 py-solc-x
```

| Package | Purpose |
|---------|---------|
| `web3` | Async/sync library for EVM chain interaction |
| `py-solc-x` | Solidity compiler wrapper for Python |

## RPC Endpoints & Key Addresses

| Network | RPC | Chain ID |
|---------|-----|----------|
| Coston2 Testnet | `https://coston2-api.flare.network/ext/C/rpc` | 114 |
| Flare Mainnet | `https://flare-api.flare.network/ext/C/rpc` | 14 |

**FlareContractRegistry:** `0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019` (same on all networks)

## Examples

### Get Chain ID

```python
from web3 import AsyncWeb3, AsyncHTTPProvider
from web3.middleware import ExtraDataToPOAMiddleware
import asyncio

async def main():
    w3 = AsyncWeb3(AsyncHTTPProvider("https://coston2-api.flare.network/ext/C/rpc"))
    # Inject PoA middleware required for Flare testnets
    w3.middleware_onion.inject(ExtraDataToPOAMiddleware, layer=0)

    chain_id = await w3.eth.chain_id
    print("Chain ID:", chain_id)  # 114
    return chain_id

asyncio.run(main())
```

> **Note:** Inject `ExtraDataToPOAMiddleware` when connecting to Flare testnets (Coston, Coston2) due to PoA consensus.

### Fetch Contract ABI from Explorer

```python
import requests

def fetch_abi(address: str, network: str = "coston2") -> list:
    base_url = f"https://{network}-explorer.flare.network/api"
    params = {
        "module": "contract",
        "action": "getabi",
        "address": address,
    }
    response = requests.get(base_url, params=params)
    return response.json()["result"]

abi = fetch_abi("0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019")
```

### Query a Contract

```python
from web3 import AsyncWeb3, AsyncHTTPProvider
from web3.middleware import ExtraDataToPOAMiddleware
import asyncio
import json

REGISTRY_ADDR = "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019"
RPC_URL = "https://coston2-api.flare.network/ext/C/rpc"

async def main():
    w3 = AsyncWeb3(AsyncHTTPProvider(RPC_URL))
    w3.middleware_onion.inject(ExtraDataToPOAMiddleware, layer=0)

    # Fetch ABI from explorer
    import aiohttp
    async with aiohttp.ClientSession() as session:
        url = "https://coston2-explorer.flare.network/api"
        params = {"module": "contract", "action": "getabi", "address": REGISTRY_ADDR}
        async with session.get(url, params=params) as resp:
            abi = json.loads((await resp.json())["result"])

    registry = w3.eth.contract(
        address=w3.to_checksum_address(REGISTRY_ADDR),
        abi=abi
    )

    wnat_address = await registry.functions.getContractAddressByName("WNat").call()
    print("WNat address:", wnat_address)
    return wnat_address

asyncio.run(main())
```

### Compile a Contract

```python
from solcx import compile_source, install_solc

install_solc("0.8.25")

with open("FtsoV2FeedConsumer.sol") as f:
    source = f.read()

compiled = compile_source(
    source,
    output_values=["abi", "bin"],
    solc_version="0.8.25",
    evm_version="cancun",  # Required for Flare
)

contract_id, contract_interface = compiled.popitem()
abi = contract_interface["abi"]
bytecode = contract_interface["bin"]
```

Compiler version: **0.8.25** (versions >0.8.25 untested). EVM version: **cancun**.

### Deploy a Contract

```python
from web3 import AsyncWeb3, AsyncHTTPProvider
from web3.middleware import ExtraDataToPOAMiddleware
import os, asyncio

RPC_URL = "https://coston2-api.flare.network/ext/C/rpc"

async def deploy(abi, bytecode):
    w3 = AsyncWeb3(AsyncHTTPProvider(RPC_URL))
    w3.middleware_onion.inject(ExtraDataToPOAMiddleware, layer=0)

    account = w3.eth.account.from_key(os.environ["ACCOUNT_PRIVATE_KEY"])
    contract = w3.eth.contract(abi=abi, bytecode=bytecode)

    tx = await contract.constructor().build_transaction({
        "from": account.address,
        "nonce": await w3.eth.get_transaction_count(account.address),
        "gasPrice": await w3.eth.gas_price,
    })
    signed = account.sign_transaction(tx)
    tx_hash = await w3.eth.send_raw_transaction(signed.raw_transaction)
    receipt = await w3.eth.wait_for_transaction_receipt(tx_hash)

    print("Deployed at:", receipt["contractAddress"])
    return receipt["contractAddress"]

asyncio.run(deploy(abi, bytecode))
```

## Key Notes

- Use `AsyncWeb3` with `AsyncHTTPProvider` for async code.
- Always inject `ExtraDataToPOAMiddleware` on Flare testnets.
- Store private keys in environment variables (`ACCOUNT_PRIVATE_KEY`), never in source code.
- Use `w3.to_checksum_address()` when passing addresses to contracts.
- Get testnet C2FLR from the [Coston2 Faucet](https://faucet.flare.network/coston2).
