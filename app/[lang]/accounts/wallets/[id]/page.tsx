import { Wallet } from "@/components/wallet"
import { WithLocaleParam } from "@/i18n-config"

type PageProps = WithLocaleParam<{
  id: string
}>

export default function Page({ params }: PageProps) {
  const { lang, id } = params

  return (
    <div className="flex flex-1 flex-col">
      {/* <div className="flex flex-1 p-4">
        <div className="flex flex-2 flex-col">
          <h2>Estimated Balance</h2>
        </div>
        <div className="flex flex-1 flex-col"></div>
      </div> */}
      {/* <WalletCreator currentLocale={params.lang} /> */}
      <Wallet currentLocale={lang} id={id} />
    </div>
  )
}
