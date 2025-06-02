import { Translations } from '@/types/language';

export const en: Translations = {
  // Header
  appTitle: "Stellar Parking Meter",
  
  // Wallet
  wallet: "Stellar Wallet:",
  connectFreighter: "Connect Freighter",
  manual: "Manual",
  connected: "Connected Wallet",
  disconnect: "Disconnect",
  refreshBalance: "Refresh Balance",
  connecting: "Connecting...",
  connectionFailed: "Wallet connection failed.",
  freighterConnectionFailed: "Freighter connection failed. Try manual connection.",
  manualConnectionTitle: "Manual Wallet Connection",
  manualConnectionDesc: "Enter your Stellar wallet address manually:",
  stellarAddress: "Stellar Address",
  stellarAddressHelper: "Enter a 56-character Stellar address starting with G",
  useTestAddress: "Use Test Address",
  manualConnectionNote: "This is for display only. Real wallet connection is required for transactions.",
  connectButton: "Connect",
  invalidStellarAddress: "Enter a valid Stellar address (56 characters starting with G)",
  
  // Parking Entry
  vehicleEntry: "Vehicle Entry Record",
  licensePlate: "License Plate",
  entryTime: "Entry Time",
  createEntry: "Create Entry Record",
  creating: "Creating...",
  connectWalletFirst: "Please connect your wallet first to create a vehicle entry record.",
  
  // Parking List
  activeVehicles: "Active Vehicles",
  paidVehicles: "Paid Vehicles",
  totalVehicles: "Total Vehicles",
  feeRate: "Fee Rate:",
  perHour: "XLM/hour",
  minuteBased: "(calculated per minute)",
  currentVehicles: "Currently Parked Vehicles",
  noActiveVehicles: "No vehicles currently parked.",
  startParking: "Use the form above to register a new vehicle entry.",
  plate: "Plate",
  entryTimeShort: "Entry Time",
  duration: "Duration",
  cost: "Cost",
  status: "Status",
  actions: "Actions",
  paid: "Paid",
  pending: "Pending",
  collectPayment: "Collect Payment",
  
  // QR Payment
  paymentQR: "Payment QR Code",
  paymentDetails: "Payment Details",
  hourlyRate: "Hourly Rate:",
  parkingDuration: "Parking Duration:",
  totalAmount: "Total Amount",
  qrPayment: "QR Code Payment",
  paymentInstructions: "Payment Instructions:",
  paymentSteps: {
    step1: "Open your Stellar wallet (Freighter, Lobstr, etc.)",
    step2: "Use the QR code scanning feature",
    step3: "Verify the payment amount",
    step4: "Confirm the transaction"
  },
  cancel: "Cancel",
  paymentCompleted: "Payment Completed",
  
  // Messages
  invalidPlate: "Enter a valid license plate number (e.g., 34 A 1234, 61 AZ 5652, or 06 ACK 5678)",
  plateExample: "34 A 1234, 61 AZ 5652 or 06 ACK 5678",
  futureTimeError: "Entry time cannot be in the future",
  selectEntryTime: "Select entry time",
  
  // Footer
  securePayment: "Secure and transparent payment system with Stellar Network",
  testnetWarning: "Running on Testnet. Do not use real money."
}; 