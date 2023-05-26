import React, { ReactNode, useRef } from "react"
import TextField from "../../ui/text-field"
import { PDictionary, WithLocale, t } from "@/i18n-config"
import { FiSearch } from "react-icons/fi"
import { Button } from "../../ui"
import { FilterableItem } from "../type"
import Image from "next/image"
import globalStyles from "../WalletCreator.module.css"
import styles from "./FilteredList.module.css"

type FilteredListProps<T> = WithLocale & {
  placeholders?: PDictionary
  fallbackIcon?: ReactNode
  label?: PDictionary
  data: Array<T>
  current: T | null
  renderItem?: (props: T) => ReactNode
  setKeyword: (str: string) => void
  onSelect: (item: T) => void
}

const FilteredList = <T extends FilterableItem>({
  currentLocale,
  placeholders,
  fallbackIcon,
  label,
  data,
  current,
  renderItem,
  setKeyword,
  onSelect,
}: FilteredListProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <TextField
        ref={inputRef}
        aria-label="provider"
        maxLength={32}
        placeholder={placeholders ? t(currentLocale, placeholders) : ""}
        label={label ? t(currentLocale, label) : ""}
        maxWidth={400}
        onChange={(str: string) => setKeyword(str)}
      >
        <FiSearch />
      </TextField>
      {/* RESULT FIELD */}
      <div className={styles.filtered_list}>
        <div
          className={styles.filtered_list_container}
          style={{
            justifyContent: data.length ? "normal" : "center",
            alignItems: data.length ? "normal" : "center",
          }}
        >
          {data.length ? (
            data.map((p, idx) => {
              return (
                <Button
                  key={idx}
                  className={`${styles.filtered_list_item} ${
                    p.value === current?.value
                      ? styles.selected
                      : styles.unselected
                  }`}
                  theme="none"
                  onPress={() => {
                    if (inputRef?.current) {
                      inputRef.current.value = t(currentLocale, p.display_name)
                    }
                    setKeyword(t(currentLocale, p.display_name))
                    onSelect(p)
                  }}
                >
                  {renderItem ? renderItem(p) : <></>}
                </Button>
              )
            })
          ) : (
            <span>
              {t(currentLocale, {
                en: "No result",
                fr: "Aucun résultat",
                ko: "결과 없음",
              })}
            </span>
          )}
        </div>
      </div>
    </>
  )
}

export default FilteredList
