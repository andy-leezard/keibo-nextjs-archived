"use client"

import { ForwardedRef, RefObject, forwardRef } from "react"
import { AriaNumberFieldProps, useLocale, useNumberField } from "react-aria"
import styles from "./InputField.module.css"
import { Label, Wrapper } from "../shared"
import { useNumberFieldState } from "react-stately"
import Button from "../button"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import { WithLocale } from "@/i18n-config"

// eslint-disable-next-line react/display-name
const NumberField = forwardRef(
  (
    props: WithLocale &
      AriaNumberFieldProps & {
        prefix?: string
        suffix?: string
        width?: number
        maxWidth?: number
      },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { label } = props
    const { prefix, suffix, width, maxWidth, currentLocale, ...rest } = props
    const state = useNumberFieldState({ ...rest, locale: currentLocale })
    const {
      labelProps,
      groupProps,
      inputProps,
      incrementButtonProps,
      decrementButtonProps,
    } = useNumberField(rest, state, ref as RefObject<HTMLInputElement>)

    return (
      <Wrapper
        style={{
          ...(width ? { width: `${width}px` } : {}),
          ...(maxWidth ? { maxWidth: `${maxWidth}px` } : {}),
        }}
      >
        {label ? <Label {...labelProps}>{label}</Label> : <></>}
        <div className={styles.input_group} {...groupProps}>
          {props.prefix ? <span>{props.prefix}</span> : <></>}
          <input
            {...inputProps}
            ref={ref}
            style={{
              borderRight: "none",
            }}
          />
          {props.suffix ? (
            <span style={{ marginRight: "0.5rem" }}>{props.suffix}</span>
          ) : (
            <></>
          )}
          <div className={styles.number_button_container}>
            <Button {...incrementButtonProps} theme="none">
              <BiChevronUp />
            </Button>
            <Button {...decrementButtonProps} theme="none">
              <BiChevronDown />
            </Button>
          </div>
        </div>
      </Wrapper>
    )
  }
)

export default NumberField
