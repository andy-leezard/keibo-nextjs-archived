import { Wallet } from "@/components/wallet"
import WalletCreator from "@/components/wallet-creator"
import { WithLocaleParam } from "@/i18n-config"

type WithWalletParam = {
  params: {
    id: string
  }
}

export default function Page({ params }: WithLocaleParam & WithWalletParam) {
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
