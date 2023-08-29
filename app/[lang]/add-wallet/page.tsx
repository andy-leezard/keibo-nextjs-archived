import { WithLocaleParam } from "@/i18n-config"
import WalletCreator from "@/components/wallet-creator/WalletCreator"
// import { getDictionary } from "@/utils/server/get-dictionary"

type PageProps = WithLocaleParam

export default function Page({ params }: PageProps) {
  // const dict = await getDictionary(params.lang)
  return (
    <main style={{ display: "flex", flex: 1 }}>
      <WalletCreator currentLocale={params.lang} />
    </main>
  )
}
