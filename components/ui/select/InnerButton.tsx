import {
  ButtonHTMLAttributes,
  DOMAttributes,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from "react"
import styles from "./innerButton.module.css"

interface ButtonProps {
  isOpen?: boolean
  isFocusVisible?: boolean
}

type InnerButtonRefProps<T> = {
  ariaButtonProps: T
  buttonProps: ButtonProps
  children: ReactNode
}

const InnerButtonRef = <T,>(
  props: InnerButtonRefProps<T>,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  return (
    <button
      ref={ref}
      className={`${styles.inner_button} ${
        props.buttonProps.isOpen ? styles.isOpen : ""
      } ${props.buttonProps.isFocusVisible ? styles.isFocusVisible : ""}`}
    >
      {props.children}
    </button>
  )
}

/* type GenericComponentRenderFunction<T> = ForwardRefRenderFunction<
  InnerButtonRefProps<T> & HTMLButtonElement
> */

// eslint-disable-next-line react/display-name
const InnerButton = forwardRef((props: any, ref: any) => (
  <InnerButtonRef<ButtonHTMLAttributes<HTMLButtonElement> & DOMAttributes<any>>
    {...props}
    ref={ref}
  />
))

/* 
const InnerButton = <T,>(
  props: InnerButtonRefProps<T> & { ref: ForwardedRef<HTMLButtonElement> },
) => {
  const Component = forwardRef(InnerButtonRef<T>)
  const { ref, ...rest } = props
  return <Component {...rest} ref={props.ref} />
}
*/

export default InnerButton
