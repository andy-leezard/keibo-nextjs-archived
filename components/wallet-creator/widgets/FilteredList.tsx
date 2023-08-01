import { ReactNode, useMemo, useRef } from "react"
import { PDictionary, WithLocale, t } from "@/i18n-config"
import { FiSearch } from "react-icons/fi"
import { Button, TextField } from "../../ui"
import { FilterableItem } from "../type"
import styles from "./FilteredList.module.css"
import { generateNextArray, generatePreviousArray } from "../utils"
import { isValidEmailAddress } from "@/utils"

type FilteredListProps<T> = WithLocale & {
  data: Array<T>
  setKeyword: (str: string) => void

  // OPTIONAL
  searchFormat?: "email" | "text"
  processing?: boolean
  height?: number
  maxWidth?: number
  current?: T | null
  placeholders?: PDictionary
  fallbackIcon?: ReactNode
  label?: PDictionary
  onSelect?: (item: T) => void
  onSearch?: () => void
  renderItem?: (props: T) => ReactNode
  customElement?: (className: string) => ReactNode

  // PAGE RELATED OPTIONS
  page?: number
  pageRange?: number
  maxKnownPage?: number
  pageEnded?: boolean
  onPage?: (page: number) => void
  onNextPage?: () => void
}

const FilteredList = <T extends FilterableItem>({
  currentLocale,

  data,
  setKeyword,

  searchFormat = "text",
  processing,
  height,
  maxWidth = 400,
  current,
  placeholders,
  fallbackIcon,
  label,
  onSelect,
  onSearch,
  renderItem,
  customElement,

  page,
  pageRange = 3,
  maxKnownPage = 0,
  pageEnded,
  onPage,
  onNextPage,
}: FilteredListProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const nextPageArray = useMemo(() => {
    if (typeof page !== "number") return []
    return generateNextArray(page, Math.max(0, pageRange - 1), maxKnownPage)
  }, [maxKnownPage, page, pageRange])

  const previousPageArray = useMemo(() => {
    if (typeof page !== "number") return []
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
        onKeyDown={(event) => {
          onSearch && event.key === "Enter" && onSearch()
        }}
      >
        {onSearch ? (
          <Button
            corner="rounded"
            isDisabled={
              searchFormat === "email"
                ? !isValidEmailAddress(inputRef?.current?.value ?? "")
                : !Boolean(inputRef?.current?.value)
            }
            onPress={() => onSearch()}
          >
            <FiSearch />
          </Button>
        ) : (
          <FiSearch />
        )}
      </TextField>
      {/* RESULT FIELD */}
      <div
        className={styles.filtered_list}
        style={{ height: `${height ?? 300}px` }}
      >
        <div
          className={styles.filtered_list_container}
          style={{
            justifyContent: data.length || customElement ? "normal" : "center",
            alignItems: data.length || customElement ? "normal" : "center",
          }}
        >
          {customElement ? customElement(styles.filtered_list_item) : <></>}
          {processing ? (
            Array.from({ length: 5 }, (_, i) => i).map((i) => (
              <div
                key={`loader-${i}`}
                className={styles.filtered_list_item}
              ></div>
            ))
          ) : data.length ? (
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
                    if (!onSelect) return
                    if (inputRef?.current) {
                      inputRef.current.value = t(currentLocale, p.display_name)
                    }
                    onSelect(p)
                  }}
                >
                  {renderItem ? renderItem(p) : <></>}
                </Button>
              )
            })
          ) : !customElement ? (
            <span>
              {t(currentLocale, {
                en: "No result",
                fr: "Aucun résultat",
                ko: "결과 없음",
              })}
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* INTERFACE */}
      {typeof page === "number" ? (
        <div className={styles.page_indicator_container}>
          <div className={styles.page_indicator}>
            {previousPageArray?.length && onPage ? (
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
            {page - pageRange > 0 && onPage ? (
              <Button theme="none" onPress={() => onPage(0)}>
                1...
              </Button>
            ) : (
              <></>
            )}
          </div>
          <span className={styles.current_page_indicator}>{page + 1}</span>
          <div className={styles.page_indicator}>
            {onPage && nextPageArray?.length ? (
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
            ) : !pageEnded && onNextPage ? (
              <Button theme="none" onPress={() => onNextPage()}>
                {page + 2}
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default FilteredList
