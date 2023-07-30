import { Locale, WithLocaleParam } from "../../i18n-config"
import type { Metadata, ResolvingMetadata } from "next/types"
import { getDictionary } from "@/utils/server/get-dictionary"
import { Setup } from "@/components/utils"
import { Footer, Navbar } from "@/components/layout"

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
/* export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
} */

export default function HomeLayout({
  children,
  params,
}: // params,
{
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <>
      <Navbar currentLocale={params.lang} />
      {children}
      <Setup />
      <Footer currentLocale={params.lang} />
    </>
  )
}
