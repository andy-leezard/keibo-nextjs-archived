import { Locale } from "@/i18n-config"
import { getDictionary } from "@/utils/server-only/get-dictionary"

type PageProps = {
  params: { lang: Locale }
  searchParams: SearchParams
}

export default async function Page({ params, searchParams }: PageProps) {
  const dict = await getDictionary(params.lang) // en
  return (
    <main style={{ display: "flex", flex: 1 }}>
      <span>{dict.Home.title}</span>
    </main>
  )
}
