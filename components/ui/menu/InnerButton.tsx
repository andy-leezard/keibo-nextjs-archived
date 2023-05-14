"use client"

import { ForwardedRef, RefObject, forwardRef } from "react"
import {
  useButton,
  useFocusRing,
  mergeProps,
  AriaButtonProps,
} from "react-aria"
import styles from "./InnerButton.module.css"

interface ButtonProps extends AriaButtonProps {
  isPressed: boolean
}

// eslint-disable-next-line react/display-name
export const InnerButton = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    let { buttonProps, isPressed } = useButton(
      props,
      ref as RefObject<HTMLButtonElement>
    )
    let { focusProps, isFocusVisible } = useFocusRing()

    return (
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={`${styles.menu_button} ${
          props.isDisabled
            ? styles.disabled
            : props.isPressed || isPressed
            ? styles.pressed
            : ""
        } ${isFocusVisible ? styles.focus_ring : ""}`}
      >
        {props.children}
      </button>
    )
  }
)
