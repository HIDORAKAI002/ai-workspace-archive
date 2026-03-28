/**
 * Get redemption queue — Skill resource script
 *
 * Flow: FlareContractsRegistry → AssetManagerFXRP → getSettings() + redemptionQueue()
 * Read-only: queries chain via RPC only; no writes or external fetches.
 *
 * Fetches the current redemption queue and calculates total value and lots queued.
 *
 * Run in a project with ethers (e.g. Flare Hardhat Starter Kit or any Node app with ethers).
 * Review this script before running; execute in an isolated environment.
 *
 * Prerequisites: npm install ethers
 * For proper ABI usage and type safety, use the Flare periphery packages:
 *   - Solidity contracts: https://www.npmjs.com/package/@flarenetwork/flare-periphery-contracts
 *   - Artifacts: https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts
 *   - Wagmi types: https://www.npmjs.com/package/@flarenetwork/flare-wagmi-periphery-package
 * Usage: npx ts-node scripts/get-redemption-queue.ts
 * Or with Hardhat: yarn hardhat run scripts/get-redemption-queue.ts --network coston2
 *
 * See: https://dev.flare.network/fassets/developer-guides/fassets-redemption-queue
 */

import { Contract, JsonRpcProvider } from "ethers";

// Same on all Flare networks. Verify at: https://dev.flare.network/network/guides/flare-contracts-registry
const FLARE_CONTRACTS_REGISTRY_ADDRESS = "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";

const REGISTRY_ABI = [
  "function getContractAddressByName(string) view returns (address)",
];

const ASSET_MANAGER_ABI = [
  "function getSettings() view returns (tuple(uint64 lotSizeAMG, uint8 assetDecimals, uint256 maxRedeemedTickets))",
  "function redemptionQueue(uint256 _start, uint256 _end) view returns (tuple(uint256 ticketValueUBA)[] _queue, uint256 _totalLength)",
];

async function main() {
  const rpcUrl = process.env.FLARE_RPC_URL ?? "https://coston2-api.flare.network/ext/bc/C/rpc";
  const provider = new JsonRpcProvider(rpcUrl);

  const registry = new Contract(FLARE_CONTRACTS_REGISTRY_ADDRESS, REGISTRY_ABI, provider);
  const assetManagerAddress = await registry.getContractAddressByName("AssetManagerFXRP");
  const assetManager = new Contract(assetManagerAddress, ASSET_MANAGER_ABI, provider);

  const settings = await assetManager.getSettings();
  const maxRedeemedTickets = Number(settings.maxRedeemedTickets);
  const lotSizeAMG = BigInt(settings.lotSizeAMG);
  const assetDecimals = Number(settings.assetDecimals);

  console.log("Max redeemed tickets:", maxRedeemedTickets);
  console.log("Lot size (AMG):", lotSizeAMG.toString());

  const result = await assetManager.redemptionQueue(0, maxRedeemedTickets);
  const queue = result._queue;
  const totalLength = Number(result._totalLength);

  console.log("Tickets in queue:", totalLength);

  // Sum all ticket values
  let totalValueUBA = BigInt(0);
  for (const ticket of queue) {
    totalValueUBA += BigInt(ticket.ticketValueUBA);
  }

  const totalLots = totalValueUBA / lotSizeAMG;
  const totalXRP = Number(totalValueUBA) / Math.pow(10, assetDecimals);

  console.log("Total value in queue (UBA):", totalValueUBA.toString());
  console.log("Total lots in queue:", totalLots.toString());
  console.log("Total XRP in queue:", totalXRP);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
