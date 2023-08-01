import { Locale } from "@/i18n-config"
import { getDictionary } from "@/utils/server/get-dictionary"

type PageProps = {
  params: { lang: Locale }
  searchParams: SearchParams
}

export default function Page({ params, searchParams }: PageProps) {
  return (
    <main style={{ display: "flex", flex: 1 }}>
      Notice
    </main>
  )
}
