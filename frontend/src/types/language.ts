export type Language = 'tr' | 'en';

export interface Translations {
  // Header
  appTitle: string;
  
  // Wallet
  wallet: string;
  connectFreighter: string;
  manual: string;
  connected: string;
  disconnect: string;
  refreshBalance: string;
  
  // Parking Entry
  vehicleEntry: string;
  licensePlate: string;
  entryTime: string;
  createEntry: string;
  creating: string;
  connectWalletFirst: string;
  
  // Parking List
  activeVehicles: string;
  paidVehicles: string;
  totalVehicles: string;
  feeRate: string;
  perHour: string;
  minuteBased: string;
  currentVehicles: string;
  noActiveVehicles: string;
  startParking: string;
  plate: string;
  entryTimeShort: string;
  duration: string;
  cost: string;
  status: string;
  actions: string;
  paid: string;
  pending: string;
  collectPayment: string;
  
  // QR Payment
  paymentQR: string;
  paymentDetails: string;
  hourlyRate: string;
  parkingDuration: string;
  totalAmount: string;
  qrPayment: string;
  paymentInstructions: string;
  paymentSteps: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  cancel: string;
  paymentCompleted: string;
  
  // Messages
  invalidPlate: string;
  plateExample: string;
  futureTimeError: string;
  selectEntryTime: string;
  
  // Footer
  securePayment: string;
  testnetWarning: string;
} 