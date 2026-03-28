# Flare for Rust Developers Guide

How to interact with Flare smart contracts using Rust and the alloy-rs library.

**Source:** [dev.flare.network/network/guides/flare-for-rust-developers](https://dev.flare.network/network/guides/flare-for-rust-developers)
**Examples:** https://github.com/flare-foundation/developer-hub/tree/main/examples

## Prerequisites

- Rust and Cargo (install via [rustup](https://rustup.rs))
- Solidity compiler (`solc`)

### Install Solidity Compiler

**macOS:**
```bash
brew tap ethereum/ethereum && brew install solidity
```

**Ubuntu:**
```bash
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt update && sudo apt install solc
```

## Dependencies

```bash
cargo add alloy eyre tokio \
  --features alloy/full,tokio/rt,tokio/rt-multi-thread,tokio/macros
```

**`Cargo.toml`**
```toml
[dependencies]
alloy = { version = "...", features = ["full"] }
eyre = "..."
tokio = { version = "...", features = ["rt", "rt-multi-thread", "macros"] }
```

## RPC Endpoints & Key Addresses

| Network | RPC | Chain ID |
|---------|-----|----------|
| Coston2 Testnet | `https://coston2-api.flare.network/ext/C/rpc` | 114 |
| Flare Mainnet | `https://flare-api.flare.network/ext/C/rpc` | 14 |

**FlareContractRegistry:** `0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019` (same on all networks)

## Examples

### Get Chain ID

```rust
use alloy::providers::{Provider, ProviderBuilder};
use eyre::Result;

#[tokio::main]
async fn main() -> Result<()> {
    let rpc_url = "https://coston2-api.flare.network/ext/C/rpc".parse()?;
    let provider = ProviderBuilder::new().connect_http(rpc_url);

    let chain_id = provider.get_chain_id().await?;
    println!("Chain ID: {}", chain_id); // 114
    Ok(())
}
```

### Query a Contract

```rust
use alloy::{
    primitives::address,
    providers::ProviderBuilder,
    sol,
};
use eyre::Result;

// Define contract interface using the sol! macro
sol!(
    #[sol(rpc)]
    IFlareContractRegistry,
    "IFlareContractRegistry.json"  // ABI JSON file
);

#[tokio::main]
async fn main() -> Result<()> {
    let registry_address = address!("aD67FE66660Fb8dFE9d6b1b4240d8650e30F6019");
    let rpc_url = "https://coston2-api.flare.network/ext/C/rpc".parse()?;

    let provider = ProviderBuilder::new().connect_http(rpc_url);
    let registry = IFlareContractRegistry::new(registry_address, provider);

    let IFlareContractRegistry::getContractAddressByNameReturn { _0: wnat_address } =
        registry.getContractAddressByName("WNat".to_string()).call().await?;

    println!("WNat address: {}", wnat_address);
    Ok(())
}
```

### Create a New Account

```rust
use alloy::signers::local::LocalSigner;

fn main() {
    let signer = LocalSigner::random();
    println!("Address: {}", signer.address());
    // Store the private key securely — never log it in production
}
```

### Deploy a Contract

```rust
use alloy::{
    network::EthereumWallet,
    providers::ProviderBuilder,
    signers::local::PrivateKeySigner,
    sol,
};
use eyre::Result;
use std::env;

sol!(
    #[sol(rpc)]
    MyContract,
    "MyContract.json"
);

#[tokio::main]
async fn main() -> Result<()> {
    let private_key: PrivateKeySigner = env::var("PRIVATE_KEY")?.parse()?;
    let wallet = EthereumWallet::from(private_key);

    let rpc_url = "https://coston2-api.flare.network/ext/C/rpc".parse()?;
    let provider = ProviderBuilder::new()
        .wallet(wallet)
        .connect_http(rpc_url);

    let contract = MyContract::deploy(&provider).await?;
    println!("Deployed at: {}", contract.address());
    Ok(())
}
```

### Read FTSO Feeds

```rust
use alloy::{primitives::address, providers::ProviderBuilder, sol};
use eyre::Result;

sol!(
    #[sol(rpc)]
    ITestFtsoV2,
    "ITestFtsoV2.json"
);

#[tokio::main]
async fn main() -> Result<()> {
    // Resolve FtsoV2 address via registry first, then:
    let ftso_address = address!("...");  // from ContractRegistry
    let rpc_url = "https://coston2-api.flare.network/ext/C/rpc".parse()?;

    let provider = ProviderBuilder::new().connect_http(rpc_url);
    let ftso = ITestFtsoV2::new(ftso_address, provider);

    let feed_ids: Vec<[u8; 21]> = vec![
        hex::decode("01464c522f55534400000000000000000000000000")
            .unwrap()
            .try_into()
            .unwrap(), // FLR/USD
    ];

    let result = ftso.getFeedsById(feed_ids).call().await?;
    println!("Values: {:?}", result._values);
    println!("Decimals: {:?}", result._decimals);
    Ok(())
}
```

## Key Notes

- Use the `sol!` macro to generate typed bindings from ABI JSON files.
- Store private keys in environment variables, never in source code.
- Get testnet C2FLR from the [Coston2 Faucet](https://faucet.flare.network/coston2).
- For ABI JSON files, fetch them from the Blockscout explorer API or use `@flarenetwork/flare-periphery-contract-artifacts` (npm package) and export as JSON.
