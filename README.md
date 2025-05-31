# 🅿️ Stellar Parking Meter System
## 🚗 Stellar Park Metre Sistemi

**English** | [Türkçe](#türkçe)

A complete integrated smart parking management system running on Stellar Network. This project offers a transparent and secure parking fee collection system using blockchain technology.

---

## 🌟 Project Features

### 🎯 **Frontend (Next.js)**
- **Modern UI/UX**: Responsive design with React Bootstrap
- **Wallet Integration**: Freighter wallet connection
- **Real-time Tracking**: Parking duration and fee calculation
- **QR Code Payments**: QR code generation with Stellar payment URLs
- **Turkish License Plate Validation**: Turkish vehicle license plate format validation

### ⛓️ **Smart Contract (Soroban)**
- **Operator Management**: Admin-controlled operator registration
- **Vehicle Entry System**: Entry records on blockchain
- **Automatic Fee Calculation**: Minute-based calculation
- **Secure Payments**: Verified payments with XLM
- **Audit Trail**: All transactions recorded on blockchain

## 📁 Project Structure

```
parkingmeter/
├── frontend/                 # Next.js Frontend Application
│   ├── src/
│   │   ├── app/             # Next.js App Router
│   │   ├── components/      # React Components
│   │   ├── types/           # TypeScript Types
│   │   └── utils/           # Stellar SDK Utilities
│   ├── package.json
│   └── next.config.js
├── contracts/               # Soroban Smart Contracts
│   ├── src/                 # Contract Source Code
│   ├── Cargo.toml          # Rust Dependencies
│   └── README.md           # Contract Documentation
└── README.md               # This file
```

## 🚀 Quick Start

### 📋 Requirements
- **Node.js** (v18+)
- **Rust** (latest stable)
- **Soroban CLI**
- **Freighter Wallet** (browser extension)

### 🎨 Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend: http://localhost:3000

### ⛓️ Smart Contract Setup
```bash
# Navigate to contracts directory
cd contracts

# Run tests
cargo test

# Build contract
soroban contract build
```

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React Bootstrap
- **Styling**: Custom CSS + Bootstrap
- **Blockchain**: Stellar SDK
- **QR Codes**: qrcode.js
- **Wallet**: Freighter Integration

### Smart Contract
- **Platform**: Stellar Soroban
- **Language**: Rust
- **Testing**: Soroban Test Framework
- **Storage**: Persistent & Instance Storage

## 💰 Fee System

### Calculation Logic
- **Unit**: Minute-based
- **Rate**: 100 XLM/hour (default)
- **Rounding**: Ceiling (round up)
- **Payment**: XLM or USDC

### Example Calculation
```
Parking Duration: 37 minutes
Hourly Rate: 100 XLM
Calculated Fee: (37 * 100) / 60 = 61.67 XLM
```

## 🚗 Supported License Plate Formats

✅ **Valid Turkish formats:**
- **1 character**: `34 A 1234`
- **2 characters**: `61 AZ 5652`
- **3 characters**: `06 ACK 5678`
- **Range**: Province code (01-81) + Space + Letters (1-3 chars) + Space + Numbers (01-99999)

## 🔐 Security Features

### Frontend Security
- **Wallet Validation**: Freighter wallet verification
- **Input Validation**: License plate format validation
- **LocalStorage**: Secure data storage

### Smart Contract Security
- **Access Control**: Admin and operator permissions
- **Duplicate Prevention**: Multiple entry prevention
- **Payment Validation**: Payment amount verification
- **Audit Trail**: All transactions recorded

## 📱 Usage Scenarios

### 1. **Operator Perspective**
1. Connect Freighter wallet
2. Enter vehicle license plate
3. Create entry record
4. Receive payment via QR code

### 2. **Customer Perspective**
1. Scan QR code
2. Confirm in Stellar wallet
3. Pay with XLM/USDC
4. Exit parking

### 3. **Admin Perspective**
1. Initialize contract
2. Register operators
3. Set fee rates
4. Monitor system status

## 🧪 Test Coverage

### Frontend Tests
- ✅ Wallet connection
- ✅ License plate validation
- ✅ QR code generation
- ✅ Payment processing

### Smart Contract Tests
- ✅ Contract initialization (9/9 tests passed)
- ✅ Operator management
- ✅ Vehicle entry system
- ✅ Fee calculation
- ✅ Payment validation

## 🌐 Network Support

### Testnet (Development)
- **Horizon**: https://horizon-testnet.stellar.org
- **Friendbot**: Get test XLM
- **USDC**: Test USDC token

### Mainnet (Production)
- **Horizon**: https://horizon.stellar.org
- **Real XLM**: Real value
- **USDC**: Circle USDC

## 📊 Feature Comparison

| Feature | Traditional System | Stellar Parking Meter |
|---------|-------------------|----------------------|
| Transparency | ❌ Closed system | ✅ Blockchain records |
| Payment Speed | ⏳ Slow | ⚡ Instant |
| Fees | 💸 High | 💰 Low |
| Security | 🔒 Centralized | 🛡️ Distributed |
| Access | 🌍 Limited | 🌐 Global |

---

## Türkçe

Stellar Network üzerinde çalışan tam entegre akıllı otopark yönetim sistemi. Bu proje, blockchain teknolojisi kullanarak şeffaf ve güvenli park ücret toplama sistemi sunar.

## 🌟 Proje Özellikleri

### 🎯 **Frontend (Next.js)**
- **Modern UI/UX**: React Bootstrap ile responsive tasarım
- **Cüzdan Entegrasyonu**: Freighter wallet bağlantısı
- **Gerçek Zamanlı Takip**: Park süreleri ve ücret hesaplama
- **QR Kod Ödemeleri**: Stellar ödeme URL'leri ile QR kod üretimi
- **Türkçe Plaka Doğrulama**: Türk araç plaka formatı kontrolü

### ⛓️ **Smart Contract (Soroban)**
- **Operatör Yönetimi**: Admin kontrolü ile operatör kaydı
- **Araç Giriş Sistemi**: Blockchain üzerinde giriş kayıtları
- **Otomatik Ücret Hesaplama**: Dakika bazında hesaplama
- **Güvenli Ödeme**: XLM ile doğrulanmış ödemeler
- **Audit Trail**: Tüm işlemler blockchain'de kayıtlı

## 📁 Proje Yapısı

```
parkingmeter/
├── frontend/                 # Next.js Frontend Uygulaması
│   ├── src/
│   │   ├── app/             # Next.js App Router
│   │   ├── components/      # React Bileşenleri
│   │   ├── types/           # TypeScript Tipleri
│   │   └── utils/           # Stellar SDK Utilities
│   ├── package.json
│   └── next.config.js
├── contracts/               # Soroban Smart Contracts
│   ├── src/                 # Kontrat Kaynak Kodu
│   ├── Cargo.toml          # Rust Bağımlılıkları
│   └── README.md           # Kontrat Dokümantasyonu
└── README.md               # Bu dosya
```

## 🚀 Hızlı Başlangıç

### 📋 Gereksinimler
- **Node.js** (v18+)
- **Rust** (latest stable)
- **Soroban CLI**
- **Freighter Wallet** (browser extension)

### 🎨 Frontend Kurulumu
```bash
# Frontend dizinine git
cd frontend

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Frontend: http://localhost:3000

### ⛓️ Smart Contract Kurulumu
```bash
# Kontrat dizinine git
cd contracts

# Testleri çalıştır
cargo test

# Kontratı derle
soroban contract build
```

## 🔧 Teknoloji Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React Bootstrap
- **Styling**: Custom CSS + Bootstrap
- **Blockchain**: Stellar SDK
- **QR Codes**: qrcode.js
- **Wallet**: Freighter Integration

### Smart Contract
- **Platform**: Stellar Soroban
- **Language**: Rust
- **Testing**: Soroban Test Framework
- **Storage**: Persistent & Instance Storage

## 💰 Ücret Sistemi

### Hesaplama Mantığı
- **Birim**: Dakika bazında
- **Ücret**: 100 XLM/saat (varsayılan)
- **Yuvarlama**: Yukarı yuvarlama
- **Ödeme**: XLM veya USDC

### Örnek Hesaplama
```
Park Süresi: 37 dakika
Saatlik Ücret: 100 XLM
Hesaplanan Ücret: (37 * 100) / 60 = 61.67 XLM
```

## 🚗 Desteklenen Plaka Formatları

✅ **Geçerli Türk plaka formatları:**
- **1 karakter**: `34 A 1234`
- **2 karakter**: `61 AZ 5652`
- **3 karakter**: `06 ACK 5678`
- **Aralık**: İl kodu (01-81) + Boşluk + Harfler (1-3 karakter) + Boşluk + Sayılar (01-99999)

## 🔐 Güvenlik Özellikleri

### Frontend Güvenlik
- **Cüzdan Doğrulama**: Freighter wallet kontrolü
- **Input Validation**: Plaka formatı doğrulama
- **LocalStorage**: Güvenli veri saklama

### Smart Contract Güvenlik
- **Access Control**: Admin ve operatör yetkileri
- **Duplicate Prevention**: Çoklu giriş engelleme
- **Payment Validation**: Ödeme tutarı kontrolü
- **Audit Trail**: Tüm işlemler kayıtlı

## 📱 Kullanım Senaryoları

### 1. **Operatör Perspektifi**
1. Freighter cüzdan bağla
2. Araç plakasını gir
3. Giriş kaydı oluştur
4. QR kod ile ödeme al

### 2. **Müşteri Perspektifi**
1. QR kodu tara
2. Stellar cüzdanında onayla
3. XLM/USDC ile öde
4. Çıkış yap

### 3. **Admin Perspektifi**
1. Kontratı başlat
2. Operatörleri kaydet
3. Ücret tarifelerini belirle
4. Sistem durumunu izle

## 🧪 Test Coverage

### Frontend Testleri
- ✅ Cüzdan bağlantısı
- ✅ Plaka doğrulama
- ✅ QR kod üretimi
- ✅ Ödeme işlemleri

### Smart Contract Testleri
- ✅ Kontrat başlatma (9/9 test geçti)
- ✅ Operatör yönetimi
- ✅ Araç giriş sistemi
- ✅ Ücret hesaplama
- ✅ Ödeme doğrulama

## 🌐 Network Desteği

### Testnet (Geliştirme)
- **Horizon**: https://horizon-testnet.stellar.org
- **Friendbot**: Test XLM alma
- **USDC**: Test USDC token

### Mainnet (Üretim)
- **Horizon**: https://horizon.stellar.org
- **Real XLM**: Gerçek değer
- **USDC**: Circle USDC

## 📊 Özellik Karşılaştırması

| Özellik | Geleneksel Sistem | Stellar Park Metre |
|---------|-------------------|-------------------|
| Şeffaflık | ❌ Kapalı sistem | ✅ Blockchain kayıtları |
| Ödeme Hızı | ⏳ Yavaş | ⚡ Anında |
| Komisyon | 💸 Yüksek | 💰 Düşük |
| Güvenlik | 🔒 Merkezi | 🛡️ Dağıtık |
| Erişim | 🌍 Sınırlı | 🌐 Global |

## 🤝 Katkıda Bulunma | Contributing

1. **Fork** yapın | Fork the project
2. **Feature branch** oluşturun | Create a feature branch
3. **Commit** yapın | Commit changes
4. **Pull Request** gönderin | Submit a Pull Request

### Geliştirme Alanları | Development Areas
- [ ] Mobil uygulama | Mobile application
- [ ] Multi-token desteği | Multi-token support
- [ ] Analytics dashboard | Analytics dashboard
- [ ] Notification sistemi | Notification system

## 📄 Lisans | License

Bu proje **MIT** lisansı altında lisanslanmıştır. | This project is licensed under the **MIT** License.

## 🆘 Destek | Support

- **Issues**: GitHub Issues
- **Dokümantasyon | Documentation**: README files
- **Stellar Docs**: https://developers.stellar.org

---

**🚀 Stellar Soroban ile güvenli ve ölçeklenebilir smart contract'lar**  
**🚀 Secure and scalable smart contracts with Stellar Soroban**

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! | If you like this project, don't forget to give it a star!** 