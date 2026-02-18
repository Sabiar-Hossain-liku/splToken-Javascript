import { generateKeyPairSigner, type KeyPairSigner } from "gill";
import {
  buildCreateTokenTransaction,
  TOKEN_2022_PROGRAM_ADDRESS,
} from "gill/programs";
import type { SolanaClient } from "./config.ts";
import { TOKEN_METADATA, type TOKEN_METADATA as TokenMetadataType } from "./metadata.ts";

export interface BuildMintTxParams {
  signer: KeyPairSigner;
  latestBlockhash: Awaited<
    ReturnType<ReturnType<SolanaClient["rpc"]["getLatestBlockhash"]>["send"]>
  >["value"];
  decimals?: number;
  metadataConfig?: Partial<typeof TokenMetadataType>;
}

export async function buildMintTransaction({
  signer,
  latestBlockhash,
  decimals = 9,
  metadataConfig,
}: BuildMintTxParams) {
  const mint = await generateKeyPairSigner();
  console.log("mint:", mint.address);

  const merged = { ...TOKEN_METADATA, ...metadataConfig };

  const tx = await buildCreateTokenTransaction({
    feePayer: signer,
    version: "legacy",
    mint,
    latestBlockhash,
    decimals,
    tokenProgram: TOKEN_2022_PROGRAM_ADDRESS,
    metadata: {
      name: merged.name,
      symbol: merged.symbol,
      uri: merged.uri,
      isMutable: merged.isMutable,
    },
  });

  return { tx, mint };
}

export async function signAndSend(
  sendAndConfirmTransaction: SolanaClient["sendAndConfirmTransaction"],
  tx: Parameters<SolanaClient["sendAndConfirmTransaction"]>[0]
) {
  return sendAndConfirmTransaction(tx);
}
