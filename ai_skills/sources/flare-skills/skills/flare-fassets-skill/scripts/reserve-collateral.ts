/**
 * Reserve collateral for minting FAssets — Skill resource script
 *
 * Flow: FlareContractsRegistry → AssetManagerFXRP → find best agent → reserveCollateral()
 * Write: sends a transaction to reserve collateral; requires a funded wallet.
 *
 * Finds the agent with the lowest fee that has enough free collateral lots,
 * then reserves collateral for minting. After success, the script prints
 * the XRP amount and payment reference needed for the next step (XRP payment).
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
 * Usage: npx ts-node scripts/reserve-collateral.ts
 * Or with Hardhat: yarn hardhat run scripts/reserve-collateral.ts --network coston2
 *
 * See: https://dev.flare.network/fassets/developer-guides/fassets-mint
 */

import { Contract, JsonRpcProvider, Wallet } from "ethers";

// Same on all Flare networks. Verify at: https://dev.flare.network/network/guides/flare-contracts-registry
const FLARE_CONTRACTS_REGISTRY_ADDRESS = "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";

const REGISTRY_ABI = [
  "function getContractAddressByName(string) view returns (address)",
];

const ASSET_MANAGER_ABI = [
  "function getAvailableAgentsDetailedList(uint256 _start, uint256 _end) view returns (tuple(address agentVault, uint256 feeBIPS, uint256 freeCollateralLots)[] _agents, uint256 _totalLength)",
  "function getAgentInfo(address _agentVault) view returns (tuple(uint8 status, uint256 feeBIPS))",
  "function collateralReservationFee(uint256 _lots) view returns (uint256)",
  "function reserveCollateral(address _agentVault, uint256 _lots, uint256 _maxMintingFeeBIPS, address _executor) payable returns (uint256)",
  "function assetMintingDecimals() view returns (uint256)",
];

const LOTS_TO_MINT = 1;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

async function findBestAgent(
  assetManager: Contract,
  minAvailableLots: number,
): Promise<string | undefined> {
  const result = await assetManager.getAvailableAgentsDetailedList(0, 100);
  let agents = result._agents.filter(
    (a: { freeCollateralLots: bigint }) => Number(a.freeCollateralLots) > minAvailableLots,
  );

  if (agents.length === 0) return undefined;

  // Sort by fee (lowest first)
  agents.sort((a: { feeBIPS: bigint }, b: { feeBIPS: bigint }) => Number(a.feeBIPS) - Number(b.feeBIPS));

  // Find an agent with status 0 (healthy)
  for (const agent of agents) {
    const info = await assetManager.getAgentInfo(agent.agentVault);
    if (Number(info.status) === 0) {
      return agent.agentVault;
    }
  }
  return undefined;
}

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

  const agentVault = await findBestAgent(assetManager, LOTS_TO_MINT);
  if (!agentVault) {
    throw new Error("No suitable agent found with enough free collateral lots");
  }
  console.log("Selected agent vault:", agentVault);

  const agentInfo = await assetManager.getAgentInfo(agentVault);
  console.log("Agent fee (BIPS):", agentInfo.feeBIPS.toString());

  const fee = await assetManager.collateralReservationFee(LOTS_TO_MINT);
  console.log("Collateral reservation fee:", fee.toString());

  if (process.env.DRY_RUN !== "false") {
    console.log("\n[DRY RUN] Transaction would call reserveCollateral with:");
    console.log("  agentVault:", agentVault);
    console.log("  lots:", LOTS_TO_MINT);
    console.log("  feeBIPS:", agentInfo.feeBIPS.toString());
    console.log("  value (fee):", fee.toString());
    console.log("\nSet DRY_RUN=false to execute.");
    return;
  }

  const tx = await assetManager.reserveCollateral(
    agentVault,
    LOTS_TO_MINT,
    agentInfo.feeBIPS,
    ZERO_ADDRESS,
    { value: fee },
  );
  const receipt = await tx.wait();
  console.log("Collateral reserved. Transaction:", receipt.hash);

  const decimals = await assetManager.assetMintingDecimals();
  console.log("Asset minting decimals:", decimals.toString());
  console.log("\nNext step: send XRP payment to the agent's underlying address.");
  console.log("See: https://dev.flare.network/fassets/developer-guides/fassets-mint");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
