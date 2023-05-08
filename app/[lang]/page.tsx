import Image from "next/image"
import { getDictionary } from "./dictionaries"

// You now have access to the current locale
// e.g. /en-US/products -> `lang` is "en-US"

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
