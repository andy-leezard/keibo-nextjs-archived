"use client"

import { ForwardedRef, RefObject, forwardRef } from "react"
import type { AriaTextFieldProps } from "react-aria"
import { useTextField } from "react-aria"
import styles from "./InputField.module.css"
import { Label, Wrapper } from "../shared"

// eslint-disable-next-line react/display-name
const TextField = forwardRef(
  (
    props: AriaTextFieldProps &
      Partial<WithChildren> & {
        width?: number
        maxWidth?: number
      },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { label } = props
    const { children, width, maxWidth, ...rest } = props
    const { labelProps, inputProps, descriptionProps, errorMessageProps } =
      useTextField(rest, ref as RefObject<HTMLInputElement>)

    return (
      <Wrapper
        style={{
          ...(width ? { width: `${width}px` } : {}),
          ...(maxWidth ? { maxWidth: `${maxWidth}px` } : {}),
        }}
      >
        {label ? <Label {...labelProps}>{label}</Label> : <></>}
        <div className={`${styles.input_group} ${styles.text_input_group}`}>
          <input
            {...inputProps}
            ref={ref}
            style={
              props.children
                ? {
                    borderRight: "none",
                  }
                : {}
            }
          />
          {props.children ?? <></>}
        </div>
        {props.description && (
          <div {...descriptionProps} style={{ fontSize: 12 }}>
            {props.description}
          </div>
        )}
        {props.errorMessage && (
          <div {...errorMessageProps} style={{ color: "red", fontSize: 12 }}>
            {props.errorMessage}
          </div>
        )}
      </Wrapper>
    )
  }
)

export default TextField
