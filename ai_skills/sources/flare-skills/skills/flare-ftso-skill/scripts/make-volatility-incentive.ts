/**
 * Make a Volatility Incentive — Skill resource script
 *
 * Offers a volatility incentive to temporarily increase the expected sample size
 * for FTSO block-latency feeds during high volatility periods.
 *
 * Prerequisites:
 *   - npm install web3 @flarenetwork/flare-periphery-contract-artifacts
 *   - Set ACCOUNT_PRIVATE_KEY environment variable with a funded Coston2 wallet
 *   - Get testnet C2FLR from https://faucet.flare.network/coston2
 *
 * Usage: ACCOUNT_PRIVATE_KEY=0x... npx ts-node scripts/make-volatility-incentive.ts
 *
 * See: https://dev.flare.network/ftso/guides/make-volatility-incentive
 */

// THIS IS EXAMPLE CODE. DO NOT USE THIS CODE IN PRODUCTION.
import { Web3 } from "web3";
import { interfaceToAbi } from "@flarenetwork/flare-periphery-contract-artifacts";

// FastUpdatesIncentiveManager address (Flare Testnet Coston2)
// See https://dev.flare.network/ftso/solidity-reference
const INCENTIVE_ADDRESS = "0x58fb598EC6DB6901aA6F26a9A2087E9274128E59";
const RPC_URL = "https://coston2-api.flare.network/ext/C/rpc";

const abi = interfaceToAbi("IFastUpdateIncentiveManager", "coston2");

async function main() {
  const w3 = new Web3(RPC_URL);
  const privateKey = process.env.ACCOUNT_PRIVATE_KEY!.toString();
  const wallet = w3.eth.accounts.wallet.add(privateKey);
  const incentive = new w3.eth.Contract(abi, INCENTIVE_ADDRESS);
  const sampleSizeIncreasePrice = await incentive.methods
    .getCurrentSampleSizeIncreasePrice()
    .call();
  console.log(
    "Sample Size Increase Price: %i, Current Sample Size: %i, Current Precision %i, Current Scale %i",
    sampleSizeIncreasePrice,
    await incentive.methods.getExpectedSampleSize().call(),
    await incentive.methods.getPrecision().call(),
    await incentive.methods.getScale().call(),
  );
  const tx = await incentive.methods
    .offerIncentive({ rangeIncrease: 0, rangeLimit: 0 })
    .send({
      from: wallet[0].address,
      nonce: await w3.eth.getTransactionCount(wallet[0].address),
      gasPrice: await w3.eth.getGasPrice(),
      value: sampleSizeIncreasePrice,
    });
  console.log("Transaction hash:", tx.transactionHash);
  console.log(
    "New Sample Size: %i, New Precision %i, New Scale %i",
    await incentive.methods.getExpectedSampleSize().call(),
    await incentive.methods.getPrecision().call(),
    await incentive.methods.getScale().call(),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
