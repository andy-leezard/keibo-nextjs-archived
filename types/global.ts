import { ReactNode } from "react"

declare global {
  /** Layout */
  type SearchParams = { [key: string]: string | string[] | undefined }
  type WithSearchParams = { searchParams: SearchParams }

  /** Utils */
  type ValueOf<T> = T[keyof T]
  type PartiallyOptional<T, K extends keyof T> = Omit<T, K> &
    Partial<Pick<T, K>>
  type PartiallyRequired<T, K extends keyof T> = Omit<T, K> &
    Required<Pick<T, K>>
  type RequiredAttributes<T> = {
    [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K]
  }

  /** Undefined DOM Attributes */
  type FocusableElement = any

  /** auth session utils */
  type SerializedUser = {
    email: string
    first_name: string
    last_name: string
    id: number
  }
  type TWithSession = { user?: SerializedUser; isLoading: boolean; isFetching: boolean }

  /** React utils */
  type WithChildren = { children: ReactNode }

  /** Firestore */
  type FirestoreAccount = {
    access_token: string
    expires_at: number
    id_token: string
    provider: string // google
    provider_account_id: string
    scope: string
    token_type: string // bearer
    type: string // oauth
    user_id: string
  }
  type FirestoreUser = {
    email: string
    email_verified: null | boolean
    image: string
    name: string
  }
  type KeiboFirestoreUser = FirestoreUser & {
    /** uid of wallets on realtime database */
    last_activity?: string // ISODateString
    last_activity_unix?: number
    platform?: string // "web" | "ios" | "android"
    wallets?: string[]
  }

  type AssetCategory = "cash" | "equity" | "crypto" | "fund" | "other"
  /** Core */
  type FiatCurrency =
    | "usd"
    | "eur"
    | "krw"
    | "chf"
    | "gbp"
    | "jpy"
    | "rub"
    | "krw"
    | "cny"
    | "cad"
    | "inr"
  type WalletBase = {
    /**
     * Define the asset (which currency? which cryptocurrency?)
     * @example usd, eur, krw, jpy, bitcoin, ethereum...
     */
    asset: string
    /**
     * Define the platform (which bank? which crypto/stock platform?) and the name.
     * @example bnp-paribas | binance | coinbase | ledger-wallet | undetermined
     */
    provider: string

    name: string
    /** holding quantity */
    balance: number
  }
  type WalletConstructor = WalletBase & {
    category: AssetCategory
  }
  type SerializedWallet = WalletConstructor & {
    id: number
    is_public: boolean

    /**
     * int between 1 - 4 all included.
     *
     * Represents what role does the user have to the wallet
     *
     * 1: viewer
     * 2: editor
     * 3: manager (will be counted as co-property)
     * 4: owner
     */
    role: number

    val_usd?: number
  }
  type TGenericFetchResponse<T> = {
    statusCode: number
    networkError: boolean
    data: T | null
  }
  type SerializedTransaction = {
    id: string
    /** ex: tax, rent fees */
    category: string
    /** UID of the recipient Wallet */
    recipient: string
    /** UID of the recipient Wallet */
    sender: string
    confirmed_by_recipient: boolean
    confirmed_by_sender: boolean
    gross_amount: number
    net_amount: number
    transaction_fee: number
    /** unix millis */
    date: number
    description: string
  }
}

/** export any type to declare this file */
export type GlobalModule = unknown
