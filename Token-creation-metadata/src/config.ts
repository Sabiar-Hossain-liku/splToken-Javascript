import { createSolanaClient } from "gill";
import { loadKeypairSignerFromFile } from "gill/node";

export type SolanaClient = ReturnType<typeof createSolanaClient>;

// RPC client for a given cluster (default: devnet)
export function createClient(cluster: string = "devnet"): SolanaClient {
  return createSolanaClient({ urlOrMoniker: cluster });
}

// Load keypair from ~/.config/solana/id.json
export async function loadSigner(path?: string) {
  const signer = await loadKeypairSignerFromFile(path);
  console.log("signer:", signer.address);
  return signer;
}

// Fetch the latest blockhash
export async function getBlockhash(rpc: SolanaClient["rpc"]) {
  const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
  return latestBlockhash;
}
