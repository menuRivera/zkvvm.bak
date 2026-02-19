# Project Standards: ZK-Compliant Secure Payments

## Core Stack
- **Framework:** Next.js (App Router preferred)
- **Styling:** Tailwind CSS (Modern, minimalist aesthetics)
- **Blockchain Interface:** Viem
- **Wallet Connection:** Reown (AppKit)
- **ZK/EVM:** Integration with evvm.org for zero-knowledge compliant payments

## Technical Constraints
- **Language:** TypeScript only. 
- **Type Management:** Define all TypeScript types and interfaces in dedicated files (e.g., `@/types/` or `*.types.ts`). Do not inline complex types.
- **Syntax:** Strictly avoid the use of semi-colons (;) in all .ts and .tsx files.
- **Compliance Logic:** All payment flows must include hooks for regulatory oversight and government actor compliance as part of the ZK-circuit logic or smart contract interaction.
- **HTML Components** Tag all html components with an Id so that it's easier to identify and point to when doing modifications

## UI/UX Guidelines
- **Aesthetics:** High-end, modern "FinTech" look. 
- **Feedback:** Use subtle transitions and clear loading states for blockchain transactions.
- **Component Structure:** Use functional components with Tailwind utility classes.

## Development Workflow
- Prioritize modularity for ZK-proof generation and verification logic.
- Ensure all Viem client configurations are centralized for easy environment switching.
