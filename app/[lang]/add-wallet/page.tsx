import { Locale } from "@/i18n-config"
import WalletCreator from "@/components/wallet-creator/WalletCreator"
// import { getDictionary } from "@/utils/server/get-dictionary"

type PageProps = {
  params: { lang: Locale }
  searchParams: SearchParams
}

export default function Page({ params, searchParams }: PageProps) {
  // const dict = await getDictionary(params.lang)
  return (
    <main style={{ display: "flex", flex: 1 }}>
      <WalletCreator
        currentLocale={params.lang}
      />
    </main>
  )
}
