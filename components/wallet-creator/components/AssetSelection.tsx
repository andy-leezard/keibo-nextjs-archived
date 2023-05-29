"use client"

import { PDictionary, WithLocale, t } from "@/i18n-config"
import { useContext, useEffect, useMemo, useState } from "react"
import { WalletCreationContext } from "../context"
import { FaPlus } from "react-icons/fa"
import RowIcon from "../widgets/RowIcon"
import { BsBank } from "react-icons/bs"
import { MdCurrencyFranc, MdOutlineAccountBalanceWallet } from "react-icons/md"
import { TAsset } from "../type"
import { IoLogoEuro, IoLogoUsd, IoLogoYen } from "react-icons/io"
import { FilteredList, IconRenderer } from "../widgets"
import { BiPound, BiRuble, BiWon } from "react-icons/bi"
import { TbCoinRupee } from "react-icons/tb"
import { normalize } from "@/utils"
import { Button } from "@/components/ui"
import sharedStyles from "../WalletCreator.module.css"

type AssetSelectionProps = WithLocale & {}

const placeholders: Record<WalletConstructor["category"], PDictionary> = {
  cash: {
    en: "USD, EUR, JPY, KRW, etc...",
    fr: "USD, EUR, JPY, KRW, etc...",
    ko: "미국 달러, 유로, 원화, 엔화, 등",
  },
  crypto: {
    en: "BTC, ETH, BNB, USDT etc...",
    fr: "BTC, ETH, BNB, USDT etc...",
    ko: "비트코인, 이더리움, 등",
  },
  equity: {
    en: "AAPL, AMZN, NVDA, etc...",
    fr: "LVMH, ORANGE, AXA, etc...",
    ko: "삼성전자, SK 하이닉스, 카카오 등",
  },
  fund: {
    en: "SPDR S&P 500 ETF, VTI,  etc...",
    fr: "Amundi CAC 40 ETF, BNP Paribas Aqua, etc...",
    ko: "KODEX 200 ETF, TIGER 200 ETF 등",
  },
  other: {
    en: "Commodities, Derivatives, etc...",
    fr: "Matières premières, produits dérivés, etc...",
    ko: "원자재, 파생상품, 옵션 등",
  },
}

const currencies: Array<TAsset> = [
  {
    value: "usd",
    symbol: "usd",
    sign: "$",
    quantity: 0,
    image: <IoLogoUsd />,
    display_name: { en: "US Dollar", fr: "Dollar américain", ko: "미국 달러" },
  },
  {
    value: "eur",
    symbol: "eur",
    sign: "€",
    quantity: 0,
    image: <IoLogoEuro />,
    display_name: { en: "Euro", ko: "유럽연합 유로" },
  },
  {
    value: "chf",
    symbol: "chf",
    sign: "₣",
    quantity: 0,
    image: <MdCurrencyFranc />,
    display_name: {
      en: "Swiss Franc",
      fr: "Franc suisse",
      ko: "스위스 프랑",
    },
  },
  {
    value: "gbp",
    symbol: "gbp",
    sign: "£",
    quantity: 0,
    image: <BiPound />,
    display_name: {
      en: "British Pound Sterling",
      fr: "Livre sterling britannique",
      ko: "영국 파운드",
    },
  },
  {
    value: "jpy",
    symbol: "jpy",
    sign: "¥",
    quantity: 0,
    image: <IoLogoYen />,
    display_name: { en: "Japan Yen", fr: "Yen japonais", ko: "일본 엔화" },
  },
  {
    value: "rub",
    symbol: "rub",
    sign: "₽",
    quantity: 0,
    image: <BiRuble />,
    display_name: {
      en: "Russian ruble",
      fr: "Rouble russe",
      ko: "러시아 루블",
    },
  },
  {
    value: "krw",
    symbol: "krw",
    sign: "₩",
    quantity: 0,
    image: <BiWon />,
    display_name: { en: "Korean won", fr: "Won coréen", ko: "대한민국 원화" },
  },
  {
    value: "cny",
    symbol: "cny",
    sign: "¥",
    quantity: 0,
    image: <IoLogoYen />,
    display_name: {
      en: "Chinese yuan",
      fr: "Yuan chinois",
      ko: "중국 위안화",
    },
  },
  {
    value: "cad",
    symbol: "cad",
    sign: "$",
    quantity: 0,
    image: <IoLogoUsd />,
    display_name: {
      en: "Canadian Dollar",
      fr: "Dollar canadien",
      ko: "캐나다 달러",
    },
  },
  {
    value: "inr",
    symbol: "inr",
    sign: "₹",
    quantity: 0,
    image: <TbCoinRupee />,
    display_name: {
      en: "Indian Rupee",
      fr: "roupie indienne",
      ko: "호주 달러",
    },
  },
]

const AssetSelection = ({ currentLocale }: AssetSelectionProps) => {
  const { category, provider, update } = useContext(WalletCreationContext)
  const [current, setCurrent] = useState<TAsset | null>(null)
  const [keyword, setKeyword] = useState("")
  const [data, setData] = useState<Array<TAsset>>([])

  useEffect(() => {
    switch (category?.value) {
      case "cash":
        setData(currencies)
        break
      default:
        break
    }
  }, [category])

  const displayData = useMemo(() => {
    if (!data?.length) {
      return []
    }
    const normalized_keyword = normalize(keyword, "lowercase")
    return data.filter(
      (i) =>
        !keyword.trim() ||
        normalize(t(currentLocale, i.display_name), "lowercase").includes(
          normalized_keyword
        ) ||
        normalize(t(currentLocale, i.symbol), "lowercase").includes(
          normalized_keyword
        )
    )
  }, [currentLocale, data, keyword])

  return (
    <div className={sharedStyles.flex_col_container}>
      <div className={sharedStyles.flex_row_container}>
        {category ? (
          <RowIcon
            currentLocale={currentLocale}
            image={category.image}
            displayName={category.display_name}
            size={"regular_size"}
          />
        ) : (
          <></>
        )}
        {provider ? (
          <>
            <FaPlus size={24} />
            <RowIcon
              currentLocale={currentLocale}
              image={provider.image}
              displayName={provider.display_name}
              fallbackIcon={<BsBank size={48} />}
              size={"regular_size"}
            />
          </>
        ) : (
          <></>
        )}
        {current ? (
          <>
            <FaPlus size={24} />
            <RowIcon
              currentLocale={currentLocale}
              image={current.image}
              displayName={current.display_name}
              fallbackIcon={<MdOutlineAccountBalanceWallet size={48} />}
              size={"regular_size"}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      {data?.length ? (
        <FilteredList<TAsset>
          currentLocale={currentLocale}
          placeholders={category ? placeholders[category.value] : undefined}
          label={{
            en: "Name of the asset (currency)",
            fr: "Nom de l'actif (devise)",
            ko: "자산 및 화폐명",
          }}
          data={displayData}
          current={current}
          onSelect={setCurrent}
          setKeyword={setKeyword}
          renderItem={({ image, display_name, symbol }) => {
            return (
              <>
                <IconRenderer image={image} />
                <span>{symbol.toUpperCase()}</span>
                <span>({t(currentLocale, display_name)})</span>
                <></>
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
            update("asset", null)
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
          onPress={() => update("asset", current)}
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

export default AssetSelection
