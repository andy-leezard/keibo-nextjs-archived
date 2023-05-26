import { PDictionary } from "@/i18n-config"
import { ReactNode } from "react"

export type TWalletCategory = {
  value: WalletConstructor["category"]
  image?: ReactNode
  display_name: PDictionary
  description?: PDictionary
}

export type FilterableItem = {
  value: string
  image?: string | ReactNode
  display_name: string | PDictionary
  description?: PDictionary
}

export interface TWalletProvider extends FilterableItem {
  supported_categories: Array<Exclude<WalletConstructor["category"], "other">>
}

export type TAsset = FilterableItem & {
  symbol: string
  quantity: number
}
