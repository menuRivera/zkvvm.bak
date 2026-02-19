# zkVVM

## Project Overview

**Event:** ETHDenver 2026 Hackathon
**Type:** Privacy-Infrastructure / EVVM (Ethereum Virtual Virtual Machine)
**Core Concept:** An infrastructure-less, privacy-focused "Digital Cash" protocol running entirely within a smart contract "executor."

## Mission Statement

To decouple privacy execution from consensus by building a **zkVVM** (Zero-Knowledge Virtual Virtual Machine) that treats assets as **Bearer Notes** rather than account balances. zkVVM allows users to deposit funds and transfer them offline via a "Secret Key," enabling the receiver to generate the proof and withdraw anonymously. It bridges the gap between physical cash privacy and regulatory compliance via selective disclosure.

## System Architecture

### 1. The Virtual Chain (EVVM)

- **Nature:** The blockchain state lives inside the storage of a host L1/L2 smart contract.
- **Role:** Acts as the settlement layer and ZK verifier. It maintains the Merkle Root of all active "Notes" (Commitments).

### 2. Zero-Knowledge Flow (The "Bearer Note")

- **Deposit (Minting):** The Depositor generates a `Secret` and `Nullifier` off-chain, hashes them into a `Commitment`, and sends the `Commitment` + Funds to the contract.
- **Transfer (The Handoff):** The Depositor securely sends the `Secret` + `Nullifier` to the Receiver off-chain (e.g., via encrypted chat, QR code). _The blockchain sees nothing._
- **Withdrawal (The Proof):** The Receiver uses the `Secret` to generate a ZK-SNARK proof that:
  1.  Proves they know a secret matching a valid commitment in the Merkle Tree.
  2.  Binds the withdrawal to their specific address (preventing front-running).
  3.  Reveals the `Nullifier` to prevent double-spending.

### 3. The Fisher Network (Relayers)

- **Role:** An infrastructure-less relay layer for gasless withdrawals.
- **Mechanism:** "Fishers" pick up valid withdrawal proofs from the mempool and relay them to the EVVM Executor contract.
- **Incentive:** Fishers pay the gas fees on the host chain and are reimbursed/rewarded via a fee extracted from the withdrawn Note (Gasless UX for the receiver).

### 4. Compliance (The "Key")

- **Mechanism:** Read-only **Viewing Keys** (Optional Metadata).
- **Function:** Depositors can optionally encrypt transaction metadata (Amount, Asset ID) on-chain using a regulator's public key.
- **Result:** Selective disclosure allows third parties to audit the _flow_ of funds (Deposits vs. Withdrawals) without exposing the link between the two to the public network.

## Primary Objectives

1.  **Develop the Circuits:**
    - **Deposit Circuit:** Simple hashing (Commitment generation).
    - **Withdraw Circuit:** Merkle inclusion proof + Nullifier generation + Recipient binding.
2.  **Build the Executor:** Deploy the EVVM contract to manage the Merkle State and verify withdrawal proofs.
3.  **Implement Compliance:** integrate optional encrypted memos for auditing deposit sources.
4.  **UX Demonstration:** Create a "Chequebook" style frontend:
    - "Write a Cheque" (Deposit & Copy Secret).
    - "Cash a Cheque" (Paste Secret & Withdraw).

## Technical Constraints & Standards

- **Proof System:** ZK-SNARKs (Groth16 or Plonk preferred for on-chain verification cost).
- **Hashing:** Poseidon (for circuit efficiency).
- **Host Chain:** EVM-compatible L2 (Arbitrum/Optimism/Base) or L1.
