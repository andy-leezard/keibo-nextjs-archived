import Form from "@/components/auth-form"
import { Locale } from "@/i18n-config"

type PageProps = {
  params: { lang: Locale }
  searchParams: SearchParams
}

export default function Page({ params, searchParams }: PageProps) {
  return (
    <main style={{ display: "flex", flex: 1 }}>
      <Form currentLocale={params.lang} />
    </main>
  )
}
