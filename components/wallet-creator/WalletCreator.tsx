"use client"

import { WithLocale } from "@/i18n-config"
import Warning from "../warning"
import styles from "./WalletCreator.module.css"
import { useMemo, useState } from "react"
import { indexIsValidForArray } from "@/utils/client"
import { display_messages } from "./constants"
import {
  Category,
  WalletProvider,
  AssetSelection,
  MetadataCreator,
} from "./components"
import {
  WalletCreationContext,
  WalletCreationContextInterface,
} from "./context"

type WalletCreatorProps = WithLocale & WithSession & {}
// TODO : Add histories backwards.

const WalletCreator = ({ currentLocale, session }: WalletCreatorProps) => {
  const [category, setCategory] =
    useState<WalletCreationContextInterface["category"]>(null)
  const [provider, setProvider] =
    useState<WalletCreationContextInterface["provider"]>(null)
  const [asset, setAsset] =
    useState<WalletCreationContextInterface["asset"]>(null)

  const update = <T extends keyof WalletCreationContextInterface>(
    key: T,
    payload: WalletCreationContextInterface[T]
  ) => {
    switch (key) {
      case "category":
        setCategory(payload as WalletCreationContextInterface["category"])
        break
      case "provider":
        setProvider(payload as WalletCreationContextInterface["provider"])
        break
      case "asset":
        setAsset(payload as WalletCreationContextInterface["asset"])
        break
      default:
        break
    }
  }

  const step = useMemo(() => {
    if (!category) return 0
    if (!provider) return 1
    if (!asset) return 2
    return 5
  }, [category, provider, asset])

  if (!session) {
    return <Warning currentLocale={currentLocale} />
  }
  return (
    <WalletCreationContext.Provider
      value={{ category, provider, asset, update }}
    >
      <div className={styles.wrapper}>
        {/* <div className={styles.icon_container}>
        <FaWallet size={18} />
      </div> */}
        {indexIsValidForArray(display_messages, step) ? (
          <span style={{ textAlign: "center" }}>
            {display_messages[step][currentLocale]}
          </span>
        ) : (
          <></>
        )}
        {!step ? (
          <Category currentLocale={currentLocale} />
        ) : category && !provider ? (
          <WalletProvider currentLocale={currentLocale} />
        ) : category && provider && !asset ? (
          <AssetSelection currentLocale={currentLocale} />
        ) : category && provider && asset ? (
          <MetadataCreator currentLocale={currentLocale} />
        ) : (
          <></>
        )}
        <span style={{ textAlign: "center" }}>{step}/5</span>
        {/* <input className={styles.input} type="text" placeholder=""/> */}
      </div>
    </WalletCreationContext.Provider>
  )
}

export default WalletCreator
