import type { TWalletProvider } from "@/components/wallet-creator/type"

const data: Array<TWalletProvider> = [
  {
    value: "bank_of_america",
    image: "/icons/bank_of_america.svg",
    supported_categories: ["cash", "equity", "fund"],
    display_name: { en: "Bank of America", ko: "뱅크 오브 아메리카" },
  },
  {
    value: "binance",
    image: "/icons/binance.svg",
    supported_categories: ["cash", "crypto"],
    display_name: { en: "Binance", ko: "바이낸스" },
  },
  {
    value: "bnp_paribas",
    image: "/icons/bnp_paribas.svg",
    supported_categories: ["cash", "equity", "fund"],
    display_name: { en: "BNP Paribas" },
  },
  {
    value: "boursorama",
    image: "/icons/boursorama.svg",
    supported_categories: ["cash", "equity", "fund"],
    display_name: { en: "Boursorama" },
  },
  {
    value: "citibank",
    image: "/icons/citibank.png",
    supported_categories: ["cash", "equity", "fund"],
    display_name: { en: "Citibank", ko: "씨티은행" },
  },
  {
    value: "coinbase",
    image: "/icons/coinbase.svg",
    supported_categories: ["cash", "crypto"],
    display_name: { en: "Coinbase", ko: "코인베이스" },
  },
  {
    value: "credit_agricole",
    image: "/icons/credit_agricole.svg",
    supported_categories: ["cash", "equity", "fund"],
    display_name: { en: "Crédit Agricole", ko: "크레디 아그리콜" },
  },
  {
    value: "jp_morgan_chase",
    image: "/icons/jp_morgan_chase.webp",
    supported_categories: ["cash", "equity", "fund"],
    display_name: { en: "JPMorgan Chase & Co", ko: "체이스 은행" },
  },
  {
    value: "kakao_bank",
    image: "/icons/kakao_bank.jpg",
    supported_categories: ["cash"],
    display_name: { en: "Kakao Bank", ko: "카카오뱅크" },
  },
  {
    value: "orange_bank",
    image: "/icons/orange_bank.png",
    supported_categories: ["cash"],
    display_name: { en: "Orange Bank" },
  },
  {
    value: "ledger",
    image: "/icons/ledger.svg",
    supported_categories: ["crypto"],
    display_name: { en: "Ledger", ko: "레저" },
  },
  {
    value: "shinhan_bank",
    image: "/icons/shinhan_bank.svg",
    supported_categories: ["cash"],
    display_name: { en: "Shinhan Bank", ko: "신한은행" },
  },
  {
    value: "societe_generale",
    image: "/icons/societe_generale.svg",
    supported_categories: ["cash", "equity", "fund"],
    display_name: { en: "Société Générale", ko: "소시에테 제네랄" },
  },
  {
    value: "wells_fargo",
    image: "/icons/wells_fargo.png",
    supported_categories: ["cash", "equity", "fund"],
    display_name: { en: "Wells Fargo", ko: "웰스 파고" },
  },
]

export default data
