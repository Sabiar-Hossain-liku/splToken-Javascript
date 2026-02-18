import {
  getCreateMetadataAccountV3Instruction,
  getTokenMetadataAddress,
} from "gill/programs";
import type { KeyPairSigner } from "gill";

// Edit these to customise your token
export const TOKEN_METADATA = {
  name: "Liku token",
  symbol: "LKU",
  uri: "https://ipfs.io/ipfs/bafkreidxkw7gfpoyrpb562n5pf732ftpsrxvs5j4wdazasl2qafeoojmje",
  sellerFeeBasisPoints: 0,
  isMutable: true,
} as const;

export async function buildMetadataInstruction(
  mint: KeyPairSigner,
  signer: KeyPairSigner,
  config: Partial<typeof TOKEN_METADATA> = {}
) {
  const merged = { ...TOKEN_METADATA, ...config };
  const metadata = await getTokenMetadataAddress(mint);

  return getCreateMetadataAccountV3Instruction({
    collectionDetails: null,
    isMutable: merged.isMutable,
    updateAuthority: signer,
    mint: mint.address,
    metadata,
    mintAuthority: signer,
    payer: signer,
    data: {
      sellerFeeBasisPoints: merged.sellerFeeBasisPoints,
      collection: null,
      creators: null,
      uses: null,
      name: merged.name,
      symbol: merged.symbol,
      uri: merged.uri,
    },
  });
}
