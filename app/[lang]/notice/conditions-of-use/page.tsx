import { Locale } from "@/i18n-config"

type PageProps = {
  params: { lang: Locale }
  searchParams: SearchParams
}

export default function Page({ params, searchParams }: PageProps) {
  return (
    <main style={{ display: "flex", flex: 1 }}>
      Conditions of Use
    </main>
  )
}
