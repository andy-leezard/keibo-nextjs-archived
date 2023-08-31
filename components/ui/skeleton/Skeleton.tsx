import cn from "classnames"
import { PropsWithChildren } from "react"
import { base_td_classname } from "./constants"
import { isNullish } from "@/utils"

type SkeletonProps = PropsWithChildren & {
  className?: string
}

const Skeleton = ({ children, className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        ...(isNullish(children) ? base_td_classname : []),
        className
      )}
    >
      {children}
    </div>
  )
}

export default Skeleton
