import { WalletList } from "@/components/wallt-list"
import { WithLocaleParam } from "@/i18n-config"
import { getUser } from "@/utils/server/auth"
import { cookies } from "next/headers"

export default async function Page({ params }: WithLocaleParam) {
  const { lang } = params

  let user = null
  let statusCode = 0
  let networkError = false
  let wallets: Array<SerializedWallet> | null = null

  try {
    user = await getUser(cookies())
    console.log(user)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/get_wallets/4/-2`,
      {
        headers: { Cookie: cookies().toString() },
        credentials: "include",
        method: "GET",
      }
    )
    statusCode = response.status
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    networkError = false
    const as_json = await response.json()
    wallets = as_json
  } catch (error) {
    console.error(error)
    networkError = true
    wallets = null
  }

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
                    (accumulator, w) => accumulator + Number(w.balance),
                    0
                  )
                  .toFixed(2)
              : "0"}
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
