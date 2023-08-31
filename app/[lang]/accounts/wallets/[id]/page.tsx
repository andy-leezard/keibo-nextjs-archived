import { Unauthorized, UncaughtError } from "@/components/placeholders"
import { Transactions } from "@/components/transactions"
import WalletInfo from "@/components/wallet/WalletInfo"
import { WalletProvider } from "@/contexts/WalletContext"
import { WithLocaleParam } from "@/i18n-config"
import { getWallet } from "@/utils/common/wallet"
import { cookies } from "next/headers"

type PageProps = WithLocaleParam<{
  id: string
}>

export default async function Page({ params }: PageProps) {
  const { lang, id: wallet_id } = params
  const {
    statusCode,
    networkError,
    data: wallet,
  } = await getWallet({
    wallet_id,
    cookie: cookies(),
  })

  return (
    <WalletProvider
      statusCode={statusCode}
      networkError={networkError}
      initial_wallet={wallet}
    >
      <div className="flex flex-1 flex-col">
        {statusCode === 401 || statusCode === 403 ? (
          <Unauthorized currentLocale={lang} statusCode={statusCode} />
        ) : wallet ? (
          <>
            <WalletInfo />
            <Transactions wallet_id={wallet_id} currentLocale={lang} />
          </>
        ) : (
          <UncaughtError currentLocale={lang} statusCode={statusCode} />
        )}
      </div>
    </WalletProvider>
  )
}
