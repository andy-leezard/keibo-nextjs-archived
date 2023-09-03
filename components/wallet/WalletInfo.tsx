"use client"

import { useWalletContext } from "@/contexts"
import Skeleton from "../ui/skeleton/Skeleton"
import { PDictionary, WithLocale, t } from "@/i18n-config"
import Image from "next/image"
import { fiatIconMap, assetCategoryIconMap } from "@/constants/client/icons"
import { providerIconMap } from "@/constants/wallet-providers"
import { isNullish } from "@/utils"
import { assetMetaMap } from "@/constants/assets"

type WalletInfoProps = WithLocale & {}

const roleNames: Array<PDictionary> = [
  {
    en: "Viewer",
    fr: "Viewer",
    ko: "뷰어",
  },
  {
    en: "Editor",
    fr: "Éditeur",
    ko: "에디터",
  },
  {
    en: "Manager",
    fr: "Manager",
    ko: "매니저",
  },
  {
    en: "Owner",
    fr: "Propriétaire",
    ko: "소유자",
  },
]

const WalletInfo = ({ currentLocale }: WalletInfoProps) => {
  const { wallet } = useWalletContext()

  return (
    <>
      <div className="flex ">
        <Skeleton className="inline-flex flex-1 bg-zinc-50 dark:bg-zinc-900">
          <h1 className="text-3xl font-bold mb-0">
            {wallet ? wallet.name : ""} ({wallet ? wallet.category : ""})
          </h1>
        </Skeleton>
        <Skeleton className="flex flex-1 justify-end gap-2 min-w-250">
          {wallet?.provider && providerIconMap.has(wallet.provider) ? (
            <Image
              width={50}
              height={50}
              src={providerIconMap.get(wallet.provider)!}
              alt={t(currentLocale, wallet.provider)}
              style={{ borderRadius: "1rem" }}
            />
          ) : (
            <></>
          )}
          {wallet?.category && assetCategoryIconMap.has(wallet.category) ? (
            assetCategoryIconMap.get(wallet.category)!({ size: 50 })
          ) : (
            <></>
          )}
          {wallet?.asset_icon ? (
            <Image
              width={50}
              height={50}
              src={wallet.asset_icon}
              alt={t(currentLocale, wallet.provider)}
              style={{ borderRadius: "1rem" }}
            />
          ) : wallet?.asset && fiatIconMap.has(wallet.asset) ? (
            fiatIconMap.get(wallet.asset)!({ size: 50 })
          ) : (
            <></>
          )}
        </Skeleton>
      </div>
      <Skeleton>
        {!isNullish(wallet?.balance) ? (
          <span className="text-2xl font-bold mt-0">
            {wallet!.balance.toFixed(2)}
            {wallet?.asset && assetMetaMap.has(wallet.asset)
              ? assetMetaMap.get(wallet.asset)!.symbol
              : ""}
          </span>
        ) : (
          <></>
        )}
        {!isNullish(wallet?.val_usd) ? (
          <span className="text-base font-bold mt-0">
            {" "}({wallet!.val_usd!.toFixed(2)}
            {"USD"})
          </span>
        ) : (
          <></>
        )}
      </Skeleton>
      <Skeleton className="inline-flex bg-zinc-50 dark:bg-zinc-900">
        <h2 className="text-lg font-bold mt-0">
          {wallet?.role
            ? t(currentLocale, {
                en: `Access authorized as: ${t(
                  currentLocale,
                  roleNames.at(wallet.role - 1)
                )}`,
                fr: `Accès autorisé comme: ${t(
                  currentLocale,
                  roleNames.at(wallet.role - 1)
                )}`,
                ko: `권한: ${t(currentLocale, roleNames.at(wallet.role - 1))}`,
              })
            : ""}{" "}
          {/* wallet. */}
        </h2>
      </Skeleton>
    </>
  )
}

export default WalletInfo
