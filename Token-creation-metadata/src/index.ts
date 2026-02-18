import { getExplorerLink } from "gill";
import { createClient, loadSigner, getBlockhash } from "./config.ts";
import { buildMintTransaction, signAndSend } from "./transaction.ts";

const { rpc, sendAndConfirmTransaction } = createClient("devnet");
const signer = await loadSigner();
const latestBlockhash = await getBlockhash(rpc);

const { tx } = await buildMintTransaction({
  signer,
  latestBlockhash,
  decimals: 9,
  // metadataConfig: { name: "My Token", symbol: "MTK" }
});

const signature = await signAndSend(sendAndConfirmTransaction, tx);
console.log("Explorer:", getExplorerLink({ cluster: "devnet", transaction: signature }));
