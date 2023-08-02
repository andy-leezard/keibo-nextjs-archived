import { UnderConstruction } from "@/components/placeholders"
import { WithLocaleParam } from "@/i18n-config"

export default function Page({ params }: WithLocaleParam) {
  const { lang } = params

  return (
    <div className="m-auto">
      <UnderConstruction currentLocale={lang} />
    </div>
  )
}
