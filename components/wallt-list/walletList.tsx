"use client"

import { useEffect, useState } from "react"
import { ColorfulSpinner } from "../ui/loaders"
import { Unauthorized, UncaughtError } from "../placeholders"
import { WithLocale } from "@/i18n-config"
import Image from "next/image"
import classNames from "classnames"
import Link from "next/link"

type WalletListProps = WithLocale

export default function WalletList({ currentLocale }: WalletListProps) {
  const [statusCode, setStatusCode] = useState(0)
  const [networkError, setNetworkError] = useState(false)
  const [wallets, setWallets] = useState<Array<SerializedWallet> | null>(null)

  useEffect(() => {
    const getWallets = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/get_wallets/4/-2`,
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
        setWallets(as_json)
      } catch (error) {
        console.error(error)
        setNetworkError(true)
        setWallets(null)
      }
    }
    getWallets()
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/get_wallets/4/-2`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        // You can work with your data here
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
    return () => {}
  }, [])

  return (
    <>
      {networkError ? (
        <UncaughtError currentLocale={currentLocale} />
      ) : statusCode === 401 || statusCode === 403 ? (
        <Unauthorized currentLocale={currentLocale} />
      ) : wallets ? (
        <>
          {wallets.map((w, i) => {
            return (
              <Link
                key={i}
                href={`/accounts/wallets/${w.id}`}
                className={classNames(
                  "p-2 rounded-md flex flex-col items-center cursor-pointer",
                  "bg-zinc-200 dark:bg-zinc-700",
                  "hover:bg-zinc-300 dark:hover:bg-zinc-600"
                )}
              >
                {w.icon ? (
                  <Image
                    src={w.icon}
                    alt={w.name}
                    width={32}
                    height={32}
                    className="rounded-md"
                  />
                ) : (
                  <></>
                )}
                <p className="font-semibold">{w.name}</p>
              </Link>
            )
          })}
        </>
      ) : (
        <ColorfulSpinner />
      )}
    </>
  )
}
