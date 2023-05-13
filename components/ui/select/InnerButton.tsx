// Button.tsx
import React, { ButtonHTMLAttributes, DOMAttributes, ForwardedRef } from "react"
import styles from "./InnerButton.module.css"

interface ButtonProps {
  ariaProps: DOMAttributes<FocusableElement> & ButtonHTMLAttributes<HTMLButtonElement>
  children: React.ReactNode
  isOpen?: boolean
  isFocusVisible?: boolean
}

const InnerButtonRef = (
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

const InnerButton = React.forwardRef<HTMLButtonElement, ButtonProps>(InnerButtonRef)

export default InnerButton
