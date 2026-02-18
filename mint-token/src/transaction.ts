import {
  address,
  createTransaction,
  signTransactionMessageWithSigners,
  type KeyPairSigner,
} from "gill";
import {
  getAssociatedTokenAccountAddress,
  getCreateAssociatedTokenIdempotentInstruction,
  getMintToInstruction,
  TOKEN_2022_PROGRAM_ADDRESS,
} from "gill/programs";
import type { SolanaClient } from "./config.ts";

export async function buildMintToTransaction({
  signer,
  latestBlockhash,
  mintAddress,
  ownerAddress,
  amount,
}: {
  signer: KeyPairSigner;
  latestBlockhash: Awaited<
    ReturnType<ReturnType<SolanaClient["rpc"]["getLatestBlockhash"]>["send"]>
  >["value"];
  mintAddress: string;
  ownerAddress: string;
  amount: bigint | number;
}) {
  const mint = address(mintAddress);
  const owner = address(ownerAddress);

  const ata = await getAssociatedTokenAccountAddress(mint, owner, TOKEN_2022_PROGRAM_ADDRESS);

  const tx = createTransaction({
    feePayer: signer,
    version: "legacy",
    instructions: [
      getCreateAssociatedTokenIdempotentInstruction({
        mint,
        owner,
        payer: signer,
        tokenProgram: TOKEN_2022_PROGRAM_ADDRESS,
        ata,
      }),
      getMintToInstruction(
        { mint, mintAuthority: signer, token: ata, amount },
        { programAddress: TOKEN_2022_PROGRAM_ADDRESS }
      ),
    ],
    latestBlockhash,
  });

  return signTransactionMessageWithSigners(tx);
}
