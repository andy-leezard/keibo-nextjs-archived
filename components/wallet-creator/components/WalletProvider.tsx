"use client"

import { PDictionary, WithLocale, t } from "@/i18n-config"
import { useContext, useMemo, useState } from "react"
import sharedStyles from "../WalletCreator.module.css"
import { Button } from "../../ui"
import { normalize } from "@/utils"
import { BsBank } from "react-icons/bs"
import { TWalletProvider } from "../type"
import { FaPlus } from "react-icons/fa"
import { WalletCreationContext } from "../context"
import RowIcon from "../widgets/RowIcon"
import { FilteredList, IconRenderer } from "../widgets"

type WalletProviderProps = WithLocale & {}

const placeholders: Record<WalletConstructor["category"], PDictionary> = {
  cash: {
    en: "JPMorgan Chase, Paypal, Coinbase, etc...",
    fr: "BNP Paribas, Paypal, etc...",
    ko: "국민은행, 카카오뱅크 등",
  },
  crypto: {
    en: "Coinbase, Binance US, Ledger, etc...",
    fr: "Binance, Ledger, Coinbase, etc...",
    ko: "업비트, 레저, 바이낸스 등",
  },
  equity: {
    en: "Robinhood, Fidelity, etc...",
    fr: "Boursorama, Etoro, etc...",
    ko: "삼성증권, 미래에셋증권, 키움증권 등",
  },
  fund: {
    en: "Vanguard, Fidelity, etc...",
    fr: "Boursorama, Linxea, etc...",
    ko: "삼성증권, 하나은행, KB증권 등",
  },
  other: {
    en: "Commodities, Derivatives, etc...",
    fr: "Matières premières, produits dérivés, etc...",
    ko: "원자재, 파생상품, 옵션 등",
  },
}

const wallet_providers: Array<TWalletProvider> = [
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

const WalletProvider = ({ currentLocale }: WalletProviderProps) => {
  const { category, update } = useContext(WalletCreationContext)
  const [current, setCurrent] = useState<TWalletProvider | null>(null)
  const [keyword, setKeyword] = useState("")

  const providers = useMemo(() => {
    if (!category) {
      return []
    }
    const normalized_keyword = normalize(keyword, "lowercase")
    if (category.value === "other") {
      return wallet_providers.filter(
        (wp) =>
          !keyword.trim() ||
          normalize(t(currentLocale, wp.display_name), "lowercase").includes(
            normalized_keyword
          )
      )
    } else {
      return wallet_providers.filter(
        (wp) =>
          wp.supported_categories.includes(
            category.value as Exclude<WalletConstructor["category"], "other">
          ) &&
          (!keyword.trim() ||
            normalize(t(currentLocale, wp.display_name), "lowercase").includes(
              normalized_keyword
            ))
      )
    }
  }, [category, currentLocale, keyword])

  return (
    <div className={sharedStyles.flex_col_container}>
      <div className={sharedStyles.flex_row_container}>
        {category ? (
          <RowIcon
            currentLocale={currentLocale}
            image={category.image}
            displayName={category.display_name}
          />
        ) : (
          <></>
        )}
        {current ? (
          <>
            <FaPlus size={32} />
            <RowIcon
              currentLocale={currentLocale}
              image={current.image}
              displayName={current.display_name}
              fallbackIcon={<BsBank size={64} />}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      {providers?.length ? (
        <FilteredList<TWalletProvider>
          currentLocale={currentLocale}
          placeholders={category ? placeholders[category.value] : undefined}
          label={{
            en: "Name of the financial institution",
            fr: "Nom de l'institution financière",
            ko: "금융기관명",
          }}
          data={providers}
          current={current}
          onSelect={setCurrent}
          setKeyword={setKeyword}
          renderItem={({ image, display_name }) => {
            return (
              <>
                <IconRenderer image={image} />
                <span>{t(currentLocale, display_name)}</span>
              </>
            )
          }}
        />
      ) : (
        <></>
      )}
      <div className={sharedStyles.buttons_container}>
        <Button
          /* isDisabled={Boolean(
            typeof currentIndex !== "number" ||
              !indexIsValidForArray(wallet_categories, currentIndex)
          )} */
          corner="rounded"
          className={sharedStyles.button}
          onPress={() => {
            update("provider", null)
            update("category", null)
          }}
        >
          {t(currentLocale, {
            en: "Previous",
            fr: "Retour",
            ko: "이전",
          })}
        </Button>
        <Button
          isDisabled={Boolean(!current)}
          corner="rounded"
          className={sharedStyles.button}
          onPress={() => update("provider", current)}
          style={{ opacity: current ? 1 : 0.5 }}
        >
          {t(currentLocale, {
            en: "Next",
            fr: "Suivant",
            ko: "다음",
          })}
        </Button>
      </div>
    </div>
  )
}

export default WalletProvider
