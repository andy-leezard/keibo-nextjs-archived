"use client"

import { PDictionary, WithLocale, t } from "@/i18n-config"
import TextField from "../ui/text-field/TextField"
import { useMemo, useRef, useState } from "react"
import { FiSearch } from "react-icons/fi"
import styles from "./SequentialBox.module.css"
import { wallet_categories } from "./constants"
import { Label } from "../ui/listbox/ListBox"
import { Button } from "../ui"

type WalletProviderProps = WithLocale & {
  category: WalletConstructor["category"]
  onConfirm: (provider: WalletConstructor["provider"]) => void
  onBack: () => void
}

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

const WalletProvider = ({
  currentLocale,
  category,
  onConfirm,
  onBack,
}: WalletProviderProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [keyword, setKeyword] = useState("")

  const category_metadata = useMemo(() => {
    return wallet_categories.find((cat) => cat.value === category)
  }, [category])

  return (
    <div className={styles.flex_col_container}>
      {category_metadata ? (
        <div
          className={styles.flex_grid_item_small}
          style={{ alignSelf: "center" }}
        >
          {category_metadata.image ?? <></>}
          <Label>{t(currentLocale, category_metadata.display_name)}</Label>
        </div>
      ) : (
        <></>
      )}
      <TextField
        ref={inputRef}
        aria-label="provider"
        maxLength={32}
        placeholder={t(currentLocale, placeholders[category])}
        label={t(currentLocale, {
          en: "Name of the financial institution",
          fr: "Nom de l'institution financière",
          ko: "금융기관명",
        })}
        maxWidth={400}
        onChange={(str: string) => setKeyword(str)}
      >
        <FiSearch />
      </TextField>
      {/* RESULT FIELD */}
      <div className={styles.filtered_list}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>no result</span>
        </div>
      </div>
      <div className={styles.buttons_container}>
        <Button
          /* isDisabled={Boolean(
            typeof currentIndex !== "number" ||
              !indexIsValidForArray(wallet_categories, currentIndex)
          )} */
          corner="rounded"
          className={styles.button}
          onPress={() => onBack()}
        >
          {t(currentLocale, {
            en: "Previous",
            fr: "Retour",
            ko: "이전",
          })}
        </Button>
        <Button
          /* isDisabled={Boolean(
            typeof currentIndex !== "number" ||
              !indexIsValidForArray(wallet_categories, currentIndex)
          )} */
          corner="rounded"
          className={styles.button}
          onPress={() => {
            /* onConfirm() */
          }}
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
