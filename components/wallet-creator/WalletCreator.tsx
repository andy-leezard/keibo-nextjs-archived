"use client"

import { WithLocale } from "@/i18n-config"
import { useMemo, useReducer } from "react"
import { indexIsValidForArray } from "@/utils/client"
import { display_messages } from "./constants"
import {
  Category,
  WalletProvider,
  AssetSelection,
  MetadataCreator,
} from "./components"
import {
  INITIAL_WALLET_CREATION_CONTEXT,
  WalletCreationContext,
  reducer,
} from "./context"

type WalletCreatorProps = WithLocale
// TODO : Add histories backwards.

const WalletCreator = ({ currentLocale }: WalletCreatorProps) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_WALLET_CREATION_CONTEXT)
  const { category, provider, asset } = state
  const step = useMemo(() => {
    if (!category) return 0
    if (!provider) return 1
    if (!asset) return 2
    return 3
  }, [category, provider, asset])

  return (
    <WalletCreationContext.Provider value={{ state, dispatch }}>
      <div className="flex flex-col rounded-lg p-4 m-auto">
        {/* <div className={styles.icon_container}>
        <FaWallet size={18} />
      </div> */}
        {indexIsValidForArray(display_messages, step) ? (
          <span className="text-center text-xl font-semibold">
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
        <span className="text-center">{step + 1}/4</span>
        {/* <input className={styles.input} type="text" placeholder=""/> */}
      </div>
    </WalletCreationContext.Provider>
  )
}

export default WalletCreator
