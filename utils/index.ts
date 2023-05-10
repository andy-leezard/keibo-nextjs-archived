/* These are "amphibian" utility functions - should work both on SSR and CSR. */
import { Locale, i18n } from "@/i18n-config"

/** Takes a dictionary and conditionally return the corresponding output */
export const t = (
  locale: Locale,
  dictionary: PartiallyRequired<
    Partial<Record<Locale, string>>,
    (typeof i18n)["defaultLocale"]
  >
) => {
  if (Object.prototype.hasOwnProperty.call(dictionary, locale)) {
    return dictionary[locale]
  }
  return dictionary[i18n.defaultLocale]
}
