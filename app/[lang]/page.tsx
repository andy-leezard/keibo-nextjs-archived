import { Locale } from "@/i18n-config"
import BanalceSynthesis from "@/components/balanceSynthesis"

type PageProps = {
  params: { lang: Locale }
  searchParams: SearchParams
}

export default function Page({ params, searchParams }: PageProps) {
  return (
    <>
      <main className="relative flex flex-1 flex-col">
        <BanalceSynthesis currentLocale={params.lang} />
      </main>
    </>
  )
}
