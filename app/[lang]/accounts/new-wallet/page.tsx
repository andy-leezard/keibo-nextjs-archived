import WalletCreator from "@/components/wallet-creator"
import { WithLocaleParam } from "@/i18n-config"

export default function Page({ params }: WithLocaleParam) {
  const { lang } = params

  return (
    <div className="flex flex-1 flex-col">
      <div className="inline-flex bg-zinc-50 p-4 dark:bg-zinc-900">
        <h1 className="text-3xl font-bold">New wallet</h1>
      </div>
      {/* <div className="flex flex-1 p-4">
        <div className="flex flex-2 flex-col">
          <h2>Estimated Balance</h2>
        </div>
        <div className="flex flex-1 flex-col"></div>
      </div> */}
      <WalletCreator currentLocale={params.lang} />
    </div>
  )
}
