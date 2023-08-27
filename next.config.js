/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
 },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "upload.wikimedia.org",
      "s3-symbol-logo.tradingview.com",
      "assets.coingecko.com",
    ],
  },
}

module.exports = nextConfig
