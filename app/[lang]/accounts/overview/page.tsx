import { WalletList } from "@/components/wallt-list"
import { WithLocaleParam } from "@/i18n-config"
import { getServerWallets } from "@/utils-api/server/wallet/getServerWallets"
import { cookies } from "next/headers"

export default async function Page({ params }: WithLocaleParam) {
  const { lang } = params
  const {
    statusCode,
    networkError,
    data: wallets,
  } = await getServerWallets({
    target: 4,
    range: -2,
    cookie: cookies(),
  })

  return (
    <div className="flex flex-1 flex-col">
      <div className="inline-flex bg-zinc-50 p-4 dark:bg-zinc-900">
        <h1 className="text-3xl font-bold">Wallet Overview</h1>
      </div>
      <div className="flex p-4">
        <div className="flex flex-2 flex-col">
          <h2>
            Estimated Balance:{" "}
            {wallets
              ? wallets
                  .reduce(
                    (accumulator, w) => accumulator + Number(w.val_usd),
                    0
                  )
                  .toFixed(2)
              : "0"}$
          </h2>
        </div>
        <div className="flex flex-1 flex-col"></div>
      </div>
      <div className="flex flex-wrap p-4 gap-4">
        <WalletList
          currentLocale={lang}
          statusCode={statusCode}
          networkError={networkError}
          wallets={wallets}
        />
      </div>
    </div>
  )
}
