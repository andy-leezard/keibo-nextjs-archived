import { Locale } from "@/i18n-config"
import { getDictionary } from "@/utils/server/get-dictionary"

type PageProps = {
  params: { lang: Locale }
  searchParams: SearchParams
}

export default async function Page({ params, searchParams }: PageProps) {
  const dict = await getDictionary(params.lang) // en
  return (
    <main style={{ display: "flex", flex: 1 }}>
      Conditions of Use
    </main>
  )
}
