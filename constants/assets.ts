import type { PDictionary } from "@/i18n-config"

export const assetIconMap: Map<string, string> = new Map([
  [
    "bitcoin",
    "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  ],
  [
    "bitcoin-cash",
    "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png?1594689492",
  ],
  [
    "binancecoin",
    "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",
  ],
  [
    "cardano",
    "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860",
  ],
  [
    "dogecoin",
    "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256",
  ],
  [
    "ethereum",
    "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
  ],
  [
    "ripple",
    "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
  ],
  [
    "solana",
    "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
  ],
  [
    "tron",
    "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1547035066",
  ],
  [
    "tether",
    "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
  ],
  [
    "usd-coin",
    "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
  ],
  [
    "matic-network",
    "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912",
  ],
  [
    "polkadot",
    "https://assets.coingecko.com/coins/images/12171/large/polkadot.png?1639712644",
  ],
  [
    "litecoin",
    "https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580",
  ],
  [
    "binance-usd",
    "https://assets.coingecko.com/coins/images/9576/large/BUSD.png?1568947766",
  ],
  [
    "avalanche-2",
    "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1670992574",
  ],
  [
    "uniswap",
    "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png?1600306604",
  ],
  [
    "chainlink",
    "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1547034700",
  ],
  [
    "monero",
    "https://assets.coingecko.com/coins/images/69/large/monero_logo.png?1547033729",
  ],
  [
    "ethereum-classic",
    "https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png?1547034169",
  ],
  [
    "stellar",
    "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1552356157",
  ],
  [
    "aave",
    "https://assets.coingecko.com/coins/images/12645/large/AAVE.png?1601374110",
  ],
])

export const assetMetaMap: Map<
  string,
  {
    symbol: string
    dict: PDictionary
  }
> = new Map([
  [
    "usd",
    {
      symbol: "$",
      dict: { en: "US Dollar", fr: "Dollar américain", ko: "미국 달러" },
    },
  ],
  [
    "eur",
    {
      symbol: "€",
      dict: { en: "Euro", ko: "유럽연합 유로" },
    },
  ],
  [
    "chf",
    {
      symbol: "₣",
      dict: {
        en: "Swiss Franc",
        fr: "Franc suisse",
        ko: "스위스 프랑",
      },
    },
  ],
  [
    "gbp",
    {
      symbol: "£",
      dict: {
        en: "British Pound Sterling",
        fr: "Livre sterling britannique",
        ko: "영국 파운드",
      },
    },
  ],
  [
    "jpy",
    {
      symbol: "¥",
      dict: { en: "Japan Yen", fr: "Yen japonais", ko: "일본 엔화" },
    },
  ],
  [
    "rub",
    {
      symbol: "₽",
      dict: {
        en: "Russian ruble",
        fr: "Rouble russe",
        ko: "러시아 루블",
      },
    },
  ],
  [
    "krw",
    {
      symbol: "₩",
      dict: { en: "Korean won", fr: "Won coréen", ko: "대한민국 원화" },
    },
  ],
  [
    "cny",
    {
      symbol: "¥",
      dict: {
        en: "Chinese yuan",
        fr: "Yuan chinois",
        ko: "중국 위안화",
      },
    },
  ],
  [
    "cad",
    {
      symbol: "$",
      dict: {
        en: "Canadian Dollar",
        fr: "Dollar canadien",
        ko: "캐나다 달러",
      },
    },
  ],
  [
    "inr",
    {
      symbol: "₹",
      dict: {
        en: "Indian Rupee",
        fr: "roupie indienne",
        ko: "인도 루피",
      },
    },
  ],
  [
    "bitcoin",
    {
      symbol: "₿",
      dict: {
        en: "Bitcoin",
        ko: "비트코인",
      },
    },
  ],
  [
    "ethereum",
    {
      symbol: "ETH",
      dict: {
        en: "Ethereum",
        ko: "이더리움",
      },
    },
  ],
  [
    "binancecoin",
    {
      symbol: "BNB",
      dict: {
        en: "BNB",
        ko: "바이낸스 코인",
      },
    },
  ],
  [
    "bitcoin-cash",
    {
      symbol: "BCH",
      dict: {
        en: "Bitcoin Cash",
        ko: "비트코인 캐시",
      },
    },
  ],
  [
    "ripple",
    {
      symbol: "XRP",
      dict: {
        en: "XRP",
        ko: "리플",
      },
    },
  ],
  [
    "cardano",
    {
      symbol: "ADA",
      dict: {
        en: "Cardano ADA",
        ko: "에이다",
      },
    },
  ],
  [
    "solana",
    {
      symbol: "SOL",
      dict: {
        en: "Solana",
        ko: "솔라나",
      },
    },
  ],
  [
    "tron",
    {
      symbol: "TRX",
      dict: {
        en: "Tron",
        ko: "트론",
      },
    },
  ],
  [
    "dogecoin",
    {
      symbol: "DOGE",
      dict: {
        en: "Dogecoin",
        ko: "도지코인",
      },
    },
  ],
  [
    "tether",
    {
      symbol: "USDT",
      dict: {
        en: "USDT",
        ko: "테더 달러",
      },
    },
  ],
  [
    "usd-coin",
    {
      symbol: "USDC",
      dict: {
        en: "USDC",
      },
    },
  ],
  [
    "matic-network",
    {
      symbol: "MATIC",
      dict: {
        en: "Matic",
        ko: "매틱",
      },
    },
  ],
  [
    "polkadot",
    {
      symbol: "DOT",
      dict: {
        en: "Polkadot",
        ko: "폴카닷",
      },
    },
  ],
  [
    "litecoin",
    {
      symbol: "LTC",
      dict: {
        en: "Litecoin",
        ko: "라이트코인",
      },
    },
  ],
  [
    "binance-usd",
    {
      symbol: "BUSD",
      dict: {
        en: "BUSD",
        ko: "바이낸스 달러",
      },
    },
  ],
  [
    "avalanche-2",
    {
      symbol: "AVAX",
      dict: {
        en: "Avalanche",
      },
    },
  ],
  [
    "uniswap",
    {
      symbol: "UNI",
      dict: {
        en: "Uniswap",
      },
    },
  ],
  [
    "chainlink",
    {
      symbol: "LINK",
      dict: {
        en: "Chainlink",
        ko: "체인링크",
      },
    },
  ],
  [
    "monero",
    {
      symbol: "XMR",
      dict: {
        en: "Monero",
        ko: "모네로",
      },
    },
  ],
  [
    "ethereum-classic",
    {
      symbol: "ETC",
      dict: {
        en: "Ethereum Classic",
        ko: "이더리움 클래식",
      },
    },
  ],
  [
    "stellar",
    {
      symbol: "XLM",
      dict: {
        en: "Stellar",
        ko: "스텔라",
      },
    },
  ],
  [
    "aave",
    {
      symbol: "AAVE",
      dict: {
        en: "Aave",
      },
    },
  ],
])
