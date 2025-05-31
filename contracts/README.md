# 🅿️ Stellar Parking Meter Smart Contract System
## 📄 Stellar Park Metre Akıllı Kontrat Sistemi

**English** | [Türkçe](#türkçe)

A blockchain-based smart parking meter system built on Stellar Soroban platform. This system enables secure, transparent, and automated parking fee collection using XLM cryptocurrency.

---

## 🚀 Features

### 📋 Core Functionality
- **Operator Management**: Admin-controlled operator registration and management
- **Vehicle Entry Logging**: License plate-based parking entry records
- **Automatic Fee Calculation**: Minute-based parking fee calculation
- **Payment Processing**: XLM payment handling and validation
- **Security**: Authorization and validation controls
- **Multi-format License Plates**: Support for Turkish license plate formats

### 🔧 Smart Contract Functions

#### Admin Functions
- `initialize(admin: Address)` - Initialize the contract
- `register_operator(operator, name, hourly_rate)` - Register new operator
- `set_operator_status(operator, is_active)` - Change operator status
- `update_admin(new_admin)` - Update admin address

#### Operator Functions
- `create_entry(operator, license_plate)` - Create vehicle entry record
- `calculate_fee(license_plate)` - Calculate parking fee
- `complete_payment(license_plate, payment_amount)` - Complete payment transaction

#### Query Functions
- `get_entry(license_plate)` - Get vehicle entry information
- `get_operator(operator_address)` - Get operator information
- `get_total_entries()` - Return total number of entries

## 🛠️ Installation and Build

### Requirements
- Rust (latest stable)
- Soroban CLI
- Stellar CLI

### Build
```bash
cd contracts
soroban contract build
```

### Run Tests
```bash
cargo test
```

## 🚀 Deployment

### 1. Deploy to Testnet
```bash
# Deploy the contract
soroban contract deploy \
  --wasm target/wasm32v1-none/release/hello_world.wasm \
  --source alice \
  --network testnet

# Save contract ID
export CONTRACT_ID="CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

### 2. Initialize Contract
```bash
# Initialize as admin
soroban contract invoke \
  --id $CONTRACT_ID \
  --source alice \
  --network testnet \
  -- initialize \
  --admin GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 3. Register Operator
```bash
# Register new operator (100 XLM/hour = 1000000000 stroops/hour)
soroban contract invoke \
  --id $CONTRACT_ID \
  --source alice \
  --network testnet \
  -- register_operator \
  --operator GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
  --name "Parking A" \
  --hourly_rate 1000000000
```

## 📖 Usage Examples

### Vehicle Entry
```bash
soroban contract invoke \
  --id $CONTRACT_ID \
  --source operator \
  --network testnet \
  -- create_entry \
  --operator GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
  --license_plate "34A1234"
```

### Fee Calculation
```bash
soroban contract invoke \
  --id $CONTRACT_ID \
  --network testnet \
  -- calculate_fee \
  --license_plate "34A1234"
```

### Payment Completion
```bash
soroban contract invoke \
  --id $CONTRACT_ID \
  --source customer \
  --network testnet \
  -- complete_payment \
  --license_plate "34A1234" \
  --payment_amount 1666667  # Calculated fee
```

## 🔍 Data Structures

### ParkingEntry
```rust
pub struct ParkingEntry {
    pub license_plate: String,      // Vehicle license plate
    pub entry_time: u64,           // Entry timestamp
    pub exit_time: Option<u64>,    // Exit timestamp
    pub operator_address: Address, // Operator address
    pub is_paid: bool,             // Payment status
    pub payment_amount: Option<i128>, // Paid amount
}
```

### ParkingOperator
```rust
pub struct ParkingOperator {
    pub address: Address,    // Operator address
    pub name: String,        // Operator name
    pub hourly_rate: i128,   // Hourly rate (stroops)
    pub is_active: bool,     // Active status
}
```

## 💰 Fee Calculation

- **Unit**: Minute-based calculation
- **Rounding**: Ceiling (round up)
- **Formula**: `(minutes * hourly_rate) / 60`

Example:
- Hourly rate: 100 XLM (1,000,000,000 stroops)
- Parking duration: 37 minutes
- Calculated fee: `(37 * 1,000,000,000) / 60 = 616,666,667 stroops ≈ 61.67 XLM`

## 🚗 Supported License Plate Formats

✅ **Valid Turkish formats:**
- **1 character**: `34 A 1234`
- **2 characters**: `61 AZ 5652`
- **3 characters**: `06 ACK 5678`
- **Range**: Province code (01-81) + Space + Letters (1-3 chars) + Space + Numbers (01-99999)

## 🔒 Security

- **Authorization**: `require_auth()` control for critical operations
- **Duplicate Check**: Prevent multiple entries with same license plate
- **Payment Validation**: Insufficient payment control
- **Admin Controls**: Only admin can manage operators

## 🧪 Test Coverage

- ✅ Contract initialization
- ✅ Operator registration and management
- ✅ Vehicle entry logging
- ✅ Fee calculation
- ✅ Payment processing
- ✅ Duplicate entry prevention
- ✅ Insufficient payment control
- ✅ Admin privileges

## 📝 Project Structure

```
parkingmeter/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/          # Utility functions
│   └── package.json
└── contracts/              # Soroban smart contracts
    ├── src/                # Contract source code
    ├── Cargo.toml         # Rust dependencies
    └── README.md          # This file
```

---

## Türkçe

Stellar Soroban platformu üzerinde geliştirilmiş blockchain tabanlı akıllı park metre sistemi. Bu sistem XLM kripto parası kullanarak güvenli, şeffaf ve otomatik park ücreti tahsilini sağlar.

## 🚀 Özellikler

### 📋 Temel Fonksiyonlar
- **Operatör Yönetimi**: Admin kontrolünde operatör kaydı ve yönetimi
- **Araç Giriş Kaydı**: Plaka numarası ile park giriş kayıtları
- **Otomatik Ücret Hesaplama**: Dakika bazında park ücreti hesaplama
- **Ödeme İşlemi**: XLM ile ödeme alma ve doğrulama
- **Güvenlik**: Yetkilendirme ve doğrulama kontrolleri
- **Çoklu Plaka Formatı**: Türk plaka formatlarına tam destek

### 🔧 Smart Contract Fonksiyonları

#### Admin Fonksiyonları
- `initialize(admin: Address)` - Kontratı başlatır
- `register_operator(operator, name, hourly_rate)` - Yeni operatör kaydeder
- `set_operator_status(operator, is_active)` - Operatör durumunu değiştirir
- `update_admin(new_admin)` - Admin adresini günceller

#### Operatör Fonksiyonları
- `create_entry(operator, license_plate)` - Araç giriş kaydı oluşturur
- `calculate_fee(license_plate)` - Park ücretini hesaplar
- `complete_payment(license_plate, payment_amount)` - Ödeme işlemini tamamlar

#### Sorgulama Fonksiyonları
- `get_entry(license_plate)` - Araç giriş bilgisini getirir
- `get_operator(operator_address)` - Operatör bilgisini getirir
- `get_total_entries()` - Toplam giriş sayısını döndürür

## 🛠️ Kurulum ve Derleme

### Gereksinimler
- Rust (en son kararlı sürüm)
- Soroban CLI
- Stellar CLI

### Derleme
```bash
cd contracts
soroban contract build
```

### Test Çalıştırma
```bash
cargo test
```

## 🚀 Deployment

### 1. Testnet'e Deploy
```bash
# Kontratı deploy et
soroban contract deploy \
  --wasm target/wasm32v1-none/release/hello_world.wasm \
  --source alice \
  --network testnet

# Kontrat ID'sini kaydet
export CONTRACT_ID="CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

### 2. Kontratı Başlat
```bash
# Admin olarak kontratı başlat
soroban contract invoke \
  --id $CONTRACT_ID \
  --source alice \
  --network testnet \
  -- initialize \
  --admin GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 3. Operatör Kaydet
```bash
# Yeni operatör kaydet (100 XLM/saat = 1000000000 stroops/saat)
soroban contract invoke \
  --id $CONTRACT_ID \
  --source alice \
  --network testnet \
  -- register_operator \
  --operator GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
  --name "Otopark A" \
  --hourly_rate 1000000000
```

## 💰 Ücret Hesaplama

- **Birim**: Dakika bazında hesaplama
- **Yuvarlama**: Yukarı yuvarlama (ceiling)
- **Formül**: `(dakika * saatlik_ücret) / 60`

Örnek:
- Saatlik ücret: 100 XLM (1,000,000,000 stroops)
- Park süresi: 37 dakika
- Hesaplanan ücret: `(37 * 1,000,000,000) / 60 = 616,666,667 stroops ≈ 61.67 XLM`

## 🚗 Desteklenen Plaka Formatları

✅ **Geçerli Türk plaka formatları:**
- **1 karakter**: `34 A 1234`
- **2 karakter**: `61 AZ 5652`
- **3 karakter**: `06 ACK 5678`
- **Aralık**: İl kodu (01-81) + Boşluk + Harfler (1-3 karakter) + Boşluk + Sayılar (01-99999)

## 🔒 Güvenlik

- **Yetkilendirme**: Kritik işlemler için `require_auth()` kontrolü
- **Duplicate Check**: Aynı plaka ile çoklu giriş engelleme
- **Payment Validation**: Yetersiz ödeme kontrolü
- **Admin Controls**: Sadece admin operatör yönetimi yapabilir

## 🧪 Test Kapsamı

- ✅ Kontrat başlatma
- ✅ Operatör kaydı ve yönetimi
- ✅ Araç giriş kaydı
- ✅ Ücret hesaplama
- ✅ Ödeme işlemi
- ✅ Duplicate giriş engelleme
- ✅ Yetersiz ödeme kontrolü
- ✅ Admin yetkileri

## 📝 Proje Yapısı

```
parkingmeter/
├── frontend/                 # Next.js frontend uygulaması
│   ├── src/
│   │   ├── components/      # React bileşenleri
│   │   ├── types/          # TypeScript interface'leri
│   │   └── utils/          # Yardımcı fonksiyonlar
│   └── package.json
└── contracts/              # Soroban smart contract'ları
    ├── src/                # Kontrat kaynak kodu
    ├── Cargo.toml         # Rust bağımlılıkları
    └── README.md          # Bu dosya
```

## 🤝 Katkıda Bulunma | Contributing

1. Fork yapın | Fork the project
2. Feature branch oluşturun | Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit yapın | Commit changes (`git commit -m 'Add amazing feature'`)
4. Push yapın | Push to branch (`git push origin feature/amazing-feature`)
5. Pull Request açın | Open a Pull Request

## 📄 Lisans | License

Bu proje MIT lisansı altında lisanslanmıştır. | This project is licensed under the MIT License.

---

**🚀 Stellar Soroban ile güvenli ve ölçeklenebilir smart contract'lar**  
**🚀 Secure and scalable smart contracts with Stellar Soroban** 