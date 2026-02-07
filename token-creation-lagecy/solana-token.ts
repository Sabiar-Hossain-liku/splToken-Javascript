import { createSolanaClient, createTransaction, getExplorerLink, type SolanaClusterMoniker } from "gill";
import {loadKeypairSignerFromFile} from "gill/node";
import { getAddMemoInstruction } from "gill/programs";

// For Debuging
global.__GILL_DEBUG_LEVEL__ ="debug";


const signer = await loadKeypairSignerFromFile()
console.log("signer:", signer.address);

const cluster: SolanaClusterMoniker = "devnet";

// Create Solana client with devnet connection
const {rpc, sendAndConfirmTransaction} = createSolanaClient({
    urlOrMoniker: cluster
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


    // Send and confirm the transaction to the network
    console.log("Sending transaction to devnet...");
    const signature = await sendAndConfirmTransaction(tx);
    console.log("Transaction confirmed!");
    console.log("Signature:", signature);

    console.log("\nExplorer link:");
    console.log(getExplorerLink({
        cluster,
        transaction: signature
    }))
    



} catch (error) {
    console.error("Failed to fetch blockhash:", error);
    console.error("\nThis is likely a network connectivity issue.");
    console.error("If you're on WSL, you may need to check your network settings.");
}

