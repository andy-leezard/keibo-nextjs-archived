import { TButtonWithTheme } from "./types"
import cn from "classnames"
import styles from "./Button.module.css"
import Button from "./ButtonBase"

const ButtonForward = (props: TButtonWithTheme) => {
  const { children, className, withShadow, ...buttonProps } = props
  const classname = cn(
    className,
    "focus:ring focus:ring-gray-300 dark:focus:ring-gray-600",
    {
      [styles.shadow_forward]: Boolean(withShadow),
      "bg-gray-200 dark:bg-gray-700": buttonProps.disabled,
      "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 hover:dark:bg-gray-700":
        !buttonProps.disabled,
    }
  )
  return (
    <Button className={classname} {...buttonProps}>
      {children}
    </Button>
  )
}

export default ButtonForward
