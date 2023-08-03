/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
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
