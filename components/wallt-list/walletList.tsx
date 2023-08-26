"use client"

import { useEffect, useState } from "react"
import { ColorfulSpinner } from "../ui/loaders"
import { Unauthorized, UncaughtError } from "../placeholders"
import { WithLocale } from "@/i18n-config"
import Image from "next/image"
import classNames from "classnames"
import Link from "next/link"

type WalletListProps = WithLocale & {
  statusCode: number
  networkError: boolean
  wallets: Array<SerializedWallet> | null
}

export default function WalletList({
  currentLocale,
  statusCode,
  networkError,
  wallets,
}: WalletListProps) {
  /* useEffect(() => {
    const getWallets = async () => {}
    getWallets()
    return () => {}
  }, []) */

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
