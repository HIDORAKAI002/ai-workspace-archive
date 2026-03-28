/**
 * Get FAssets settings — Skill resource script
 *
 * Flow: FlareContractsRegistry → AssetManagerFXRP → getSettings() + FtsoV2 price
 * Read-only: queries chain via RPC only; no writes or external fetches.
 *
 * Returns lot size in XRP, current XRP/USD price from FTSOv2, and lot value in USD.
 *
 * Run in a project with ethers (e.g. Flare Hardhat Starter Kit or any Node app with ethers).
 * Review this script before running; execute in an isolated environment.
 *
 * Prerequisites: npm install ethers
 * For proper ABI usage and type safety, use the Flare periphery packages:
 *   - Solidity contracts: https://www.npmjs.com/package/@flarenetwork/flare-periphery-contracts
 *   - Artifacts: https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts
 *   - Wagmi types: https://www.npmjs.com/package/@flarenetwork/flare-wagmi-periphery-package
 * Usage: npx ts-node scripts/get-fassets-settings.ts
 * Or with Hardhat: yarn hardhat run scripts/get-fassets-settings.ts --network coston2
 *
 * See: https://dev.flare.network/fassets/developer-guides/fassets-settings-node
 */

import { Contract, JsonRpcProvider } from "ethers";

// Same on all Flare networks. Verify at: https://dev.flare.network/network/guides/flare-contracts-registry
const FLARE_CONTRACTS_REGISTRY_ADDRESS = "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";

const REGISTRY_ABI = [
  "function getContractAddressByName(string) view returns (address)",
];

const ASSET_MANAGER_ABI = [
  "function getSettings() view returns (tuple(uint64 lotSizeAMG, uint8 assetDecimals, address agentOwnerRegistry))",
];

const FTSO_V2_ABI = [
  "function getFeedById(bytes21 _feedId) view returns (uint256 _value, int8 _decimals, uint64 _timestamp)",
];

// XRP/USD feed ID on Flare. See: https://dev.flare.network/ftso/scaling/anchor-feeds
const XRP_USD_FEED_ID = "0x015852502f55534400000000000000000000000000";

async function main() {
  const rpcUrl = process.env.FLARE_RPC_URL ?? "https://coston2-api.flare.network/ext/bc/C/rpc";
  const provider = new JsonRpcProvider(rpcUrl);

  const registry = new Contract(FLARE_CONTRACTS_REGISTRY_ADDRESS, REGISTRY_ABI, provider);

  const assetManagerAddress = await registry.getContractAddressByName("AssetManagerFXRP");
  const assetManager = new Contract(assetManagerAddress, ASSET_MANAGER_ABI, provider);

  const settings = await assetManager.getSettings();
  const lotSizeAMG = Number(settings.lotSizeAMG);
  const assetDecimals = Number(settings.assetDecimals);
  const lotSizeXRP = lotSizeAMG / Math.pow(10, assetDecimals);
  console.log("Lot size (AMG):", lotSizeAMG);
  console.log("Asset decimals:", assetDecimals);
  console.log("Lot size (XRP):", lotSizeXRP);

  // Fetch XRP/USD price from FTSOv2
  const ftsoAddress = await registry.getContractAddressByName("FtsoV2");
  const ftsoV2 = new Contract(ftsoAddress, FTSO_V2_ABI, provider);

  const priceFeed = await ftsoV2.getFeedById(XRP_USD_FEED_ID);
  const xrpUsdPrice = Number(priceFeed._value) / Math.pow(10, -Number(priceFeed._decimals));
  const lotValueUSD = lotSizeXRP * xrpUsdPrice;

  console.log("XRP/USD price:", xrpUsdPrice);
  console.log("Lot value (USD):", lotValueUSD);
  console.log("Price timestamp:", new Date(Number(priceFeed._timestamp) * 1000).toISOString());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
