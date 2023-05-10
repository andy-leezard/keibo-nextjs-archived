export const i18n = {
  defaultLocale: "en",
  locales: ["en", "fr", "ko"],
} as const

export type Locale = (typeof i18n)["locales"][number]
export type WithLocale = { currentLocale: Locale }
export type WithLocaleParam = { params: { lang: Locale } }
