"use client"

import { WithLocale, t } from "@/i18n-config"
import { Description } from "../../ui/listbox/ListBox"
import { Label } from "../../ui/shared"
import { useContext, useState } from "react"
import { indexIsValidForArray } from "@/utils/client"
import styles from "./Category.module.css"
import { WalletCreationContext } from "../context"
import { TWalletCategory } from "../type"
import { ButtonForward } from "@/components/ui/button"
import cn from "classnames"
import { assetCategoryIconMap } from "@/constants/client/icons"

type CategoryProps = WithLocale & {}

const wallet_categories: Array<TWalletCategory> = [
  {
    value: "cash",
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
    display_name: {
      en: "Cryptocurreny",
      fr: "Cryptomonnaie",
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
    display_name: {
      en: "Other",
      fr: "Autre",
      ko: "기타",
    },
  },
]

const Category = ({ currentLocale }: CategoryProps) => {
  const { dispatch } = useContext(WalletCreationContext)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  return (
    <>
      <div
        className={cn(styles.flex_grid_container, "m-4 flex flex-wrap gap-4")}
      >
        {wallet_categories.map((cat, i) => {
          const selected = i === currentIndex
          return (
            <ButtonForward
              key={i}
              className={cn(styles.flex_grid_item, "rounded-md p-2")}
              orientation="vertical"
              withShadow={selected}
              focused={selected}
              onClick={() => setCurrentIndex(i)}
            >
              {assetCategoryIconMap.has(cat.value) ? (
                assetCategoryIconMap.get(cat.value)!()
              ) : (
                <></>
              )}
              <Label>{t(currentLocale, cat.display_name)}</Label>
              {cat.description ? (
                <Description>{t(currentLocale, cat.description)}</Description>
              ) : (
                <></>
              )}
            </ButtonForward>
          )
        })}
      </div>
      <div className="flex items-center justify-center gap-4 mb-4">
        <ButtonForward
          className="rounded-md p-2 min-w-90"
          disabled={Boolean(
            typeof currentIndex !== "number" ||
              !indexIsValidForArray(wallet_categories, currentIndex)
          )}
          onClick={() =>
            dispatch({
              type: "SET_CAT",
              payload: wallet_categories[currentIndex!],
            })
          }
        >
          {t(currentLocale, {
            en: "Next",
            fr: "Suivant",
            ko: "다음",
          })}
        </ButtonForward>
      </div>
    </>
  )
}

export default Category
