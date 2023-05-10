// Button.tsx
import React, { ButtonHTMLAttributes, DOMAttributes, ForwardedRef } from "react"
import styles from "./innerButton.module.css"

interface ButtonProps {
  ariaProps: DOMAttributes<any> & ButtonHTMLAttributes<HTMLButtonElement>
  children: React.ReactNode
  isOpen?: boolean
  isFocusVisible?: boolean
}

// eslint-disable-next-line react/display-name
const AlternativeButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      isOpen = false,
      isFocusVisible = false,
      ariaProps,
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {

    const { isFocused, isSelected, ...rest } = ariaProps as any

    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        className={`${styles.inner_button} ${isOpen ? styles.isOpen : ""} ${
          isFocusVisible ? styles.isFocusVisible : ""
        }`}
      >
        {children}
      </button>
    )
  }
)

export default AlternativeButton
