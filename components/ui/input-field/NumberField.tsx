"use client"

import { ForwardedRef, RefObject, forwardRef } from "react"
import { AriaNumberFieldProps, useNumberField } from "react-aria"
import { useNumberFieldState } from "react-stately"
import { WithLocale } from "@/i18n-config"
import cn from "classnames"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"

// eslint-disable-next-line react/display-name
const NumberField = forwardRef(
  (
    props: WithLocale &
      AriaNumberFieldProps & {
        withButtons?: boolean
        prefix?: string
        suffix?: string
        width?: number
        maxWidth?: number
      },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const {
      prefix,
      suffix,
      width,
      maxWidth,
      currentLocale,
      withButtons,
      ...rest
    } = props
    const state = useNumberFieldState({ ...rest, locale: currentLocale })
    const {
      labelProps,
      groupProps,
      inputProps,
      incrementButtonProps,
      decrementButtonProps,
    } = useNumberField(rest, state, ref as RefObject<HTMLInputElement>)

    const { className, ...restOfInputProps } = inputProps

    return (
      <div
        className="relative flex flex-col flex-1"
        style={{
          ...(width ? { width: `${width}px` } : {}),
          ...(maxWidth ? { maxWidth: `${maxWidth}px` } : {}),
        }}
      >
        {props.label ? (
          <label className="block text-left text-sm" {...labelProps}>
            {props.label}
          </label>
        ) : (
          <></>
        )}
        <div
          className={cn(
            "relative inline-flex items-center flex-row overflow-hidden mt-1 px-1.5 py-2 gap-2 rounded-md",
            "bg-slate-100 dark:bg-slate-700"
          )}
          {...groupProps}
        >
          {props.prefix ? <span>{props.prefix}</span> : <></>}
          <input
            {...restOfInputProps}
            className={cn(
              "appearance-none flex-1 border-none border-transparent focus:ring-0 rounded-md",
              "bg-slate-200 focus:bg-slate-300 dark:bg-slate-800 dark:focus:bg-slate-900",
              className
            )}
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
          {withButtons ? (
            <div className="flex flex-col">
              <button
                className="w-6 flex justify-center min-h-12"
                type="button"
                {...incrementButtonProps}
              >
                <BiChevronUp />
              </button>
              <button
                className="w-6 flex justify-center min-h-12"
                type="button"
                {...decrementButtonProps}
              >
                <BiChevronDown />
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    )
  }
)

export default NumberField
