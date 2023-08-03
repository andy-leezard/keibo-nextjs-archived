"use client"

import { CSSProperties, useRef } from "react"
import { FaGlobeAsia } from "react-icons/fa"
import styles from "./LocaleSwitcher.module.css"
import cn from "classnames"
import { MdClose } from "react-icons/md"
import { WithLocale, t } from "@/i18n-config"
import { usePathname, useRouter } from "next/navigation"
import ReactCountryFlag from "react-country-flag"
import { FaLanguage } from "react-icons/fa6"

const locales = [
  {
    displayName: "English",
    countryCode: "GB",
    code: "en",
  },
  {
    displayName: "Français",
    countryCode: "FR",
    code: "fr",
  },
  {
    displayName: "한국어",
    countryCode: "KR",
    code: "ko",
  },
] as const

type LocaleSwitcherProps = WithLocale & {
  className?: string
  style?: CSSProperties
}

const LocaleSwitcherV2 = ({
  currentLocale,
  className,
  style,
}: LocaleSwitcherProps) => {
  const router = useRouter()
  const pathName = usePathname()
  const dialogRef = useRef<HTMLDialogElement>(null)

  const open = () => {
    if (!dialogRef?.current) return
    dialogRef.current.showModal()
  }

  const close = () => {
    if (!dialogRef?.current) return
    dialogRef.current.close()
  }

  const toggle = () => {
    if (!dialogRef?.current) return
    dialogRef.current.open ? close() : open()
  }

  const redirectedPathName = (locale: (typeof locales)[number]["code"]) => {
    if (!pathName) {
      router.push("/")
      return
    }
    const segments = pathName.split("/")
    segments[1] = `${locale}`
    router.push(segments.join("/"))
  }

  return (
    <>
      <button
        type="button"
        className={cn(
          styles.icon_button,
          className,
          "flex-shrink-0"
        )}
        onClick={() => toggle()}
        style={style}
      >
        <FaGlobeAsia size={24} />
      </button>
      <dialog
        ref={dialogRef}
        className={cn(styles.dialogWrapper, "rounded-md")}
        /* Prevent ESC (échappe) key */
        /* onCancel={(e) => e.preventDefault()} */
        onClick={(e) => {
          const dialogDimensions = dialogRef.current?.getBoundingClientRect()
          if (!dialogDimensions) return
          if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
          ) {
            close()
          }
        }}
      >
        <div
          className={cn(
            styles.container,
            "flex flex-col p-3",
            "dark:bg-gray-800"
          )}
        >
          <div className={cn("flex justify-between")}>
            <div className="inline-flex items-center gap-2">
              <FaLanguage size={24} />
              <span>
                {t(currentLocale, {
                  en: "Languages",
                  fr: "Langues",
                  ko: "언어 설정",
                })}
              </span>
            </div>
            <button
              className={cn("text-neutral-400 hover:text-neutral-500")}
              onClick={() => toggle()}
            >
              <MdClose size={32} />
            </button>
          </div>
          <div className={cn("overflow-y-auto flex flex-wrap ")}>
            <div className={cn("flex w-full")}>
              {locales.map((locale, i) => (
                <button
                  className={cn(
                    styles.locale_button,
                    "inline-flex p-3 items-center gap-2 rounded-sm",
                    "hover:bg-neutral-100 dark:hover:bg-gray-700"
                  )}
                  key={i}
                  onClick={() => redirectedPathName(locale.code)}
                >
                  <ReactCountryFlag
                    svg
                    countryCode={locale.countryCode}
                    aria-label="United States"
                  />
                  <span className="flex flex-1 text-left">
                    {locale.displayName}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default LocaleSwitcherV2
