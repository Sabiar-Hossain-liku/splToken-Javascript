# Mint Token

Scripts to mint existing Token-2022 tokens to a wallet address.

![alt text](./static/mint-supply.png)

## Files

### `config.ts`

```ts
export function createClient(cluster = "devnet")
```
Connects to Solana. Change `"devnet"` to `"mainnet-beta"` when going live.

```ts
export async function loadSigner()
```
Loads your wallet from `~/.config/solana/id.json`. This wallet pays fees and signs the transaction.

```ts
export async function getBlockhash(rpc)
```
Gets a recent blockhash — every transaction needs one to be accepted by the network.

---

### `transaction.ts`

```ts
const mint = address(mintAddress);
const owner = address(ownerAddress);
```
Converts the mint and owner strings into Solana address types.

```ts
const ata = await getAssociatedTokenAccountAddress(mint, owner, TOKEN_2022_PROGRAM_ADDRESS);
```
Derives the Associated Token Account (ATA) address — the specific account that holds tokens for this owner.

```ts
getCreateAssociatedTokenIdempotentInstruction({ mint, owner, payer, tokenProgram, ata })
```
Creates the ATA if it doesn't exist yet. Safe to run even if it already exists (idempotent).

```ts
getMintToInstruction({ mint, mintAuthority, token, amount }, { programAddress })
```
Mints `amount` tokens into the ATA. `mintAuthority` must be the wallet that created the mint.

```ts
return signTransactionMessageWithSigners(tx);
```
Signs the transaction with your wallet before sending.

---

### `mint-token.ts`

```ts
const { rpc, sendAndConfirmTransaction } = createClient("devnet");
const signer = await loadSigner();
const latestBlockhash = await getBlockhash(rpc);
```
Sets up the connection, loads your wallet, and fetches a blockhash.

```ts
mintAddress: "DoLBfXFstshjbYfcfZXLqrRSkGm7sd5CCujrtcVrNBKy",
ownerAddress: "2iqJnMtECPDXuPdxwW8ToHRQ21JWRxU6VcT7VaPQSVnJ",
amount: 1_000_000_000,
```
Change `mintAddress` to your token's mint. `amount` is in the smallest unit — `1_000_000_000` = 1 token with 9 decimals.

```ts
console.log("Explorer:", getExplorerLink(...));
await sendAndConfirmTransaction(signedTx);
```
Prints the transaction link, then sends and waits for confirmation.

---

## Run

```bash
npx tsx mint-token/src/mint-token.ts
```
