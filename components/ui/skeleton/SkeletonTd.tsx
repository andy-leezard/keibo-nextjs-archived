import { isNullish } from "@/utils"
import cn from "classnames"
import { PropsWithChildren } from "react"
import { base_td_classname } from "./constants"

type SkeletonProps = PropsWithChildren & {
  className?: string
}

const SkeletonTd = ({ children, className }: SkeletonProps) => {
  return (
    <td
      className={cn(
        ...(isNullish(children) ? base_td_classname : []),
        className
      )}
    >
      {children}
    </td>
  )
}

export default SkeletonTd
