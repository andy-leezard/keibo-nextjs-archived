import React, { ReactNode, useMemo, useRef } from "react"
import { PDictionary, WithLocale, t } from "@/i18n-config"
import { FiSearch } from "react-icons/fi"
import { Button, TextField } from "../../ui"
import { FilterableItem } from "../type"
import styles from "./FilteredList.module.css"
import { generateNextArray, generatePreviousArray } from "../utils"

type FilteredListProps<T> = WithLocale & {
  data: Array<T>
  current: T | null
  page: number
  maxKnownPage: number
  pageEnded: boolean
  onPage: (page: number) => void
  onNextPage: () => void
  setKeyword: (str: string) => void
  onSelect: (item: T) => void

  // OPTIONAL
  pageRange?: number
  placeholders?: PDictionary
  fallbackIcon?: ReactNode
  label?: PDictionary
  renderItem?: (props: T) => ReactNode
}

const FilteredList = <T extends FilterableItem>({
  currentLocale,

  data,
  current,
  page,
  maxKnownPage,
  pageEnded,
  onPage,
  onNextPage,
  setKeyword,
  onSelect,

  pageRange = 3,
  placeholders,
  fallbackIcon,
  label,
  renderItem,
}: FilteredListProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const nextPageArray = useMemo(() => {
    return generateNextArray(page, Math.max(0, pageRange - 1), maxKnownPage)
  }, [maxKnownPage, page, pageRange])

  const previousPageArray = useMemo(() => {
    return generatePreviousArray(page, pageRange)
  }, [page, pageRange])

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
      {/* INTERFACE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "16px",
            justifyContent: "flex-end"
          }}
        >
          {page - pageRange > 0 ? (
            <Button theme="none" onPress={() => onPage(0)}>
              1
            </Button>
          ) : (
            <></>
          )}
          {previousPageArray?.length ? (
            previousPageArray.map((p, i) => {
              return (
                <Button
                  key={`prev-${i}`}
                  theme="none"
                  onPress={() => onPage(p)}
                >
                  {p + 1}
                </Button>
              )
            })
          ) : (
            <></>
          )}
        </div>
        <span>{page + 1}</span>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {nextPageArray?.length ? (
            nextPageArray.map((p, i) => {
              return (
                <Button
                  key={`next-${i}`}
                  theme="none"
                  onPress={() => onPage(p)}
                >
                  {p + 1}
                </Button>
              )
            })
          ) : (
            <Button
              isDisabled={pageEnded}
              theme="none"
              onPress={() => {
                if (pageEnded) return
                onNextPage()
              }}
            >
              {page + 2}
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default FilteredList
