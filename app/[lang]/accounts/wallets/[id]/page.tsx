import { Unauthorized, UncaughtError } from "@/components/placeholders"
import { Transactions } from "@/components/transactions"
import { WithLocaleParam } from "@/i18n-config"
import { cookies } from "next/headers"

type PageProps = WithLocaleParam<{
  id: string
}>

export default async function Page({ params }: PageProps) {
  const { lang, id: wallet_id } = params

  let statusCode = 0
  let networkError = false
  let wallet: SerializedWallet | null = null

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/wallet/${wallet_id}/`,
      {
        headers: { Cookie: cookies().toString() },
        method: "GET",
      }
    )
    statusCode = response.status
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    networkError = false
    const as_json = await response.json()
    wallet = as_json
  } catch (error) {
    console.error(error)
    networkError = true
    wallet = null
  }

  return (
    <div className="flex flex-1 flex-col">
      {statusCode === 401 || statusCode === 403 ? (
        <Unauthorized currentLocale={lang} statusCode={statusCode} />
      ) : wallet ? (
        <>
          <div className="inline-flex bg-zinc-50 p-4 dark:bg-zinc-900">
            <h1 className="text-3xl font-bold">
              {wallet.name} ({wallet.category})
            </h1>
          </div>
          <pre>{JSON.stringify(wallet, null, 4)}</pre>
          <Transactions wallet_id={wallet_id} />
        </>
      ) : (
        <UncaughtError currentLocale={lang} statusCode={statusCode} />
      )}
    </div>
  )
}
