"use client"

import { PDictionary, WithLocale, t } from "@/i18n-config"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import sharedStyles from "../WalletCreator.module.css"
import { Button } from "../../ui"
import { isNoneArrayObject, normalize } from "@/utils"
import { BsBank } from "react-icons/bs"
import { TWalletProvider } from "../type"
import { FaPlus } from "react-icons/fa"
import { WalletCreationContext } from "../context"
import RowIcon from "../widgets/RowIcon"
import { FilteredList, IconRenderer } from "../widgets"
import { AwaitedData, fetchNewData } from "../utils"

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

const WalletProvider = ({ currentLocale }: WalletProviderProps) => {
  const { category, update } = useContext(WalletCreationContext)
  const [current, setCurrent] = useState<TWalletProvider | null>(null)
  const [keyword, setKeyword] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [displayData, setDisplayData] = useState<
    AwaitedData<Array<TWalletProvider>>
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
      const [res, _error] = await fetchNewData<Array<TWalletProvider>>(
        `http://localhost:${
          process.env.PORT ?? 3000
        }/api/wallet-providers?category=${
          category.value
        }&size=5&page=${currentPage}&keyword=${keyword}`
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
      <FilteredList<TWalletProvider>
        currentLocale={currentLocale}
        placeholders={category ? placeholders[category.value] : undefined}
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
