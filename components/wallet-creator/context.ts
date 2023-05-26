"use client"

import { createContext } from "react"
import { TAsset, TWalletCategory, TWalletProvider } from "./type"

export interface WalletCreationContextInterface {
  category: TWalletCategory | null
  provider: TWalletProvider | null
  asset: TAsset | null
}

interface ContextInterface extends WalletCreationContextInterface {
  update: <T extends keyof WalletCreationContextInterface>(
    key: T,
    payload: WalletCreationContextInterface[T]
  ) => void
}

export const WalletCreationContext = createContext<ContextInterface>({
  category: null,
  provider: null,
  asset: null,
  update: () => {},
})
