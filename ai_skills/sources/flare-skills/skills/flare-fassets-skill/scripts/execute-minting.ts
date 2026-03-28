/**
 * Execute FAssets minting — Skill resource script
 *
 * Flow: Prepare FDC attestation → get Merkle proof → AssetManagerFXRP.executeMinting()
 * Write: sends a transaction to execute minting; requires a funded wallet and FDC proof.
 *
 * After reserving collateral and sending XRP payment, this script obtains
 * a payment proof from the FDC data-availability layer and executes
 * the minting on the AssetManager.
 *
 * Run in a project with ethers (e.g. Flare Hardhat Starter Kit or any Node app with ethers).
 * Review this script before running; execute in an isolated environment.
 *
 * Prerequisites: npm install ethers
 * For proper ABI usage and type safety, use the Flare periphery packages:
 *   - Solidity contracts: https://www.npmjs.com/package/@flarenetwork/flare-periphery-contracts
 *   - Artifacts: https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts
 *   - Wagmi types: https://www.npmjs.com/package/@flarenetwork/flare-wagmi-periphery-package
 * Environment: FLARE_RPC_URL, PRIVATE_KEY, COSTON2_DA_LAYER_URL, VERIFIER_URL_TESTNET, VERIFIER_API_KEY_TESTNET
 * Usage: npx ts-node scripts/execute-minting.ts
 * Or with Hardhat: yarn hardhat run scripts/execute-minting.ts --network coston2
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
  "function executeMinting(tuple(bytes32[] merkleProof, bytes data) _proof, uint256 _collateralReservationId) returns (uint256)",
];

// Update these with values from your collateral reservation and FDC round
const COLLATERAL_RESERVATION_ID = 10255417;
const TARGET_ROUND_ID = 1053806;
const TRANSACTION_ID = "EC0FC5F40FBE6AEAD31138898C71687B2902E462FD1BFEF3FB443BE5E2C018F9";

const { COSTON2_DA_LAYER_URL, VERIFIER_URL_TESTNET, VERIFIER_API_KEY_TESTNET } =
  process.env;

async function prepareAttestationRequest(transactionId: string) {
  const url = `${VERIFIER_URL_TESTNET}verifier/xrp/Payment/prepareRequest`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": VERIFIER_API_KEY_TESTNET ?? "",
    },
    body: JSON.stringify({
      attestationType: "0x5061796d656e7400000000000000000000000000000000000000000000000000",
      sourceId: "0x7465737458525000000000000000000000000000000000000000000000000000",
      requestBody: {
        transactionId: transactionId,
        inUtxo: "0",
        utxo: "0",
      },
    }),
  });
  return await response.json();
}

async function getProof(roundId: number) {
  const request = await prepareAttestationRequest(TRANSACTION_ID);
  const response = await fetch(
    `${COSTON2_DA_LAYER_URL}api/v0/fdc/get-proof-round-id-bytes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": VERIFIER_API_KEY_TESTNET ?? "",
      },
      body: JSON.stringify({
        votingRoundId: roundId,
        requestBytes: request.abiEncodedRequest,
      }),
    },
  );
  return await response.json();
}

async function main() {
  if (!COSTON2_DA_LAYER_URL || !VERIFIER_URL_TESTNET || !VERIFIER_API_KEY_TESTNET) {
    throw new Error(
      "Required environment variables: COSTON2_DA_LAYER_URL, VERIFIER_URL_TESTNET, VERIFIER_API_KEY_TESTNET",
    );
  }

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

  console.log("Fetching FDC proof for round:", TARGET_ROUND_ID);
  const proof = await getProof(TARGET_ROUND_ID);

  console.log("Executing minting with collateral reservation ID:", COLLATERAL_RESERVATION_ID);

  if (process.env.DRY_RUN !== "false") {
    console.log("\n[DRY RUN] Transaction would call executeMinting with:");
    console.log("  collateralReservationId:", COLLATERAL_RESERVATION_ID);
    console.log("  roundId:", TARGET_ROUND_ID);
    console.log("  transactionId:", TRANSACTION_ID);
    console.log("\nSet DRY_RUN=false to execute.");
    return;
  }

  const tx = await assetManager.executeMinting(
    {
      merkleProof: proof.proof,
      data: proof.response,
    },
    COLLATERAL_RESERVATION_ID,
  );
  const receipt = await tx.wait();
  console.log("Minting executed. Transaction:", receipt.hash);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
