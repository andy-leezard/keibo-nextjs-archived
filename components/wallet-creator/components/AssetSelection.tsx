"use client"

import { PDictionary, WithLocale, t } from "@/i18n-config"
import {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
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
import { isNoneArrayObject, normalize } from "@/utils"
import { Button } from "@/components/ui"
import sharedStyles from "../WalletCreator.module.css"
import { AwaitedData, fetchNewData } from "../utils"

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

const iconMap: Map<string, Function> = new Map([
  ["usd", IoLogoUsd],
  ["eur", IoLogoEuro],
  ["chf", MdCurrencyFranc],
  ["gbp", BiPound],
  ["jpy", IoLogoYen],
  ["rub", BiRuble],
  ["krw", BiWon],
  ["cny", IoLogoYen],
  ["cad", IoLogoUsd],
  ["inr", TbCoinRupee],
])

const AssetSelection = ({ currentLocale }: AssetSelectionProps) => {
  const { category, provider, update } = useContext(WalletCreationContext)
  const [current, setCurrent] = useState<TAsset | null>(null)
  const [keyword, setKeyword] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [pageEnded, setPageEnded] = useState(false)
  const [displayData, setDisplayData] = useState<AwaitedData<Array<TAsset>>>({
    metadata: {
      page_ended: false,
    },
    data: [],
  })
  const maxKnownPage = useRef<number>(0)

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      if (
        !category?.value ||
        (category.value !== "crypto" && category.value !== "cash")
      )
        return
      const [res, _error] = await fetchNewData<Array<TAsset>>(
        `http://localhost:${process.env.PORT ?? 3000}/api/assets/${
          category.value
        }?size=5&page=${currentPage}&keyword=${keyword}`
      )
      if (res && mounted) {
        if (currentPage > maxKnownPage.current && res.data.length) {
          maxKnownPage.current = currentPage
        }
        /* const { metadata, data } = res */
        setDisplayData(res)
      }
    }
    fetchData()
    return () => {
      mounted = false
    }
  }, [category, currentPage, keyword])

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
      <FilteredList<TAsset>
        currentLocale={currentLocale}
        placeholders={category ? placeholders[category.value] : undefined}
        label={{
          en: "Name of the asset (currency)",
          fr: "Nom de l'actif (devise)",
          ko: "자산 및 화폐명",
        }}
        data={displayData.data}
        page={currentPage}
        maxKnownPage={maxKnownPage.current}
        pageEnded={displayData.metadata.page_ended}
        onPage={setCurrentPage}
        onNextPage={() => setCurrentPage((prev) => prev + 1)}
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
