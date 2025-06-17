# 📝 Stacks Notes - Frontend

Bu Stacks Notes uygulamasının Next.js 14 tabanlı frontend kısmıdır. Hiro Wallet entegrasyonu ile Stacks blockchain üzerinde not saklama işlemlerini gerçekleştirir.

## 🌟 Özellikler

- **🔐 Hiro Wallet Entegrasyonu**: Güvenli wallet bağlantısı
- **📝 Not Yönetimi**: Not ekleme, görüntüleme ve yönetimi
- **📱 Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **⚡ Gerçek Zamanlı**: Blockchain ile anında senkronizasyon
- **🎨 Modern UI**: Tailwind CSS ile temiz tasarım

## 🛠️ Teknoloji Stack

- **Next.js 14** - React framework (App Router)
- **TypeScript** - Type-safe geliştirme
- **Tailwind CSS** - Utility-first CSS framework
- **@stacks/connect** - Hiro Wallet entegrasyonu
- **@stacks/transactions** - Blockchain transaction yönetimi

## 🚀 Geliştirme

### Gereksinimler
- Node.js 18+
- npm veya yarn
- [Hiro Wallet](https://wallet.hiro.so/) browser extension

### Kurulum

```bash
# Dependencies yükle
npm install

# Development server başlat
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

### Komutlar

```bash
# Development server
npm run dev

# Production build
npm run build

# Production server
npm run start

# Linting
npm run lint

# Type checking
npm run type-check
```

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── page.tsx          # Ana sayfa
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global stiller
├── components/
│   ├── WalletButton.tsx  # Wallet bağlantı komponenti
│   └── NotesApp.tsx      # Ana not uygulaması
└── lib/
    └── stacks.ts         # Stacks blockchain entegrasyonu
```

## 🔧 Konfigürasyon

### Environment Variables

`.env.local` dosyası oluşturun:

```env
# Network configuration
NEXT_PUBLIC_NETWORK=devnet
NEXT_PUBLIC_CONTRACT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
NEXT_PUBLIC_CONTRACT_NAME=notes

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Network Ayarları

`src/lib/stacks.ts` dosyasında network konfigürasyonu:

```typescript
// Development
import { StacksDevnet } from '@stacks/network';
const network = new StacksDevnet();

// Testnet
import { StacksTestnet } from '@stacks/network';
const network = new StacksTestnet();

// Mainnet
import { StacksMainnet } from '@stacks/network';
const network = new StacksMainnet();
```

## 🧩 Komponent Rehberi

### WalletButton.tsx
Hiro Wallet bağlantı yönetimi:
- Wallet connection/disconnection
- User address display
- Connection status

### NotesApp.tsx
Ana uygulama komponenti:
- Note ekleme formu
- Note listesi
- Loading states
- Error handling

### lib/stacks.ts
Blockchain entegrasyon fonksiyonları:
- `connectWallet()` - Wallet bağlantısı
- `addNote(content)` - Not ekleme
- `getUserNotes(address)` - Notları getirme
- `isAuthenticated()` - Auth durumu

## 🎨 Styling

Tailwind CSS kullanılarak responsive tasarım:

```tsx
// Ana layout
<div className="min-h-screen bg-gray-50">

// Kart tasarımı
<div className="bg-white rounded-lg shadow-md p-6">

// Button stilleri
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
```

## 🧪 Test

```bash
# Component testleri
npm run test

# E2E testleri
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 📦 Build & Deploy

### Development Build
```bash
npm run build
```

### Vercel Deployment
```bash
# Vercel CLI ile
npm install -g vercel
vercel --prod

# GitHub entegrasyonu ile otomatik deployment
```

### Docker (Opsiyonel)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### Wallet Bağlantı Sorunları
1. Hiro Wallet extension'ın yüklü olduğundan emin olun
2. Doğru network'te olduğunuzu kontrol edin
3. Browser cache'ini temizleyin

### Build Hataları
```bash
# Cache temizle
rm -rf .next
npm run build

# Dependencies güncelle
npm update
```

### TypeScript Hataları
```bash
# Type checking
npm run type-check

# Auto fix
npm run lint -- --fix
```

## 🔗 İlgili Linkler

- **Ana Proje**: [../README.md](../README.md)
- **Smart Contract**: [../contracts/notes.clar](../contracts/notes.clar)
- **Deployment Rehberi**: [../DEPLOYMENT.md](../DEPLOYMENT.md)
- **Geliştirme Adımları**: [../SETUP.md](../SETUP.md)

## 📚 Kaynaklar

- [Next.js Dokümantasyonu](https://nextjs.org/docs)
- [Stacks.js Dokümantasyonu](https://docs.stacks.co/build-apps/stacks.js)
- [Hiro Wallet Dokümantasyonu](https://docs.hiro.so/wallet)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**💡 İpucu**: Geliştirme sırasında React DevTools ve Stacks Explorer'ı kullanarak debugging yapabilirsiniz.
