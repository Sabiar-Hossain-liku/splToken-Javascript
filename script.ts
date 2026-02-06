

import { createSolanaClient, createTransaction, signTransactionMessageWithSigners } from "gill";
import {loadKeypairSignerFromFile} from "gill/node";
import { getAddMemoInstruction } from "gill/programs";

const signer = await loadKeypairSignerFromFile()
console.log("signer:", signer.address);


// Create Solana client with devnet connection
const {rpc} = createSolanaClient({
    urlOrMoniker: "https://api.devnet.solana.com"
})

const memoIx = getAddMemoInstruction({
    memo: "life is hard",
});


try {
    console.log("Fetching latest blockhash from devnet...");
    const {value: latestBlockhash} = await rpc.getLatestBlockhash().send()
    console.log("latestBlockhash:", latestBlockhash);

    // Create transaction with the fetched blockhash
    const tx = createTransaction({
        feePayer: signer,
        version: "legacy",
        instructions: [memoIx],
        latestBlockhash
    })
    console.log("Transaction: ", tx);


    const signedTrasaction = await signTransactionMessageWithSigners(tx)
    console.log("signedTransaction:", signedTrasaction)

} catch (error) {
    console.error("Failed to fetch blockhash:", error);
    console.error("\nThis is likely a network connectivity issue.");
    console.error("If you're on WSL, you may need to check your network settings.");
}

