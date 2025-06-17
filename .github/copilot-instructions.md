<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Stacks Notes Project - Copilot Instructions

This is a Stacks blockchain note-keeping application with the following architecture:

## Project Structure
- **Smart Contracts**: Clarity contracts in `/contracts/` directory
- **Frontend**: Next.js 14 app in `/frontend/` directory  
- **Tests**: Contract tests in `/tests/` directory

## Key Technologies
- **Blockchain**: Stacks/Clarity for smart contracts
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Wallet**: Hiro Wallet integration via @stacks/connect
- **Testing**: Vitest for contract testing
- **Development**: Clarinet for Stacks development

## Code Style Guidelines

### Clarity (Smart Contracts)
- Use kebab-case for function names: `add-note`, `get-user-notes`
- Include comprehensive error handling with descriptive error codes
- Add detailed comments explaining contract logic
- Use `define-read-only` for query functions
- Use `define-public` for state-changing functions

### TypeScript/React
- Use functional components with hooks
- Implement proper TypeScript types for all functions and data
- Use 'use client' directive for client components
- Follow Next.js 14 App Router conventions
- Use Tailwind CSS for styling with consistent design patterns

### Stacks Integration
- Use @stacks/connect for wallet integration
- Use @stacks/transactions for contract calls
- Implement proper error handling for blockchain operations
- Use StacksDevnet for development, prepare for testnet/mainnet

## Key Functions to Remember

### Smart Contract (contracts/notes.clar)
```clarity
(define-public (add-note (content (string-ascii 200))))
(define-read-only (get-note (user principal) (id uint)))
```

### Frontend Integration (lib/stacks.ts)
```typescript
connectWallet() // Hiro Wallet connection
addNote(content: string) // Add note to blockchain
getUserNotes(userPrincipal: string) // Fetch user's notes
```

## Common Patterns
- Always validate input length (200 char limit for notes)
- Handle loading states in UI components
- Implement proper error messaging for users
- Use responsive design patterns with Tailwind
- Follow security best practices for wallet integration

## Testing Approach
- Write unit tests for all contract functions
- Use Clarity value constructors (Cl.stringAscii, Cl.uint, etc.)
- Test both success and error scenarios
- Validate contract state changes

When working on this project:
1. Maintain consistency with existing code patterns
2. Follow Stacks/Clarity best practices
3. Ensure responsive design with Tailwind
4. Implement proper error handling
5. Write clear, documented code
6. Test thoroughly before deployment
