import * as StellarSdk from '@stellar/stellar-sdk';
import { PaymentRequest, QRPaymentData } from '@/types/parking';

// Testnet için server
export const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

// USDC asset (testnet)
export const USDC_ASSET = new StellarSdk.Asset(
  'USDC',
  'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5'
);

export class StellarService {
  // Freighter'ın yüklenmesini bekleyen yardımcı fonksiyon
  static async waitForFreighter(timeout: number = 5000): Promise<boolean> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      const checkFreighter = () => {
        if (typeof window !== 'undefined' && (window as any).freighter) {
          resolve(true);
          return;
        }
        
        if (Date.now() - startTime > timeout) {
          resolve(false);
          return;
        }
        
        setTimeout(checkFreighter, 100);
      };
      
      checkFreighter();
    });
  }

  static async connectWallet(): Promise<string | null> {
    try {
      // Freighter wallet kontrolü
      if (typeof window === 'undefined') {
        throw new Error('Window object not available');
      }

      console.log('Freighter bekleniyor...');
      
      // Freighter'ın yüklenmesini bekle
      const freighterAvailable = await this.waitForFreighter(5000);
      
      if (!freighterAvailable) {
        throw new Error('Freighter wallet extension not found. Please install Freighter wallet extension and refresh the page.');
      }

      console.log('Freighter bulundu, bağlanıyor...');

      // @ts-ignore - Freighter wallet bağlantısı
      const isConnected = await window.freighter.isConnected();
      if (!isConnected) {
        console.log('Freighter erişim izni isteniyor...');
        // @ts-ignore
        await window.freighter.requestAccess();
      }

      // @ts-ignore - Public key alma
      const publicKey = await window.freighter.getPublicKey();
      
      if (!publicKey) {
        throw new Error('Failed to get public key from Freighter wallet');
      }

      console.log('Wallet connected successfully:', publicKey);
      return publicKey;
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      
      // Hata türüne göre özel mesajlar
      if (error.message?.includes('User declined access')) {
        throw new Error('Cüzdan erişimi reddedildi. Lütfen tekrar deneyin.');
      } else if (error.message?.includes('not found')) {
        throw new Error('Freighter cüzdan eklentisi bulunamadı. Sayfayı yenileyin ve tekrar deneyin.');
      } else {
        throw new Error('Cüzdan bağlantısı başarısız: ' + error.message);
      }
    }
  }

  static async getAccountBalance(publicKey: string): Promise<{ xlm: string; usdc: string }> {
    try {
      const account = await server.loadAccount(publicKey);
      let xlmBalance = '0';
      let usdcBalance = '0';

      account.balances.forEach((balance: any) => {
        if (balance.asset_type === 'native') {
          xlmBalance = balance.balance;
        } else if (balance.asset_code === 'USDC') {
          usdcBalance = balance.balance;
        }
      });

      return { xlm: xlmBalance, usdc: usdcBalance };
    } catch (error) {
      console.error('Balance fetch error:', error);
      return { xlm: '0', usdc: '0' };
    }
  }

  static generatePaymentQR(paymentData: QRPaymentData): string {
    const params = new URLSearchParams({
      destination: paymentData.destination,
      amount: paymentData.amount,
      memo: paymentData.memo,
    });

    if (paymentData.asset_code && paymentData.asset_issuer) {
      params.append('asset_code', paymentData.asset_code);
      params.append('asset_issuer', paymentData.asset_issuer);
    }

    return `web+stellar:pay?${params.toString()}`;
  }

  static async submitPayment(
    sourceSecretKey: string,
    paymentRequest: PaymentRequest
  ): Promise<string> {
    try {
      const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
      const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

      const asset = paymentRequest.currency === 'XLM' 
        ? StellarSdk.Asset.native() 
        : USDC_ASSET;

      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: paymentRequest.recipientAddress,
            asset: asset,
            amount: paymentRequest.amount.toString(),
          })
        )
        .addMemo(StellarSdk.Memo.text(paymentRequest.memo || ''))
        .setTimeout(180)
        .build();

      transaction.sign(sourceKeypair);
      const result = await server.submitTransaction(transaction);
      return result.hash;
    } catch (error) {
      console.error('Payment submission error:', error);
      throw error;
    }
  }

  static calculateParkingCost(durationMinutes: number, hourlyRate: number): number {
    const hours = durationMinutes / 60;
    return Math.ceil(hours * hourlyRate * 100) / 100; // 2 decimal places
  }
} 