"use client"

import { useWalletContext } from "@/contexts"
import Skeleton from "../ui/skeleton/Skeleton"

type WalletInfoProps = {}

const WalletInfo = (props: WalletInfoProps) => {
  const { wallet } = useWalletContext()
  console.log(wallet)
  return (
    <>
      <div className="inline-flex bg-zinc-50 p-4 dark:bg-zinc-900">
        <Skeleton>
          <h1 className="text-3xl font-bold">
            {wallet ? wallet.name : ""} ({wallet ? wallet.category : ""})
          </h1>
        </Skeleton>
      </div>
      <pre>{JSON.stringify(wallet, null, 4)}</pre>
    </>
  )
}

export default WalletInfo
