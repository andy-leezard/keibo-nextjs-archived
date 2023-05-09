import { getDictionary } from "@/utils/get-dictionary"

type PageProps = {
  params: { lang: SupportedLanguage }
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
