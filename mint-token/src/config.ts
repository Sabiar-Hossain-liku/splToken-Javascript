import { createSolanaClient } from "gill";
import { loadKeypairSignerFromFile } from "gill/node";

export type SolanaClient = ReturnType<typeof createSolanaClient>;

export function createClient(cluster: string = "devnet"): SolanaClient {
  return createSolanaClient({ urlOrMoniker: cluster });
}

export async function loadSigner() {
  const signer = await loadKeypairSignerFromFile();
  console.log("signer:", signer.address);
  return signer;
}

export async function getBlockhash(rpc: SolanaClient["rpc"]) {
  const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
  return latestBlockhash;
}
