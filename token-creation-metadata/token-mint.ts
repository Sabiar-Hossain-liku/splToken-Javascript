import { createSolanaClient, createTransaction } from "gill";
import { loadKeypairSignerFromFile } from "gill/node";


const {rpc, sendAndConfirmTransaction} = createSolanaClient({
    urlOrMoniker: "devnet"
})

const signer = await loadKeypairSignerFromFile()
console.log("signer", signer.address);

const {value:latestBlockhash} = await rpc.getLatestBlockhash().send()

const tx = createTransaction({
    feePayer: signer,
    version: "legacy",
    instructions:[],
    latestBlockhash
})