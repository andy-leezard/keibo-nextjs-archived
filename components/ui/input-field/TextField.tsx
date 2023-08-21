"use client"

import {
  DetailedHTMLProps,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
} from "react"
import cn from "classnames"

// eslint-disable-next-line react/display-name
const TextField = forwardRef(
  (
    props: Omit<
      DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      "onChange"
    > & {
      onChange?: (str: string) => void
      label?: string
      width?: number
      maxWidth?: number
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const {
      children,
      label,
      width,
      maxWidth,
      className,
      onChange,
      ...inputProps
    } = props

    return (
      <div
        className="relative flex flex-col flex-1"
        style={{
          ...(width ? { width: `${width}px` } : {}),
          ...(maxWidth ? { maxWidth: `${maxWidth}px` } : {}),
        }}
      >
        {label ? <label className="block text-left text-sm">{label}</label> : <></>}
        <div
          className={cn(
            "relative inline-flex items-center flex-row overflow-hidden mt-1 px-1.5 py-2 gap-2 rounded-md",
            "bg-slate-100 dark:bg-slate-700"
          )}
        >
          <input
            {...inputProps}
            onChange={(e) => {
              if (onChange) {
                onChange(e.target.value)
              }
            }}
            className={cn(
              "appearance-none flex-1 border-none border-transparent focus:ring-0 rounded-md",
              "bg-slate-200 focus:bg-slate-300 dark:bg-slate-800 dark:focus:bg-slate-900",
              className
            )}
            ref={ref}
          />
          {props.children ?? <></>}
        </div>
      </div>
    )
  }
)

export default TextField
