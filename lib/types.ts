declare global {
  type SupportedLanguage = "en" | "fr" | "ko"
  type SearchParams = Record<string, string>
}

/** export any type to declare this file */
export type GlobalModule = unknown
