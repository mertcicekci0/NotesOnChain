# Deployment Guide

Bu dokümanda Stacks Notes projesinin deployment adımları açıklanmaktadır.

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Clarinet 3.0+
- Git

### Setup Steps

1. **Clone Repository**
```bash
git clone <repository-url>
cd stackss
```

2. **Install Dependencies**
```bash
# Root project (Clarinet)
npm install

# Frontend
cd frontend
npm install
cd ..
```

3. **Start Development Environment**
```bash
# Terminal 1: Start Clarinet console (optional)
clarinet console

# Terminal 2: Start frontend
cd frontend
npm run dev
```

4. **Access Application**
- Frontend: http://localhost:3000
- Clarinet console: Interactive Clarity console

### Development Commands

```bash
# Check smart contracts
clarinet check

# Run tests
npm test

# Build frontend
cd frontend && npm run build

# Lint frontend code
cd frontend && npm run lint
```

## Testnet Deployment

### 1. Smart Contract Deployment

#### Setup Testnet Account
1. Install Stacks CLI:
```bash
npm install -g @stacks/cli
```

2. Generate or import wallet:
```bash
stx make_keychain -t
# Save the generated mnemonic and keys
```

3. Fund account with STX from [Stacks Faucet](https://explorer.stacks.co/sandbox/faucet?chain=testnet)

#### Deploy Contract
1. Update `Clarinet.toml` for testnet:
```toml
[network]
name = "testnet"
```

2. Deploy using Clarinet:
```bash
clarinet deployments generate --mainnet
clarinet deployments apply --mainnet
```

Alternative deployment with Stacks CLI:
```bash
stx deploy_contract notes contracts/notes.clar --testnet --fee 1000
```

#### Update Frontend Configuration
Update `frontend/src/lib/stacks.ts`:
```typescript
// Change from StacksDevnet to StacksTestnet
import { StacksTestnet } from '@stacks/network';
const network = new StacksTestnet();

// Update contract address to your deployed address
const contractAddress = 'YOUR_TESTNET_ADDRESS';
```

### 2. Frontend Deployment Options

#### Option A: Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy Frontend**
```bash
cd frontend
vercel --prod
```

3. **Environment Variables**
Add to Vercel dashboard or `.env.local`:
```env
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
```

#### Option B: Netlify

1. **Build the project**
```bash
cd frontend
npm run build
```

2. **Deploy to Netlify**
- Upload `frontend/out` folder to Netlify
- Or connect GitHub repository for auto-deployment

#### Option C: Traditional Hosting

1. **Build for production**
```bash
cd frontend
npm run build
npm run export  # For static export
```

2. **Upload contents of `out/` folder to your hosting provider**

### 3. DNS & Domain Setup

1. **Configure Custom Domain** (if using Vercel)
```bash
vercel domains add yourdomain.com
```

2. **SSL Certificate**
- Vercel/Netlify: Automatic HTTPS
- Other hosts: Configure Let's Encrypt or similar

## Mainnet Deployment

### Prerequisites
- Real STX tokens for deployment fees
- Thoroughly tested contract on testnet
- Security audit (recommended for production)

### Steps

1. **Final Testing**
```bash
# Run all tests
npm test
clarinet check
cd frontend && npm run build
```

2. **Update Configuration**
```typescript
// In frontend/src/lib/stacks.ts
import { StacksMainnet } from '@stacks/network';
const network = new StacksMainnet();
```

3. **Deploy Contract**
```bash
clarinet deployments generate --mainnet
clarinet deployments apply --mainnet
```

4. **Update Frontend**
- Update contract address in configuration
- Deploy to production hosting

### Security Considerations

1. **Smart Contract**
   - Code review and audit
   - Test thoroughly on testnet
   - Consider formal verification

2. **Frontend**
   - Environment variable security
   - CSP headers
   - Input validation

3. **Infrastructure**
   - HTTPS enforcement
   - Rate limiting
   - Monitoring and logging

## Environment Variables

### Frontend (.env.local)
```env
# Network configuration
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
NEXT_PUBLIC_CONTRACT_NAME=notes

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Monitoring & Maintenance

### 1. Contract Monitoring
- Use [Stacks Explorer](https://explorer.stacks.co/) to monitor transactions
- Set up alerts for contract interactions

### 2. Frontend Monitoring
```bash
# Vercel Analytics
npm install @vercel/analytics

# Add to layout.tsx
import { Analytics } from '@vercel/analytics/react'
```

### 3. Error Tracking
```bash
# Sentry for error tracking
npm install @sentry/nextjs

# Configure in next.config.js
```

## Troubleshooting

### Common Issues

1. **Contract Deployment Failed**
   - Check STX balance
   - Verify contract syntax: `clarinet check`
   - Check network connectivity

2. **Frontend Build Errors**
   - Clear cache: `rm -rf .next`
   - Update dependencies: `npm update`
   - Check TypeScript errors: `npm run type-check`

3. **Wallet Connection Issues**
   - Ensure correct network in Hiro Wallet
   - Clear browser cache
   - Check browser console for errors

### Debug Commands

```bash
# Check contract status
stx balance <address> --testnet

# View transaction details
stx get_transaction <tx-id> --testnet

# Test contract functions
clarinet console
>> (contract-call? .notes add-note "test")
```

## Rollback Procedures

### Contract Issues
- Deploy new version with different name
- Update frontend to use new contract
- Migrate data if necessary

### Frontend Issues
- Revert to previous deployment
- Use Vercel rollback feature
- Restore from backup

## Performance Optimization

### Frontend
```bash
# Analyze bundle size
npm run build
npm run analyze

# Optimize images
npm install next-optimized-images
```

### Caching
- Configure CDN caching headers
- Use Vercel Edge Network
- Implement service worker caching

## Backup & Recovery

### Contract Data
- Implement data export functionality
- Regular backup of important user data
- Document recovery procedures

### Code & Configuration
- GitHub repository backup
- Environment variables backup
- Deployment scripts version control

---

**Support**: For deployment issues, check the troubleshooting section or create an issue in the repository.
