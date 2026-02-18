# SPL Token Creation/ Minting tokens  



**Liku Token (LKU)**
![alt text](./static/spltoken.jpeg)
A uniform SPL Token deployed on Solana Devnet.

- **Symbol**: LKU
- **Decimals**: 9
- **Network**: Devnet

Explorer: https://explorer.solana.com/tx/2T85bs8xta1GWJ33gLEoJ4EDiVKNkFDniPxCznn7a5BWDaAvDYQgLGSSFgjTfFBn32Qw1UGsEbTvirkJuc9678gz?cluster=devnet

## Overview
Scripts for creating and minting Solana tokens using the Gill SDK.

## Structure

- `Token-creation-metadata/`
  Creates a new SPL Token Mint and its metadata on Devnet.

- `mint-token/`
  Mints tokens to a specific wallet address.

## Token Creation Diagram

```mermaid
graph TD
    A[User] -->|Run Script| B[Generate Mint Keypair]
    B --> C[Build Transaction]
    C -->|1. Create Account| D[Solana Network]
    C -->|2. Init Mint| D
    C -->|3. Create Metadata| D
    D -->|Confirm| E[Output Mint Address]
```

## Minting Process Diagram

```mermaid
graph TD
    A[User] -->|Run Script| B[Load Mint & Owner]
    B --> C[Get ATA Address]
    C -->|1. Create ATA| D[Solana Network]
    C -->|2. Mint To Address| D
    D -->|Confirm| E[Output Transaction Link]
```

## Usage

### 1. Create New Token
```bash
npx tsx Token-creation-metadata/src/index.ts
```

### 2. Mint Tokens
Edit `mint-token/src/mint-token.ts` with your Mint Address and Amount.
```bash
npx tsx mint-token/src/mint-token.ts
```
