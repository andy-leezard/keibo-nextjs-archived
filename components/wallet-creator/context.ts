"use client"

import { Context, Dispatch, createContext } from "react"
import { TAsset, TWalletCategory, TWalletProvider } from "./type"

export type WalletCreationContextInterface = {
  category: TWalletCategory | null
  provider: TWalletProvider | null
  asset: TAsset | null
}

export const INITIAL_WALLET_CREATION_CONTEXT: WalletCreationContextInterface = {
  category: null,
  provider: null,
  asset: null,
}

type Action =
  | { type: "UPDATE"; payload: Partial<WalletCreationContextInterface> }
  | { type: "SET_CAT"; payload: WalletCreationContextInterface["category"] }
  | {
      type: "SET_PROVIDER"
      payload: WalletCreationContextInterface["provider"]
    }
  | { type: "SET_ASSET"; payload: WalletCreationContextInterface["asset"] }
  | { type: "SET_ASSET_QUANTITY"; payload: number }
  | { type: "BACK" }

export function reducer(
  state: WalletCreationContextInterface,
  action: Action
): WalletCreationContextInterface {
  switch (action.type) {
    case "UPDATE":
      return { ...state, ...action.payload }
    case "SET_CAT":
      return { ...state, category: action.payload }
    case "SET_PROVIDER":
      return { ...state, provider: action.payload }
    case "SET_ASSET":
      return { ...state, asset: action.payload }
    case "SET_ASSET_QUANTITY":
      if (!state.asset) return state
      return { ...state, asset: { ...state.asset, quantity: action.payload } }
    case "BACK":
      if (state.asset) return { ...state, asset: null }
      if (state.provider) return { ...state, provider: null }
      if (state.category) return { ...state, category: null }
      return {
        ...state,
      }
    default:
      return state
  }
}

interface ContextInterface {
  state: WalletCreationContextInterface
  dispatch: Dispatch<Action>
}

export const WalletCreationContext = createContext<ContextInterface | null>(
  null
) as Context<ContextInterface>
