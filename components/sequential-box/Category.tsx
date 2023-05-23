"use client"

import { WithLocale, t } from "@/i18n-config"
import { Button } from "../ui"
import { Description } from "../ui/listbox/ListBox"
import { Label } from "../ui/shared"
import { wallet_categories } from "./constants"
import styles from "./SequentialBox.module.css"
import { useState } from "react"
import { indexIsValidForArray } from "@/utils/client"

type CategoryProps = WithLocale & {
  onConfirm: (cat: WalletConstructor["category"]) => void
}

const Category = ({ currentLocale, onConfirm }: CategoryProps) => {
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
      <div className={styles.buttons_container}>
        <Button
          isDisabled={Boolean(
            typeof currentIndex !== "number" ||
              !indexIsValidForArray(wallet_categories, currentIndex)
          )}
          corner="rounded"
          className={styles.button}
          onPress={() => onConfirm(wallet_categories[currentIndex!].value)}
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
