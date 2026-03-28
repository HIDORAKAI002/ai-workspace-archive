/**
 * Redeem FAssets — Skill resource script
 *
 * Flow: FlareContractsRegistry → AssetManagerFXRP → approve FXRP → redeem()
 * Write: sends transactions to approve and redeem; requires a funded wallet with FXRP.
 *
 * Redeems FXRP for underlying XRP. The redeemer must hold FXRP tokens and
 * specify their XRP Ledger address where the underlying XRP will be sent.
 *
 * Run in a project with ethers (e.g. Flare Hardhat Starter Kit or any Node app with ethers).
 * Review this script before running; execute in an isolated environment.
 *
 * Prerequisites: npm install ethers
 * For proper ABI usage and type safety, use the Flare periphery packages:
 *   - Solidity contracts: https://www.npmjs.com/package/@flarenetwork/flare-periphery-contracts
 *   - Artifacts: https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts
 *   - Wagmi types: https://www.npmjs.com/package/@flarenetwork/flare-wagmi-periphery-package
 * Environment: FLARE_RPC_URL, PRIVATE_KEY
 * Usage: npx ts-node scripts/redeem-fassets.ts
 * Or with Hardhat: yarn hardhat run scripts/redeem-fassets.ts --network coston2
 *
 * See: https://dev.flare.network/fassets/developer-guides/fassets-redeem
 */

import { Contract, JsonRpcProvider, Wallet } from "ethers";

// Same on all Flare networks. Verify at: https://dev.flare.network/network/guides/flare-contracts-registry
const FLARE_CONTRACTS_REGISTRY_ADDRESS = "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";

const REGISTRY_ABI = [
  "function getContractAddressByName(string) view returns (address)",
];

const ASSET_MANAGER_ABI = [
  "function getSettings() view returns (tuple(uint64 lotSizeAMG, uint8 assetDecimals))",
  "function fAsset() view returns (address)",
  "function redeem(uint256 _lots, string _redeemerUnderlyingAddressString, address payable _executor) returns (uint256)",
];

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
];

// Update these with your values
const LOTS_TO_REDEEM = 1;
const UNDERLYING_ADDRESS = "rSHYuiEvsYsKR8uUHhBTuGP5zjRcGt4nm";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

async function main() {
  const rpcUrl = process.env.FLARE_RPC_URL ?? "https://coston2-api.flare.network/ext/bc/C/rpc";
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY environment variable is required");
  }

  const provider = new JsonRpcProvider(rpcUrl);
  const wallet = new Wallet(privateKey, provider);

  const registry = new Contract(FLARE_CONTRACTS_REGISTRY_ADDRESS, REGISTRY_ABI, provider);
  const assetManagerAddress = await registry.getContractAddressByName("AssetManagerFXRP");
  const assetManager = new Contract(assetManagerAddress, ASSET_MANAGER_ABI, wallet);

  // Get settings
  const settings = await assetManager.getSettings();
  const lotSizeAMG = BigInt(settings.lotSizeAMG);
  const assetDecimals = Number(settings.assetDecimals);
  const amountToRedeem = lotSizeAMG * BigInt(LOTS_TO_REDEEM);

  console.log("Lot size (AMG):", lotSizeAMG.toString());
  console.log("Asset decimals:", assetDecimals);
  console.log("Amount to redeem (UBA):", amountToRedeem.toString());
  console.log("Amount (XRP):", Number(amountToRedeem) / Math.pow(10, assetDecimals));

  // Get FXRP token and check balance
  const fxrpAddress = await assetManager.fAsset();
  const fxrp = new Contract(fxrpAddress, ERC20_ABI, wallet);

  const balance = await fxrp.balanceOf(wallet.address);
  console.log("FXRP balance:", balance.toString());

  if (balance < amountToRedeem) {
    throw new Error(`Insufficient FXRP balance. Have: ${balance}, need: ${amountToRedeem}`);
  }

  if (process.env.DRY_RUN !== "false") {
    console.log("\n[DRY RUN] Transactions would:");
    console.log("  1. approve AssetManager to spend", amountToRedeem.toString(), "FXRP");
    console.log("  2. redeem", LOTS_TO_REDEEM, "lot(s) to", UNDERLYING_ADDRESS);
    console.log("\nSet DRY_RUN=false to execute.");
    return;
  }

  // Approve AssetManager to spend FXRP
  console.log("Approving AssetManager to spend FXRP...");
  const approveTx = await fxrp.approve(assetManagerAddress, amountToRedeem);
  await approveTx.wait();
  console.log("Approval confirmed");

  // Execute redemption
  console.log("Redeeming", LOTS_TO_REDEEM, "lot(s) to", UNDERLYING_ADDRESS);
  const redeemTx = await assetManager.redeem(LOTS_TO_REDEEM, UNDERLYING_ADDRESS, ZERO_ADDRESS);
  const receipt = await redeemTx.wait();
  console.log("Redemption executed. Transaction:", receipt.hash);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
