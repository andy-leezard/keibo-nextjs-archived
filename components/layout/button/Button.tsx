"use client"

import React from "react"
import { AriaButtonProps, useButton } from "react-aria"
import { useRef } from "react"
import styles from "./Button.module.css"

const Button = (props: AriaButtonProps<"button">) => {
  let ref = useRef<HTMLButtonElement>(null)
  let { buttonProps } = useButton(props, ref)
  let { children } = props
  return (
    <button className={styles.button} {...buttonProps} ref={ref}>
      {children}
    </button>
  )
}

export default Button
