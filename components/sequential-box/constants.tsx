import { PDictionary } from "@/i18n-config"
import { ReactNode } from "react"
import { BsBank2, BsCashStack, BsPiggyBankFill } from "react-icons/bs"
import { AiOutlineStock } from "react-icons/ai"
import { FaBitcoin } from "react-icons/fa"

export const display_messages = [
  {
    en: "Tell us about your new wallet.",
    fr: "Parlez-nous de votre nouveau portefeuille.",
    ko: "새로운 지갑에 대해 말해주세요.",
  },
  {
    en: "Tell us about the organization or the instrument in charge",
    fr: "Parlez-nous de l'organisation ou de l'instrument en charge",
    ko: "위탁 기관 또는 지갑 종류에 대해 말해주세요.",
  },
  {
    en: "Create a wallet",
    fr: "Créer un portefeuille",
    ko: "지갑 생성하기",
  },
  {
    en: "Create a wallet",
    fr: "Créer un portefeuille",
    ko: "지갑 생성하기",
  },
]

export const wallet_categories: Array<{
  value: WalletConstructor["category"]
  image?: ReactNode
  display_name: PDictionary
  description?: PDictionary
}> = [
  {
    value: "cash",
    image: <BsCashStack />,
    display_name: {
      en: "Fiat currency",
      fr: "Monnaie",
      ko: "화폐",
    },
    description: {
      en: "Cash, Back accounts, cash accounts on other financial services",
      fr: "Espèces, comptes de dépôt, comptes sur d'autres services financiers",
      ko: "현금, 은행계좌, 기타 금융 서비스 계좌 등",
    },
  },
  {
    value: "equity",
    image: <AiOutlineStock />,
    display_name: {
      en: "Equity",
      fr: "Action",
      ko: "주식",
    },
    description: {
      en: "Stocks",
      fr: "Actions privées ou publiques",
      ko: "보통주",
    },
  },
  {
    value: "crypto",
    image: <FaBitcoin />,
    display_name: {
      en: "Cryptocurreny & tokens",
      fr: "Cryptomonnaie & tokens",
      ko: "암호화폐 및 토큰",
    },
    description: {
      en: "Private or platform wallets",
      fr: "Portefeuilles privé ou de plateforme",
      ko: "거래소 및 개인지갑",
    },
  },
  {
    value: "fund",
    image: <BsBank2 />,
    display_name: {
      en: "Funds",
      fr: "Fonds",
      ko: "펀드",
    },
    description: {
      en: "ETFs, hedge funds, and private equity funds",
      fr: "ETF, fonds spéculatifs et fonds de capital-investissement",
      ko: "ETF, 헤지펀드 및 사모펀드",
    },
  },
  {
    value: "other",
    image: <BsPiggyBankFill />,
    display_name: {
      en: "Other",
      fr: "Autre",
      ko: "기타",
    },
  },
]

export const wallet_providers: Array<{
  value: WalletConstructor["provider"]
  image?: ReactNode
  display_name: PDictionary
  description?: PDictionary
}> = [
  { value: "bnp_paribas", display_name: { en: "BNP Paribas" } },
  { value: "binance", display_name: { en: "Binance", ko: "바이낸스" } },
  { value: "ledger", display_name: { en: "Ledger", ko: "레저" } },
  {
    value: "credit_agricole",
    display_name: { en: "Crédit Agricole", ko: "크레디 아그리콜" },
  },
  { value: "boursorama", display_name: { en: "Boursorama" } },
  {
    value: "shinhan_bank",
    display_name: { en: "Shinhan Bank", ko: "신한은행" },
  },
  { value: "kakao_bank", display_name: { en: "Kakao Bank", ko: "카카오뱅크" } },
  { value: "orange_bank", display_name: { en: "Orange Bank" } },
  { value: "coinbase", display_name: { en: "Coinbase", ko: "코인베이스" } },
]

/* export const placeholders = [
    {

    }
] */
