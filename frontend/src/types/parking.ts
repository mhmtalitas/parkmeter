export interface ParkingEntry {
  id: string;
  licensePlate: string;
  entryTime: Date;
  exitTime?: Date;
  duration?: number; // dakika cinsinden
  cost?: number; // XLM cinsinden
  isPaid: boolean;
  paymentTxHash?: string;
}

export interface ParkingOperator {
  publicKey: string;
  name: string;
  parkingName: string;
  hourlyRate: number; // XLM/saat
}

export interface PaymentRequest {
  amount: number;
  currency: 'XLM' | 'USDC';
  recipientAddress: string;
  memo?: string;
}

export interface QRPaymentData {
  destination: string;
  amount: string;
  memo: string;
  asset_code?: string;
  asset_issuer?: string;
} 