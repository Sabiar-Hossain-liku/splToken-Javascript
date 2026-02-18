# Token Creation Metadata

Scripts to create a new SPL Token (Token-2022) with metadata on Solana Devnet.
![alt text](./static/Token-creation-Sucess.png)

## Files

### `config.ts`

```ts
import { createSolanaClient } from "gill";
import { loadKeypairSignerFromFile } from "gill/node";
```
Imports the tools to connect to Solana and load your wallet.

```ts
export function createClient(cluster = "devnet")
```
Connects to Solana. Pass `"mainnet-beta"` to switch networks.

```ts
export async function loadSigner(path?)
```
Reads your wallet keypair from `~/.config/solana/id.json`. This is the account that pays fees.

```ts
export async function getBlockhash(rpc)
```
Fetches a recent blockhash — required for every transaction to be valid.

---

### `metadata.ts`

```ts
export const TOKEN_METADATA = { name, symbol, uri, ... }
```
Your token's info. Edit `name`, `symbol`, and `uri` here to customise your token.

```ts
export async function buildMetadataInstruction(mint, signer, config)
```
Builds the instruction that attaches metadata to your token on-chain via Metaplex.

---

### `transaction.ts`

```ts
const mint = await generateKeyPairSigner();
```
Creates a new random keypair that will become the token's mint address.

```ts
const tx = await buildCreateTokenTransaction({ ..., tokenProgram: TOKEN_2022_PROGRAM_ADDRESS })
```
Builds the full transaction using the Token-2022 program. Handles account creation, mint initialisation, and metadata in one call.

```ts
export async function signAndSend(sendAndConfirmTransaction, tx)
```
Signs the transaction with your wallet and sends it to the network.

---

### `index.ts`

```ts
const { rpc, sendAndConfirmTransaction } = createClient("devnet");
```
Opens a connection to Devnet.

```ts
const signer = await loadSigner();
const latestBlockhash = await getBlockhash(rpc);
```
Loads your wallet and gets a fresh blockhash.

```ts
const { tx } = await buildMintTransaction({ signer, latestBlockhash, decimals: 9 });
```
Builds the token creation transaction. Change `decimals` if needed (9 = standard).

```ts
const signature = await signAndSend(sendAndConfirmTransaction, tx);
console.log("Explorer:", getExplorerLink(...));
```
Sends the transaction and prints the Solana Explorer link to verify it.

---

## Run

```bash
npx tsx Token-creation-metadata/src/index.ts
```
