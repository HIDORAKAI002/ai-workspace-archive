/**
 * Send XRP payment for FAssets minting — Skill resource script
 *
 * Flow: Connect to XRPL testnet → build Payment with memo → sign and submit
 * Write: sends a real XRP Ledger transaction; requires a funded XRPL wallet.
 *
 * Sends XRP to an FAssets agent's underlying address with the payment reference
 * from the collateral reservation step encoded in the memo field.
 *
 * Review this script before running; execute in an isolated environment.
 * Update the constants (AGENT_ADDRESS, AMOUNT_XRP, PAYMENT_REFERENCE, wallet seed)
 * with values from your collateral reservation.
 *
 * Prerequisites: npm install xrpl
 * For proper ABI usage and type safety in related FAssets scripts, use the Flare periphery packages:
 *   - Solidity contracts: https://www.npmjs.com/package/@flarenetwork/flare-periphery-contracts
 *   - Artifacts: https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts
 *   - Wagmi types: https://www.npmjs.com/package/@flarenetwork/flare-wagmi-periphery-package
 * Usage: npx ts-node scripts/xrp-payment.ts
 *
 * See: https://dev.flare.network/fassets/developer-guides/fassets-mint
 */

import { Client, Wallet, xrpToDrops } from "xrpl";
import type { Payment, TxResponse } from "xrpl";

// Update these with values from the collateral reservation step
const AGENT_ADDRESS = "r4KgCNzn9ZuNjpf17DEHZnyyiqpuj599Wm";
const AMOUNT_XRP = "10.025";
const PAYMENT_REFERENCE =
  "4642505266410001000000000000000000000000000000000000000000f655fb";

async function main() {
  const client = new Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  // Replace with your actual wallet seed
  const wallet: Wallet = Wallet.fromSeed("PUT_SEED_HERE");

  const paymentTx: Payment = {
    TransactionType: "Payment",
    Account: wallet.classicAddress,
    Destination: AGENT_ADDRESS,
    Amount: xrpToDrops(AMOUNT_XRP),
    Memos: [
      {
        Memo: {
          MemoData: PAYMENT_REFERENCE,
        },
      },
    ],
  };

  console.log("Submitting payment:", paymentTx);

  const prepared = await client.autofill(paymentTx);
  const signed = wallet.sign(prepared);
  const result: TxResponse = await client.submitAndWait(signed.tx_blob);

  console.log("Transaction hash:", signed.hash);
  console.log("Explorer: https://testnet.xrpl.org/transactions/" + signed.hash);
  console.log("Result:", result);

  await client.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
