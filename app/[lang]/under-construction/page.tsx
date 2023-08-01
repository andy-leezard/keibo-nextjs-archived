"use client"

import { UnderConstruction } from "@/components/placeholders"
import { Locale } from "@/i18n-config"

type PageProps = {
  params: { lang: Locale }
  searchParams: SearchParams
}

export default function Page({ params }: PageProps) {
  const { lang } = params
  return (
    <main className="m-auto">
      <UnderConstruction currentLocale={lang} />
    </main>
  )
}
