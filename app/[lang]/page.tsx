import { WithLocaleParam } from "@/i18n-config"
import BanalceSynthesis from "@/components/balanceSynthesis"

type PageProps = WithLocaleParam & WithSearchParams

export default function Page({ params, searchParams }: PageProps) {
  return (
    <>
      <main className="relative flex flex-1 flex-col">
        <BanalceSynthesis currentLocale={params.lang} />
      </main>
    </>
  )
}
