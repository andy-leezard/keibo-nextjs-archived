"use client"

import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { Locale, WithLocale, i18n } from "../../i18n-config"
import { t } from "@/utils"
import { Item, Select } from "../ui"
import { Key } from "react"
import { Placement, SSRProvider } from "react-aria"

const localeDisplayName = (locale: Locale) => {
  switch (locale) {
    case "ko":
      return "한국어"
    case "fr":
      return "Français"
    case "en":
    default:
      return "English"
  }
}

type LocaleSwitcherProps = WithLocale & {
  placement?: Placement
  hideLabel?: boolean
}

export default function LocaleSwitcher({
  currentLocale,
  placement,
  hideLabel,
}: LocaleSwitcherProps) {
  const router = useRouter()
  const pathName = usePathname()

  const redirectedPathName = (locale: Key) => {
    if (!pathName) {
      router.push("/")
      return
    }
    const segments = pathName.split("/")
    segments[1] = `${locale}`
    router.push(segments.join("/"))
  }

  return (
    <SSRProvider>
      <Select
        hideLabel={hideLabel}
        defaultSelectedKey={currentLocale}
        label={t(currentLocale, { en: "Language", fr: "Langue", ko: "언어" })}
        items={i18n.locales.map((locale) => ({
          id: locale,
          name: localeDisplayName(locale),
        }))}
        onSelectionChange={redirectedPathName}
        placement={placement}
      >
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </Select>
    </SSRProvider>
  )
}
