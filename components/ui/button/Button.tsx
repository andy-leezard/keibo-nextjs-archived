"use client"

import { ForwardedRef, forwardRef, RefObject } from "react"
import {
  AriaButtonProps,
  useButton,
  mergeProps,
  useFocusRing,
} from "react-aria"
import styles from "./Button.module.css"

const ButtonRef = (
  props: AriaButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const { buttonProps } = useButton(props, ref as RefObject<HTMLButtonElement>)
  const { focusProps, isFocusVisible } = useFocusRing()

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={`${styles.button} ${isFocusVisible ? styles.focus_ring : ""}`}
    >
      {props.children}
    </button>
  )
}

const Button = forwardRef(ButtonRef)

export default Button
