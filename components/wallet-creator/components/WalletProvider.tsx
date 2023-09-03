"use client"

import { PDictionary, WithLocale, t } from "@/i18n-config"
import { useContext, useEffect, useRef, useState } from "react"
import { BsBank } from "react-icons/bs"
import { TWalletProvider } from "../type"
import { FaPlus } from "react-icons/fa"
import { WalletCreationContext } from "../context"
import RowIcon from "../widgets/RowIcon"
import { FilteredList, IconRenderer } from "../widgets"
import { AwaitedArrayData, fetchEdgeDataAsArray } from "../utils"
import { ButtonForward } from "@/components/ui/button"
import { assetCategoryIconMap } from "@/constants/client/icons"

type WalletProviderProps = WithLocale & {}

const placeholders: Readonly<Map<AssetCategory, PDictionary>> = new Map([
  [
    "cash",
    {
      en: "JPMorgan Chase, Paypal, Coinbase, etc...",
      fr: "BNP Paribas, Paypal, etc...",
      ko: "국민은행, 카카오뱅크 등",
    },
  ],
  [
    "crypto",
    {
      en: "Coinbase, Binance US, Ledger, etc...",
      fr: "Binance, Ledger, Coinbase, etc...",
      ko: "업비트, 레저, 바이낸스 등",
    },
  ],
  [
    "equity",
    {
      en: "Robinhood, Fidelity, etc...",
      fr: "Boursorama, Etoro, etc...",
      ko: "삼성증권, 미래에셋증권, 키움증권 등",
    },
  ],
  [
    "fund",
    {
      en: "Vanguard, Fidelity, etc...",
      fr: "Boursorama, Linxea, etc...",
      ko: "삼성증권, 하나은행, KB증권 등",
    },
  ],
  [
    "other",
    {
      en: "Commodities, Derivatives, etc...",
      fr: "Matières premières, produits dérivés, etc...",
      ko: "원자재, 파생상품, 옵션 등",
    },
  ],
])

const WalletProvider = ({ currentLocale }: WalletProviderProps) => {
  const { state, dispatch } = useContext(WalletCreationContext)
  const { category } = state
  const [current, setCurrent] = useState<TWalletProvider | null>(null)
  const [keyword, setKeyword] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [displayData, setDisplayData] = useState<
    AwaitedArrayData<TWalletProvider>
  >({
    metadata: {
      page_ended: false,
    },
    data: [],
  })
  const maxKnownPage = useRef<number>(0)

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      if (!category?.value) return
      const [res, _error] = await fetchEdgeDataAsArray<TWalletProvider>(
        `${process.env.NEXTAUTH_URL}/api/wallet-providers?category=${
          category.value
        }&size=5&page=${currentPage}${keyword ? `&keyword=${keyword}` : ""}`
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
    <div className="flex flex-col m-4 gap-4">
      <div className="flex justify-center items-center gap-4">
        {category ? (
          <RowIcon
            currentLocale={currentLocale}
            image={
              assetCategoryIconMap.has(category.value)
                ? assetCategoryIconMap.get(category.value)!()
                : null
            }
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
      <div className="flex flex-col p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
        <FilteredList<TWalletProvider>
          currentLocale={currentLocale}
          placeholders={
            category && placeholders.has(category.value)
              ? placeholders.get(category.value)
              : undefined
          }
          label={{
            en: "Name of the financial institution",
            fr: "Nom de l'institution financière",
            ko: "금융기관명",
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
          renderItem={({ image, display_name }) => {
            return (
              <>
                <IconRenderer image={image} />
                <span>{t(currentLocale, display_name)}</span>
              </>
            )
          }}
        />
      </div>
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
          className="rounded-md p-2 min-w-90"
          disabled={Boolean(!current)}
          style={{ opacity: current ? 1 : 0.5 }}
          onClick={() => dispatch({ type: "SET_PROVIDER", payload: current })}
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

export default WalletProvider
