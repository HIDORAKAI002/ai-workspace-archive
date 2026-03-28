/**
 * List available FAssets agents — Skill resource script
 *
 * Flow: FlareContractsRegistry → AssetManagerFXRP → getAvailableAgentsDetailedList()
 * Read-only: queries chain via RPC only; no writes or external fetches.
 *
 * Fetches all available agents in chunks and displays their vault address,
 * free collateral lots, and fee in BIPS.
 *
 * Run in a project with ethers (e.g. Flare Hardhat Starter Kit or any Node app with ethers).
 * Review this script before running; execute in an isolated environment.
 *
 * Prerequisites: npm install ethers
 * For proper ABI usage and type safety, use the Flare periphery packages:
 *   - Solidity contracts: https://www.npmjs.com/package/@flarenetwork/flare-periphery-contracts
 *   - Artifacts: https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts
 *   - Wagmi types: https://www.npmjs.com/package/@flarenetwork/flare-wagmi-periphery-package
 * Usage: npx ts-node scripts/list-agents.ts
 * Or with Hardhat: yarn hardhat run scripts/list-agents.ts --network coston2
 *
 * See: https://dev.flare.network/fassets/developer-guides/fassets-list-agents
 */

import { Contract, JsonRpcProvider } from "ethers";

// Same on all Flare networks. Verify at: https://dev.flare.network/network/guides/flare-contracts-registry
const FLARE_CONTRACTS_REGISTRY_ADDRESS = "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";

const REGISTRY_ABI = [
  "function getContractAddressByName(string) view returns (address)",
];

const ASSET_MANAGER_ABI = [
  "function getAvailableAgentsDetailedList(uint256 _start, uint256 _end) view returns (tuple(address agentVault, uint256 feeBIPS, uint256 freeCollateralLots)[] _agents, uint256 _totalLength)",
];

const CHUNK_SIZE = 10;

async function main() {
  const rpcUrl = process.env.FLARE_RPC_URL ?? "https://coston2-api.flare.network/ext/bc/C/rpc";
  const provider = new JsonRpcProvider(rpcUrl);

  const registry = new Contract(FLARE_CONTRACTS_REGISTRY_ADDRESS, REGISTRY_ABI, provider);
  const assetManagerAddress = await registry.getContractAddressByName("AssetManagerFXRP");
  const assetManager = new Contract(assetManagerAddress, ASSET_MANAGER_ABI, provider);

  // Fetch first chunk to get total count
  const firstChunk = await assetManager.getAvailableAgentsDetailedList(0, CHUNK_SIZE);
  const totalLength = Number(firstChunk._totalLength);
  console.log(`Total available agents: ${totalLength}\n`);

  const allAgents = [...firstChunk._agents];

  // Fetch remaining chunks
  for (let offset = CHUNK_SIZE; offset < totalLength; offset += CHUNK_SIZE) {
    const endIndex = Math.min(offset + CHUNK_SIZE, totalLength);
    const chunk = await assetManager.getAvailableAgentsDetailedList(offset, endIndex);
    allAgents.push(...chunk._agents);
  }

  // Display agents
  for (const agent of allAgents) {
    console.log(`Vault: ${agent.agentVault}`);
    console.log(`  Fee (BIPS): ${agent.feeBIPS}`);
    console.log(`  Free collateral lots: ${agent.freeCollateralLots}`);
    console.log();
  }

  console.log(`Completed listing ${allAgents.length} agents`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
