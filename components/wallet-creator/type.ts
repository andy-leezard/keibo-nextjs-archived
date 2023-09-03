import { PDictionary } from "@/i18n-config"

export type TWalletCategory = {
  value: AssetCategory
  display_name: PDictionary
  description?: PDictionary
}

export type FilterableItem = {
  value: string
  image?: string
  display_name: string | PDictionary
  description?: PDictionary
}

export interface TWalletProvider extends FilterableItem {
  supported_categories: Array<Exclude<AssetCategory, "other">>
}

export type TAsset = FilterableItem & {
  symbol: string
  quantity: number
}
