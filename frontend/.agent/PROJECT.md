# zkVVM

## Project Overview

**Event:** ETHDenver 2026 Hackathon
**Type:** Privacy-Infrastructure / EVVM (Ethereum Virtual Virtual Machine)
**Core Concept:** An infrastructure-less, privacy-focused virtual blockchain running entirely within a smart contract "executor."

## Mission Statement

To decouple privacy execution from consensus by building a **zkVVM** (Zero-Knowledge Virtual Virtual Machine). zkVVM allows users to transact with complete privacy on public ledgers without requiring a dedicated L2 validator set or sequencer network. It bridges the gap between anonymity and regulatory compliance via selective disclosure.

## System Architecture

### 1. The Virtual Chain (EVVM)

- **Nature:** The blockchain state lives inside the storage of a host L1/L2 smart contract.
- **Role:** Acts as the settlement layer and ZK verifier. It maintains the Merkle Root of the private state.

### 2. Zero-Knowledge Flow (The "Shield")

- **Client-Side:** Users generate ZK-SNARK proofs (off-chain) to obscure transaction details:
  - Sender
  - Receiver
  - Amount
- **Output:** A proof and a public commitment are generated; no sensitive data leaves the client.

### 3. The Fisher Network (Relayers)

- **Role:** An infrastructure-less relay layer.
- **Mechanism:** "Fishers" pick up valid proofs from the mempool and relay them to the EVVM Executor contract.
- **Incentive:** Fishers pay the gas fees on the host chain and are reimbursed/rewarded via a fee extracted from the shielded transaction (Gasless UX for the user).

### 4. Compliance (The "Key")

- **Mechanism:** Read-only **Viewing Keys**.
- **Function:** Users can generate and share specific keys with auditors or regulators.
- **Result:** Selective disclosure that allows third parties to decrypt and verify transaction history without exposing it to the public network.

## Primary Objectives

1.  **Develop the Circuit:** Create the ZK circuit (likely Circom/Halo2) for private transfer and state verification.
2.  **Build the Executor:** Deploy the EVVM contract to verify proofs and update the virtual state tree.
3.  **Implement Compliance:** Ensure the viewing key cryptography allows for granular auditing.
4.  **UX Demonstration:** Create a seamless frontend where proof generation happens in the browser via WASM.

## Technical Constraints & Standards

- **Proof System:** ZK-SNARKs (Groth16 or
