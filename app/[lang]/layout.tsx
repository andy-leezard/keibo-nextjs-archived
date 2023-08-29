import { PropsWithChildren } from "react"
import { WithLocaleParam } from "../../i18n-config"
import type { Metadata, ResolvingMetadata } from "next/types"
import { getDictionary } from "@/utils/server/get-dictionary"
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
type HomeLayoutProps = WithLocaleParam & PropsWithChildren

export default function HomeLayout({ children, params }: HomeLayoutProps) {
  return (
    <>
      <Navbar currentLocale={params.lang} />
      {children}
      <Footer currentLocale={params.lang} />
    </>
  )
}
