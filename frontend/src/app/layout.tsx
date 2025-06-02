import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "🅿️ ParkingMeter - Stellar Blockchain Park Sistemi",
  description: "Stellar Soroban tabanlı akıllı park metre sistemi. QR kod ile ödeme, blockchain güvenliği ve şeffaf ücretlendirme.",
  keywords: ["parking", "stellar", "blockchain", "soroban", "xlm", "smart contract", "park metre"],
  authors: [{ name: "ParkingMeter Team" }],
  creator: "ParkingMeter",
  publisher: "ParkingMeter",
  icons: {
    icon: [
      { url: '/icon', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "🅿️ ParkingMeter - Stellar Blockchain Park Sistemi",
    description: "Stellar Soroban tabanlı akıllı park metre sistemi",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "🅿️ ParkingMeter",
    description: "Stellar Soroban tabanlı akıllı park metre sistemi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
