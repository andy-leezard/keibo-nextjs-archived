"use client"

import { useEffect, useState } from "react"
import { Unauthorized, UncaughtError } from "../placeholders"
import { WithLocale } from "@/i18n-config"
import { ColorfulSpinner } from "../ui/loaders"

type WalletProps = WithLocale & {
  id: string
}

export default function Wallet({ currentLocale, id }: WalletProps) {
  const [statusCode, setStatusCode] = useState(0)
  const [networkError, setNetworkError] = useState(false)
  const [wallet, setWallet] = useState<SerializedWallet | null>(null)

  useEffect(() => {
    const getWallet = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/wallet/${id}/`,
          {
            credentials: "include",
            method: "GET",
          }
        )
        setStatusCode(response.status)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        setNetworkError(false)
        const as_json = await response.json()
        setWallet(as_json)
      } catch (error) {
        console.error(error)
        setNetworkError(true)
        setWallet(null)
      }
    }
    getWallet()
  }, [id])

  return (
    <>
      {networkError ? (
        <UncaughtError currentLocale={currentLocale} />
      ) : statusCode === 401 || statusCode === 403 ? (
        <Unauthorized currentLocale={currentLocale} />
      ) : wallet ? (
        <>
          <div className="inline-flex bg-zinc-50 p-4 dark:bg-zinc-900">
            <h1 className="text-3xl font-bold">{wallet.name} ({wallet.category})</h1>
          </div>
          <pre>{JSON.stringify(wallet, null, 4)}</pre>
        </>
      ) : (
        <ColorfulSpinner />
      )}
    </>
  )
}
