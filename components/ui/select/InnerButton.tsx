// Button.tsx
import {
  ButtonHTMLAttributes,
  DOMAttributes,
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
} from "react"
import styles from "./innerButton.module.css"

type ButtonProps = PropsWithChildren & {
  ariaProps: DOMAttributes<FocusableElement> &
    ButtonHTMLAttributes<HTMLButtonElement>
  isOpen?: boolean
  isFocusVisible?: boolean
}

const InnerButtonRef = (
  { children, isOpen = false, isFocusVisible = false, ariaProps }: ButtonProps,
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

const InnerButton = forwardRef<HTMLButtonElement, ButtonProps>(InnerButtonRef)

export default InnerButton
