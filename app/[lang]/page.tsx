import { Locale } from "@/i18n-config"
import { getDictionary } from "@/utils/server/get-dictionary"
import BanalceSynthesis from "@/components/balanceSynthesis"
import { Navbar } from "@/components/common"
import { Footer } from "@/components/layout"

type PageProps = {
  params: { lang: Locale }
  searchParams: SearchParams
}

export default async function Page({ params, searchParams }: PageProps) {
  const dict = await getDictionary(params.lang) // en
  return (
    <>
      <Navbar currentLocale={params.lang} />
      <main className="relative flex flex-1 flex-col">
        <BanalceSynthesis currentLocale={params.lang} />
      </main>
      <Footer currentLocale={params.lang} />
    </>
  )
}
