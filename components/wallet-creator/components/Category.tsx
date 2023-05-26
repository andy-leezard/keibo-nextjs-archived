"use client"

import { WithLocale, t } from "@/i18n-config"
import { Button } from "../../ui"
import { Description } from "../../ui/listbox/ListBox"
import { Label } from "../../ui/shared"
import { useContext, useState } from "react"
import { indexIsValidForArray } from "@/utils/client"
import globalStyles from "../WalletCreator.module.css"
import styles from "./Category.module.css"
import { WalletCreationContext } from "../context"
import { TWalletCategory } from "../type"
import { BsBank2, BsCashStack, BsPiggyBankFill } from "react-icons/bs"
import { AiOutlineStock } from "react-icons/ai"
import { FaBitcoin } from "react-icons/fa"

type CategoryProps = WithLocale & {}

const wallet_categories: Array<TWalletCategory> = [
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

const Category = ({ currentLocale }: CategoryProps) => {
  const { update } = useContext(WalletCreationContext)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  return (
    <>
      <div className={styles.flex_grid_container}>
        {wallet_categories.map((cat, i) => {
          return (
            <Button
              corner="rounded"
              key={i}
              className={`${styles.flex_grid_item} ${
                i === currentIndex ? styles.current_item : ""
              }`}
              onPress={() => setCurrentIndex(i)}
            >
              {cat.image ?? <></>}
              <Label>{t(currentLocale, cat.display_name)}</Label>
              {cat.description ? (
                <Description>{t(currentLocale, cat.description)}</Description>
              ) : (
                <></>
              )}
            </Button>
          )
        })}
      </div>
      <div className={globalStyles.buttons_container}>
        <Button
          isDisabled={Boolean(
            typeof currentIndex !== "number" ||
              !indexIsValidForArray(wallet_categories, currentIndex)
          )}
          corner="rounded"
          className={globalStyles.button}
          onPress={() => update("category", wallet_categories[currentIndex!])}
        >
          {t(currentLocale, {
            en: "Next",
            fr: "Suivant",
            ko: "다음",
          })}
        </Button>
      </div>
    </>
  )
}

export default Category
