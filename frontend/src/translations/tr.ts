import { Translations } from '@/types/language';

export const tr: Translations = {
  // Header
  appTitle: "Stellar Park Metre",
  
  // Wallet
  wallet: "Stellar Cüzdan:",
  connectFreighter: "Freighter Bağla",
  manual: "Manuel",
  connected: "Bağlı Cüzdan",
  disconnect: "Bağlantıyı Kes",
  refreshBalance: "Bakiye Yenile",
  
  // Parking Entry
  vehicleEntry: "Araç Giriş Kaydı",
  licensePlate: "Plaka Numarası",
  entryTime: "Giriş Saati",
  createEntry: "Giriş Kaydı Oluştur",
  creating: "Kaydediliyor...",
  connectWalletFirst: "Araç giriş kaydı oluşturmak için önce cüzdanınızı bağlayın.",
  
  // Parking List
  activeVehicles: "Aktif Araç",
  paidVehicles: "Ödeme Yapılan",
  totalVehicles: "Toplam Araç",
  feeRate: "Ücret Tarifesi:",
  perHour: "XLM/saat",
  minuteBased: "(dakika bazında hesaplanır)",
  currentVehicles: "Park Halindeki Araçlar",
  noActiveVehicles: "Şu anda park halinde araç bulunmuyor.",
  startParking: "Yeni araç girişi için yukarıdaki formu kullanın.",
  plate: "Plaka",
  entryTimeShort: "Giriş Saati",
  duration: "Süre",
  cost: "Ücret",
  status: "Durum",
  actions: "İşlemler",
  paid: "Ödendi",
  pending: "Bekliyor",
  collectPayment: "Ödeme Al",
  
  // QR Payment
  paymentQR: "Ödeme QR Kodu",
  paymentDetails: "Ödeme Detayları",
  hourlyRate: "Saatlik Ücret:",
  parkingDuration: "Park Süresi:",
  totalAmount: "Toplam Tutar",
  qrPayment: "QR Kod ile Ödeme",
  paymentInstructions: "Ödeme Talimatları:",
  paymentSteps: {
    step1: "Stellar cüzdanınızı (Freighter, Lobstr vb.) açın",
    step2: "QR kod okutma özelliğini kullanın",
    step3: "Ödeme tutarını kontrol edin",
    step4: "İşlemi onaylayın"
  },
  cancel: "İptal",
  paymentCompleted: "Ödeme Tamamlandı",
  
  // Messages
  invalidPlate: "Geçerli bir plaka numarası girin (örn: 34 A 1234, 61 AZ 5652 veya 06 ACK 5678)",
  plateExample: "34 A 1234, 61 AZ 5652 veya 06 ACK 5678",
  futureTimeError: "Giriş saati gelecek zamanda olamaz",
  selectEntryTime: "Giriş saatini seçin",
  
  // Footer
  securePayment: "Stellar Network ile güvenli ve şeffaf ödeme sistemi",
  testnetWarning: "Testnet üzerinde çalışmaktadır. Gerçek para kullanmayın."
}; 