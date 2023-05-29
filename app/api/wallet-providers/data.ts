import type { TWalletProvider } from "@/components/wallet-creator/type"

const data:Array<TWalletProvider> = [
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
    image: "/icons/bnp.svg",
    supported_categories: ["cash", "equity", "fund"],
    display_name: { en: "BNP Paribas" },
  },
  {
    value: "boursorama",
    image:
      "https://groupe.boursorama.fr/theme_front/theme_front_1/image/bandeau/logo-forme.svg",
    supported_categories: ["cash", "equity", "fund"],
    display_name: { en: "Boursorama" },
  },
  {
    value: "citibank",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Citi.svg/300px-Citi.svg.png?20210120214333",
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
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/52/Kakao_Bank_of_Korea_Logo.jpg?20200417085722",
    supported_categories: ["cash"],
    display_name: { en: "Kakao Bank", ko: "카카오뱅크" },
  },
  {
    value: "orange_bank",
    image:
      "https://upload.wikimedia.org/wikipedia/fr/thumb/0/09/Orange_Bank_2017.png/600px-Orange_Bank_2017.png?20171101143914",
    supported_categories: ["cash"],
    display_name: { en: "Orange Bank" },
  },
  {
    value: "ledger",
    supported_categories: ["crypto"],
    display_name: { en: "Ledger", ko: "레저" },
  },
  {
    value: "shinhan_bank",
    image: "https://s3-symbol-logo.tradingview.com/shinhan-financial--big.svg",
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
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wells_Fargo_Bank.svg/302px-Wells_Fargo_Bank.svg.png?20200414151837",
    supported_categories: ["cash", "equity", "fund"],
    display_name: { en: "Wells Fargo", ko: "웰스 파고" },
  },
]

export default data
