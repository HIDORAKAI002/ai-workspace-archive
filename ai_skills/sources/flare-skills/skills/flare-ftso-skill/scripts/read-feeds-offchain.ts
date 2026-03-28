/**
 * Read Feeds Offchain — Skill resource script
 *
 * Reads FTSO block-latency feeds offchain using web3.js and RPC.
 * Resolves the FtsoV2 address dynamically via ContractRegistry.
 *
 * Prerequisites: npm install web3 @flarenetwork/flare-periphery-contract-artifacts
 * Usage: npx ts-node scripts/read-feeds-offchain.ts
 *
 * See: https://dev.flare.network/ftso/guides/read-feeds-offchain
 */

import { Web3 } from "web3";
import { interfaceToAbi } from "@flarenetwork/flare-periphery-contract-artifacts";

const RPC_URL = "https://coston2-api.flare.network/ext/C/rpc";

// ContractRegistry address (same on all Flare networks)
const CONTRACT_REGISTRY_ADDRESS = "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";

const FEED_IDS = [
  "0x01464c522f55534400000000000000000000000000", // FLR/USD
  "0x014254432f55534400000000000000000000000000", // BTC/USD
  "0x014554482f55534400000000000000000000000000", // ETH/USD
];

async function main() {
  const w3 = new Web3(RPC_URL);

  // Resolve FtsoV2 address via ContractRegistry
  const registryAbi = [
    {
      type: "function",
      name: "getContractAddressByName",
      inputs: [{ name: "_name", type: "string" }],
      outputs: [{ name: "", type: "address" }],
      stateMutability: "view",
    },
  ];
  const registry = new w3.eth.Contract(registryAbi, CONTRACT_REGISTRY_ADDRESS);
  const ftsoV2Address = await registry.methods
    .getContractAddressByName("FtsoV2")
    .call();
  console.log("Resolved FtsoV2 address:", ftsoV2Address);

  const abi = interfaceToAbi("FtsoV2Interface", "coston2");
  const ftsov2 = new w3.eth.Contract(abi, ftsoV2Address);
  const res = await ftsov2.methods.getFeedsById(FEED_IDS).call();
  // res[0] = values, res[1] = decimals, res[2] = timestamp
  console.log("Feed values:", res[0]);
  console.log("Decimals:", res[1]);
  console.log("Timestamp:", res[2]);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
