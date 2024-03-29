import {
  DOMAttributes,
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
} from "react"
import styles from "./ListBox.module.css"

type LiProps = PropsWithChildren & {
  ariaProps: DOMAttributes<any>
  isFocused?: boolean
  isSelected?: boolean
}

// eslint-disable-next-line react/display-name
const ListItem = forwardRef<HTMLLIElement, LiProps>(
  (
    { children, ariaProps, isFocused, isSelected }: LiProps,
    ref: ForwardedRef<HTMLLIElement>
  ) => {
    return (
      <li
        {...ariaProps}
        className={`${styles.list_item} ${isFocused ? styles.isFocused : ""} ${
          isSelected ? styles.isSelected : ""
        }`}
        ref={ref}
      >
        {children}
      </li>
    )
  }
)

export default ListItem
