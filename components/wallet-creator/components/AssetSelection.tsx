"use client"

import { PDictionary, WithLocale, t } from "@/i18n-config"
import { useContext, useEffect, useRef, useState } from "react"
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
import { AwaitedData, fetchNewData } from "../utils"
import { ButtonForward } from "@/components/ui/button"
import { IconBaseProps } from "react-icons"

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

const iconMap: Map<string, (props: IconBaseProps) => JSX.Element> = new Map([
  ["usd", (props) => <IoLogoUsd {...props} />],
  ["eur", (props) => <IoLogoEuro {...props} />],
  ["chf", (props) => <MdCurrencyFranc {...props} />],
  ["gbp", (props) => <BiPound {...props} />],
  ["jpy", (props) => <IoLogoYen {...props} />],
  ["rub", (props) => <BiRuble {...props} />],
  ["krw", (props) => <BiWon {...props} />],
  ["cny", (props) => <IoLogoYen {...props} />],
  ["cad", (props) => <IoLogoUsd {...props} />],
  ["inr", (props) => <TbCoinRupee {...props} />],
])

const AssetSelection = ({ currentLocale }: AssetSelectionProps) => {
  const { state, dispatch } = useContext(WalletCreationContext)
  const { category, provider } = state
  const [current, setCurrent] = useState<TAsset | null>(null)
  const [keyword, setKeyword] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
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
        console.log(`Page ended ${res.metadata.page_ended}`)
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
    <div className="flex flex-col m-4 gap-4">
      <div className="flex justify-center items-center gap-4 min-h-90">
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
              image={
                iconMap.has(current.symbol)
                  ? iconMap.get(current.symbol)!({ size: 24 })
                  : undefined
              }
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
        onSelect={(item) => {
          if (current?.value === item.value) {
            setCurrent(null)
          } else {
            setCurrent(item)
          }
        }}
        setKeyword={setKeyword}
        renderItem={({ image, display_name, symbol }) => {
          return (
            <>
              <IconRenderer
                image={
                  iconMap.has(symbol)
                    ? iconMap.get(symbol)!({ size: 24 })
                    : undefined
                }
              />
              <span>{symbol.toUpperCase()}</span>
              <span>({t(currentLocale, display_name)})</span>
              <></>
            </>
          )
        }}
      />
      <div className="flex items-center justify-center gap-4 mb-4">
        <ButtonForward
          className="rounded-md p-2 min-w-90"
          onClick={() => {
            dispatch({ type: "BACK" })
          }}
        >
          {t(currentLocale, {
            en: "Previous",
            fr: "Retour",
            ko: "이전",
          })}
        </ButtonForward>
        <ButtonForward
          disabled={Boolean(!current)}
          className="rounded-md p-2 min-w-90"
          onClick={() => dispatch({ type: "SET_ASSET", payload: current })}
          style={{ opacity: current ? 1 : 0.5 }}
        >
          {t(currentLocale, {
            en: "Next",
            fr: "Suivant",
            ko: "다음",
          })}
        </ButtonForward>
      </div>
    </div>
  )
}

export default AssetSelection
