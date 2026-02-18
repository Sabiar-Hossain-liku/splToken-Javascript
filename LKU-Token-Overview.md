---
tags: [solana, token, web3, typescript]
---

# LKU Token — Project Overview

![[spltoken.jpeg]]

**Liku Token (LKU)** is a custom SPL Token built on Solana using the Token-2022 program. Written in TypeScript with the Gill SDK.

## What it does

- Creates a new token mint with on-chain metadata (name, symbol, URI)
- Mints tokens to any wallet via an Associated Token Account

## Structure

| Folder | Purpose |
|---|---|
| `Token-creation-metadata/src/` | Create mint + attach metadata |
| `mint-token/src/` | Mint tokens to a wallet |

## Token Creation

![[Token-creation-Sucess.png]]

Builds a Token-2022 mint with metadata in a single transaction using `buildCreateTokenTransaction`.

## Minting

![[mint-supply.png]]

Creates an ATA for the owner (if needed) and mints the specified amount using `getMintToInstruction`.

## Stack

- **Network**: Solana Devnet
- **Program**: Token-2022 (`TokenzQd...`)
- **SDK**: [gill](https://www.gillsdk.com)
- **Runtime**: Node.js + tsx

---

**GitHub**: [splToken-Javascript](https://github.com/Sabiar-Hossain-liku/splToken-Javascript)
