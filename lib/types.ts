import { ISODateString, Session } from "next-auth"
import { ReactNode } from "react"

declare global {
  /** Layout */
  type SearchParams = Record<string, string>
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

  /** Next auth utils */
  type WithSession = { session: Session | null }

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
    last_activity?: ISODateString
    last_activity_unix?: number
    platform?: string // "web" | "ios" | "android"
    wallets?: string[]
  }

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
  type WalletConstructor = {
    /**
     * Define the platform (which bank? which crypto/stock platform?) and the name.
     * @example bnp-paribas | binance | coinbase | ledger-wallet | undetermined
     */
    provider: string
    /**
     * Define the asset (which currency? which cryptocurrency?)
     * @example usd, eur, krw, jpy, bitcoin, ethereum...
     */
    asset_id: string
    asset_quantity: number
    category: "cash" | "equity" | "crypto" | "fund" | "other"
    display_name: string
    cash_input?: Partial<Record<FiatCurrency, number>>
    /**
     * people who have access to the wallet
     * @example { [user_uid:string]: 'admin' }
     */
    participants?: Partial<Record<string, "viewer" | "editor" | "admin">>
  }
  type Wallet = {
    uid: string

    // metadata
    created_at: ISODateString
    created_at_unix: number

    // ownership
    owner_id: string
  }
}

/** export any type to declare this file */
export type GlobalModule = unknown
