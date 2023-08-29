"use client"

import { UnderConstruction } from "@/components/placeholders"
import { WithLocaleParam } from "@/i18n-config"

type PageProps = WithLocaleParam & WithSearchParams

export default function Page({ params }: PageProps) {
  const { lang } = params
  return (
    <main className="m-auto">
      <UnderConstruction currentLocale={lang} />
    </main>
  )
}
