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
}

/** export any type to declare this file */
export type GlobalModule = unknown
