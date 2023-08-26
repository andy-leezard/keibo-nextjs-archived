import "server-only"

const dictionaries = {
  en: () =>
    import("@/dictionaries/en.json").then((module) => module.default),
  fr: () =>
    import("@/dictionaries/fr.json").then((module) => module.default),
  ko: () =>
    import("@/dictionaries/ko.json").then((module) => module.default),
} as const

export type Dictionary = (typeof dictionaries)["en"]

export const getDictionary = async (locale: keyof typeof dictionaries) =>
  dictionaries[locale]()
