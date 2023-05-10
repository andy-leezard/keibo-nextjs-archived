"use client"

import LocaleSwitcher from "@/components/locale-switcher"
import { WithLocale } from "@/i18n-config"

export const LocaleState = ({ currentLocale }: WithLocale) => {
  return (
    <LocaleSwitcher currentLocale={currentLocale} />
  )
}
