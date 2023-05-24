"use client"

import {
  ButtonHTMLAttributes,
  CSSProperties,
  ForwardedRef,
  forwardRef,
  RefObject,
} from "react"
import {
  AriaButtonProps,
  useButton,
  mergeProps,
  useFocusRing,
} from "react-aria"
import styles from "./Button.module.css"

const ButtonRef = (
  props: AriaButtonProps<"button"> & {
    corner?: "capsule" | "rounded"
    theme?: "reddish" | "blueish" | "none"
    transparency?: boolean
    style?: CSSProperties
    className?: string
    overrideType?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  },
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const {
    corner,
    theme,
    style,
    className,
    transparency,
    overrideType,
    ...rest
  } = props
  const { buttonProps } = useButton(rest, ref as RefObject<HTMLButtonElement>)
  const { focusProps, isFocusVisible } = useFocusRing()

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      type={overrideType ?? "button"}
      className={`${theme !== "none" ? styles.base : ""} ${
        transparency ? styles.transparency : ""
      } ${corner ? styles[corner] : ""} ${
        theme === "none" ? "" : theme ? styles[theme] : styles.default
      } ${props.isDisabled ? styles.disabled : ""} ${
        theme !== "none" && !props.isDisabled ? styles.box_shadow : ""
      } ${isFocusVisible ? styles.focus_ring : ""} ${className ?? ""}`}
      style={style}
    >
      {rest.children}
    </button>
  )
}

const Button = forwardRef(ButtonRef)

export default Button
