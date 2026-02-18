import { getExplorerLink, getSignatureFromTransaction } from "gill";
import { createClient, loadSigner, getBlockhash } from "./config.ts";
import { buildMintToTransaction } from "./transaction.ts";

const { rpc, sendAndConfirmTransaction } = createClient("devnet");
const signer = await loadSigner();
const latestBlockhash = await getBlockhash(rpc);

const signedTx = await buildMintToTransaction({
  signer,
  latestBlockhash,
  mintAddress: "DoLBfXFstshjbYfcfZXLqrRSkGm7sd5CCujrtcVrNBKy",
  ownerAddress: "2iqJnMtECPDXuPdxwW8ToHRQ21JWRxU6VcT7VaPQSVnJ",
  amount: 1_000_000_000,
});

console.log("Explorer:", getExplorerLink({ cluster: "devnet", transaction: getSignatureFromTransaction(signedTx) }));

await sendAndConfirmTransaction(signedTx);