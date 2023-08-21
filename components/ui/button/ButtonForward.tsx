import { TButtonWithTheme } from "./types"
import cn from "classnames"
import styles from "./Button.module.css"
import Button from "./ButtonBase"

const ButtonForward = (props: TButtonWithTheme) => {
  const { children, className, withShadow, focused, neutral, ...buttonProps } =
    props
  const classname = cn(
    "focus:ring",
    {
      "bg-gray-200 dark:bg-gray-700": buttonProps.disabled,
      "text-black dark:text-white": !buttonProps.disabled && focused,
    },
    neutral
      ? {
          "bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800":
            !buttonProps.disabled && !focused,
          "bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700":
            !buttonProps.disabled && focused,
        }
      : {
          [styles.shadow_forward]: Boolean(withShadow),
          "bg-sky-50 hover:bg-sky-100 dark:bg-sky-900 dark:hover:bg-sky-800":
            !buttonProps.disabled && !focused,
          "bg-sky-200 hover:bg-sky-300 dark:bg-sky-800 dark:hover:bg-sky-700":
            !buttonProps.disabled && focused,
        },
    className
  )
  return (
    <Button className={classname} {...buttonProps}>
      {children}
    </Button>
  )
}

export default ButtonForward
