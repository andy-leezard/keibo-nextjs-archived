import { PropsWithChildren, MouseEvent as ReactMouseEvent } from "react"
import { DropdownMenuProps, THoverState } from "./types"
import styles from "./DropdownWidget.module.css"
import cn from "classnames"

type DropdownWidgetProps = Required<PropsWithChildren> & {
  hoverPos: THoverState
  id?: DropdownMenuProps["dropdownId"]
  className?: DropdownMenuProps["className"]
  style?: DropdownMenuProps["style"]
  thresholdWidth: DropdownMenuProps["thresholdWidth"]
  thresholdHeight: DropdownMenuProps["thresholdHeight"]
  onClick?: (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void
  onMouseLeave?: (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void
}

const DropdownWidget = ({
  children,
  hoverPos,
  id,
  className,
  style,
  thresholdWidth,
  thresholdHeight,
  onClick,
  onMouseLeave,
}: DropdownWidgetProps) => {
  return (
    <div
      id={id}
      className={cn(
        styles.dropdown_menu,
        className,
        "g-scrollbox",
        "fixed flex-col cursor-auto overflow-y-auto text-white text-center text-base leading-4",
        {
          'flex': hoverPos.display,
          'hidden': !hoverPos.display
        }
      )}
      style={{
        ...style,
        ...hoverPos.pos,
        maxWidth: `${thresholdWidth}px`,
        maxHeight: `${thresholdHeight}px`,
      }}
      onClick={onClick}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}

export default DropdownWidget
