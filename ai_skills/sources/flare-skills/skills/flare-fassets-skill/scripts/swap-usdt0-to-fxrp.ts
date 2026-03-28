/**
 * Swap USDT0 to FXRP via Uniswap V3 — Skill resource script
 *
 * Flow: Approve USDT0 → SwapRouter.exactInputSingle(USDT0 → FXRP)
 * Write: sends transactions to approve and swap; requires a funded wallet with USDT0.
 *
 * Swaps USDT0 for FXRP using the SparkDEX Uniswap V3 router on Flare.
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
 * Usage: npx ts-node scripts/swap-usdt0-to-fxrp.ts
 * Or with Hardhat: yarn hardhat run scripts/swap-usdt0-to-fxrp.ts --network coston2
 *
 * See: https://dev.flare.network/fxrp/token-interactions/usdt0-fxrp-swap
 */

import { Contract, JsonRpcProvider, Wallet, parseUnits } from "ethers";

// Same on all Flare networks. Verify at: https://dev.flare.network/network/guides/flare-contracts-registry
const FLARE_CONTRACTS_REGISTRY_ADDRESS = "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";

const REGISTRY_ABI = [
  "function getContractAddressByName(string) view returns (address)",
];

const ASSET_MANAGER_ABI = [
  "function fAsset() view returns (address)",
];

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

const SWAP_ROUTER_ABI = [
  "function exactInputSingle(tuple(address tokenIn, address tokenOut, uint24 fee, address recipient, uint256 deadline, uint256 amountIn, uint256 amountOutMinimum, uint160 sqrtPriceLimitX96) params) payable returns (uint256 amountOut)",
];

// SparkDEX Uniswap V3 router on Flare. See: https://dev.flare.network/fxrp/token-interactions/usdt0-fxrp-swap
const SWAP_ROUTER = "0x8a1E35F5c98C4E85B36B7B253222eE17773b2781";
const USDT0 = "0xe7cd86e13AC4309349F30B3435a9d337750fC82D";
const FEE_TIER = 500; // 0.05%

// Update these amounts as needed (USDT0 has 6 decimals)
const AMOUNT_IN = parseUnits("1.0", 6);    // 1 USDT0
const AMOUNT_OUT_MIN = parseUnits("0.3", 6); // 0.3 FXRP minimum

async function main() {
  const rpcUrl = process.env.FLARE_RPC_URL ?? "https://coston2-api.flare.network/ext/bc/C/rpc";
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY environment variable is required");
  }

  const provider = new JsonRpcProvider(rpcUrl);
  const wallet = new Wallet(privateKey, provider);

  // Get FXRP address from registry
  const registry = new Contract(FLARE_CONTRACTS_REGISTRY_ADDRESS, REGISTRY_ABI, provider);
  const assetManagerAddress = await registry.getContractAddressByName("AssetManagerFXRP");
  const assetManager = new Contract(assetManagerAddress, ASSET_MANAGER_ABI, provider);
  const fxrpAddress = await assetManager.fAsset();

  const usdt0 = new Contract(USDT0, ERC20_ABI, wallet);
  const fxrp = new Contract(fxrpAddress, ERC20_ABI, provider);

  // Check balances
  const usdt0Balance = await usdt0.balanceOf(wallet.address);
  const fxrpBalance = await fxrp.balanceOf(wallet.address);
  console.log("USDT0 balance:", usdt0Balance.toString());
  console.log("FXRP balance:", fxrpBalance.toString());
  console.log("FXRP address:", fxrpAddress);

  if (usdt0Balance < AMOUNT_IN) {
    throw new Error(`Insufficient USDT0 balance. Have: ${usdt0Balance}, need: ${AMOUNT_IN}`);
  }

  // Approve router to spend USDT0
  console.log("Approving SwapRouter to spend USDT0...");
  const approveTx = await usdt0.approve(SWAP_ROUTER, AMOUNT_IN);
  await approveTx.wait();
  console.log("Approval confirmed");

  // Execute swap
  const router = new Contract(SWAP_ROUTER, SWAP_ROUTER_ABI, wallet);
  const deadline = Math.floor(Date.now() / 1000) + 20 * 60; // 20 minutes

  console.log("Swapping", AMOUNT_IN.toString(), "USDT0 for FXRP...");
  const tx = await router.exactInputSingle({
    tokenIn: USDT0,
    tokenOut: fxrpAddress,
    fee: FEE_TIER,
    recipient: wallet.address,
    deadline: deadline,
    amountIn: AMOUNT_IN,
    amountOutMinimum: AMOUNT_OUT_MIN,
    sqrtPriceLimitX96: 0,
  });
  const receipt = await tx.wait();
  console.log("Swap executed. Transaction:", receipt.hash);

  // Check final balances
  const finalFxrp = await fxrp.balanceOf(wallet.address);
  console.log("FXRP received:", (finalFxrp - fxrpBalance).toString());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
