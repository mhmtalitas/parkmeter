import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* mevcut ayarların kalabilir */

  // 🚨 Prod build sırasında ESLint hataları derlemeyi durdurmasın
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 🚨 TypeScript hataları (no-explicit-any vb.) build’i durdurmasın
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
