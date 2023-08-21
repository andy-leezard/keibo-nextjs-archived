import { ButtonHTMLAttributes } from "react"

export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  orientation?: "inline" | "vertical"
}

export type TButtonWithEffects = TButton & {
  /** Selected item */
  focused?: boolean
  withShadow?: boolean
}

export type TButtonWithTheme = TButtonWithEffects & {
  /** Conditionally use neutral theme */
  neutral?:boolean
}
