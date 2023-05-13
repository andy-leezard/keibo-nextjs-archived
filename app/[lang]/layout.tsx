import { Nav, Footer } from "@/components/layout"
import { Locale, WithLocaleParam, i18n } from "../../i18n-config"
import type { Metadata, ResolvingMetadata } from "next/types"
import { getDictionary } from "@/utils/server/get-dictionary"

export async function generateMetadata(
  { params, searchParams }: WithLocaleParam & WithSearchParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  const { title, description } = dict.meta
  return {
    title,
    description,
  }
}

/** [lang] parameter will match one of these */
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function HomeLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <>
      <Nav currentLocale={params.lang} />
      {children}
      <Footer currentLocale={params.lang} />
    </>
  )
}
