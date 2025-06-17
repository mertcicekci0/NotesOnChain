# 📝 Stacks Notes

Basit ve güvenli not saklama uygulaması - Stacks blockchain üzerinde inşa edilmiştir.

![Stacks Notes](https://img.shields.io/badge/Built%20with-Stacks-663399)
![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-000000)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC)

## 🌟 Özellikler

- **🔐 Merkezi olmayan depolama**: Notlarınız Stacks blockchain'de güvenle saklanır
- **👛 Hiro Wallet entegrasyonu**: Kolay ve güvenli wallet bağlantısı
- **📱 Responsive tasarım**: Mobil ve masaüstü uyumlu
- **⚡ Hızlı ve basit**: Minimal arayüz, maksimum kullanılabilirlik
- **🎨 Modern UI**: Tailwind CSS ile temiz tasarım
- **🔍 Gerçek zamanlı**: Notlarınızı anında görün ve yönetin

## 🛠️ Teknoloji Stack

### Blockchain
- **Clarinet**: Stacks smart contract geliştirme
- **Clarity**: Smart contract dili
- **Stacks Network**: Decentralized uygulama platformu

### Frontend
- **Next.js 14**: React framework (App Router)
- **TypeScript**: Type-safe geliştirme
- **Tailwind CSS**: Utility-first CSS framework
- **@stacks/connect**: Hiro Wallet entegrasyonu

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 18+
- npm veya yarn
- [Clarinet](https://docs.hiro.so/clarinet) 3.0+
- [Hiro Wallet](https://wallet.hiro.so/) browser extension

### Kurulum

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd stacks-notes
```

2. **Dependencies yükleyin**
```bash
# Root dependencies (Clarinet)
npm install

# Frontend dependencies
cd frontend
npm install
cd ..
```

3. **Development server'ı başlatın**
```bash
# Terminal 1: Frontend
cd frontend && npm run dev

# Terminal 2: Contract testing (opsiyonel)
clarinet console
```

4. **Uygulamayı açın**
- http://localhost:3000 adresine gidin
- Hiro Wallet'ınızı bağlayın
- Not eklemeye başlayın!

## 📖 Kullanım

### 1. Wallet Bağlantısı
- "Connect Hiro Wallet" butonuna tıklayın
- Hiro Wallet extension'da bağlantıyı onaylayın
- Wallet adresiniz görüntülenecektir

### 2. Not Ekleme
- Text area'ya notunuzu yazın (max 200 karakter)
- "Add Note" butonuna tıklayın
- Transaction'ı Hiro Wallet'ta onaylayın
- Notunuz blockchain'e kaydedilecektir

### 3. Notları Görüntüleme
- Bağlı wallet'ınızla ilişkili tüm notlar otomatik olarak listelenir
- "Refresh" butonuyla notları güncelleyebilirsiniz
- Her not için oluşturulma block bilgisi görüntülenir

## 🏗️ Proje Yapısı

```
stackss/
├── contracts/
│   └── notes.clar              # Smart contract
├── tests/
│   └── notes.test.ts           # Contract tests
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── page.tsx        # Ana sayfa
│       │   └── layout.tsx      # Layout
│       ├── components/
│       │   ├── WalletButton.tsx # Wallet bağlantı komponenti
│       │   └── NotesApp.tsx    # Not uygulaması
│       └── lib/
│           └── stacks.ts       # Stacks entegrasyonu
├── SETUP.md                    # Geliştirme adımları
├── DEPLOYMENT.md               # Deployment rehberi
└── README.md                   # Bu dosya
```

## 📋 Smart Contract API

### `add-note`
Not ekleme fonksiyonu
```clarity
(add-note (content (string-ascii 200)))
```
- **Parametre**: `content` - Not içeriği (max 200 karakter)
- **Dönen değer**: `(ok note-id)` veya hata kodu
- **Erişim**: Public

### `get-note`
Belirli bir notu getirme
```clarity
(get-note (user principal) (id uint))
```
- **Parametreler**: 
  - `user` - Not sahibinin adresi
  - `id` - Not ID'si
- **Dönen değer**: `(ok note-data)` veya `ERR-NOT-FOUND`
- **Erişim**: Read-only

## 🧪 Test Etme

### Smart Contract Testleri
```bash
# Contract syntax kontrolü
clarinet check

# Unit testleri çalıştır
npm test

# Test coverage
npm run test:coverage
```

### Frontend Testleri
```bash
cd frontend

# Build kontrolü
npm run build

# Linting
npm run lint

# Type checking
npm run type-check
```

## 🚀 Deployment

### Testnet
1. Contract'ı testnet'e deploy edin
2. Frontend'i Vercel/Netlify'a deploy edin
3. Environment variables'ları güncelleyin

Detaylı deployment rehberi için [DEPLOYMENT.md](./DEPLOYMENT.md) dosyasına bakın.

### Production Checklist
- [ ] Smart contract security audit
- [ ] Comprehensive testing
- [ ] Environment configuration
- [ ] Performance optimization
- [ ] Monitoring setup

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

### Geliştirme Kuralları
- TypeScript kullanın
- ESLint kurallarına uyun
- Test yazın
- Commit mesajlarında conventional commits kullanın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](./LICENSE) dosyasına bakın.

## 🔗 Yararlı Linkler

- [Stacks Documentation](https://docs.stacks.co/)
- [Clarinet Documentation](https://docs.hiro.so/clarinet)
- [Hiro Wallet](https://wallet.hiro.so/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)

## 📞 Destek

- 🐛 **Bug Report**: GitHub Issues
- 💡 **Feature Request**: GitHub Issues  
- 📧 **İletişim**: [E-posta adresi]
- 💬 **Discord**: [Discord sunucu linki]

## 🎯 Roadmap

### v1.1
- [ ] Not kategorileri
- [ ] Arama fonksiyonu
- [ ] Not düzenleme
- [ ] Toplu operasyonlar

### v1.2
- [ ] Not paylaşımı
- [ ] Markdown desteği
- [ ] Dosya ekleri
- [ ] Advanced filtering

### v2.0
- [ ] Multi-user collaboration
- [ ] Encryption options
- [ ] Mobile app
- [ ] API access

---

**⭐ Bu projeyi beğendiyseniz star vermeyi unutmayın!**

Built with ❤️ by [Your Name] using Stacks, Next.js, and TypeScript.
