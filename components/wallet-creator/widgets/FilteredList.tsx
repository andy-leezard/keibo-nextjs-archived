import { ReactNode, useMemo, useRef } from "react"
import { PDictionary, WithLocale, t } from "@/i18n-config"
import { FiSearch } from "react-icons/fi"
import { TextField } from "../../ui"
import { FilterableItem } from "../type"
import styles from "./FilteredList.module.css"
import { generateNextArray, generatePreviousArray } from "../utils"
import { isValidEmailAddress } from "@/utils"
import cn from "classnames"

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
        onChange={setKeyword}
        onKeyDown={(event) => {
          onSearch && event.key === "Enter" && onSearch()
        }}
      >
        {onSearch ? (
          <button
            type="button"
            className="cursor-pointer"
            disabled={
              searchFormat === "email"
                ? !isValidEmailAddress(inputRef?.current?.value ?? "")
                : !Boolean(inputRef?.current?.value)
            }
            onClick={() => onSearch()}
          >
            <FiSearch />
          </button>
        ) : (
          <FiSearch className="w-5 h-5 mr-1" />
        )}
      </TextField>
      {/* RESULT FIELD */}
      <div
        className="flex flex-col overflow-y-auto rounded-lg-200 mt-2 bg-slate-200 dark:bg-slate-800 rounded-md"
        style={{ height: `${height ?? 256}px` }}
      >
        <div
          className="flex flex-1 flex-col gap-1"
          style={{
            justifyContent: data.length || customElement ? "normal" : "center",
            alignItems: data.length || customElement ? "normal" : "center",
          }}
        >
          {customElement ? (
            customElement(
              cn(
                styles.filtered_list_item,
                "flex items-center p-2 rounded-lg gap-2"
              )
            )
          ) : (
            <></>
          )}
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
                <button
                  type="button"
                  key={idx}
                  className={cn(
                    "flex items-center p-2 rounded-lg gap-2 ",
                    styles.filtered_list_item,
                    {
                      "bg-slate-400 dark:bg-slate-700 hover:bg-slate-500 dark:hover:bg-slate-600":
                        p.value === current?.value,
                      "hover:bg-slate-400 dark:hover:bg-slate-700":
                        p.value !== current?.value,
                    }
                  )}
                  onClick={() => {
                    if (!onSelect) return
                    if (inputRef?.current) {
                      inputRef.current.value = t(currentLocale, p.display_name)
                    }
                    onSelect(p)
                  }}
                >
                  {renderItem ? renderItem(p) : <></>}
                </button>
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
                  <button
                    type="button"
                    key={`prev-${i}`}
                    onClick={() => onPage(p)}
                  >
                    {p + 1}
                  </button>
                )
              })
            ) : (
              <></>
            )}
            {page - pageRange > 0 && onPage ? (
              <button type="button" onClick={() => onPage(0)}>
                1...
              </button>
            ) : (
              <></>
            )}
          </div>
          <span className={styles.current_page_indicator}>{page + 1}</span>
          <div className={styles.page_indicator}>
            {onPage && nextPageArray?.length ? (
              nextPageArray.map((p, i) => {
                return (
                  <button
                    key={`next-${i}`}
                    type="button"
                    onClick={() => onPage(p)}
                  >
                    {p + 1}
                  </button>
                )
              })
            ) : !pageEnded && onNextPage ? (
              <button type="button" onClick={() => onNextPage()}>
                {page + 2}
              </button>
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
