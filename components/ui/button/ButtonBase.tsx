"use client"

import cn from "classnames"
import { TButton } from "./types"
import styled from "styled-components"

const Base = styled.button`
  outline: none;
`

const Button = (props: TButton) => {
  const {
    type,
    children,
    className,
    orientation = "inline",
    ...buttonProps
  } = props
  const classname = cn(
    className,
    "relative items-center justify-center appearance-none font-bold",
    {
      // "inline-flex": orientation === "inline",
      "flex flex-col": orientation === "vertical",
      "cursor-not-allowed": Boolean(props.disabled),
      "cursor-pointer": !props.disabled,
    }
  )

  return (
    <Base type={type ?? "button"} className={classname} {...buttonProps}>
      {children}
    </Base>
  )
}

export default Button
