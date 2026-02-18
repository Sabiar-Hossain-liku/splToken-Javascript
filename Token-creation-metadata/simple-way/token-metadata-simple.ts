/**
 * Token Mint Creation Script (SPL Token Program)
 * Creates a new SPL token mint on Solana devnet
 * Uses the "gill" SDK to build, sign, and send the transaction.
 */

import { createSolanaClient, generateKeyPairSigner, getExplorerLink, } from "gill";
import { loadKeypairSignerFromFile } from "gill/node";
import { buildCreateTokenTransaction, getMintSize, getTokenMetadataAddress, TOKEN_2022_PROGRAM_ADDRESS} from "gill/programs";

/** Connect to Solana devnet */
const {rpc, sendAndConfirmTransaction} = createSolanaClient({
    urlOrMoniker: "devnet"
})

/** Load the local keypair (~/.config/solana/id.json) as the fee payer & authority */
const signer = await loadKeypairSignerFromFile()
console.log("signer", signer.address);

/** Fetch a recent blockhash for transaction lifetime */
const {value:latestBlockhash} = await rpc.getLatestBlockhash().send()

/** Generate a fresh keypair for the new mint account */
const mint = await generateKeyPairSigner();
console.log("mint",mint.address);




const tx2 = await buildCreateTokenTransaction({
    feePayer: signer,
    version: "legacy",
    metadata: {
      isMutable: true,
      name: "Liku token",
      symbol:"LKU",
      uri:"https://ipfs.io/ipfs/bafkreidxkw7gfpoyrpb562n5pf732ftpsrxvs5j4wdazasl2qafeoojmje"
    },
    mint,
    latestBlockhash,
    tokenProgram: TOKEN_2022_PROGRAM_ADDRESS
})


/** Calculate the on-chain space needed for a Mint account */
const space = getMintSize()

const metadata = await getTokenMetadataAddress(mint)


/** Sign and send the transaction, then wait for confirmation */
const signature = await sendAndConfirmTransaction(tx2)

/** Log the Solana Explorer link for the confirmed transaction */
console.log("Explorer: ",getExplorerLink({
    cluster: "devnet",
    transaction: signature
}))