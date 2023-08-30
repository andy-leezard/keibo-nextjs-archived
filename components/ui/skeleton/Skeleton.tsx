import cn from "classnames"
import { PropsWithChildren } from "react"
import { base_td_classname } from "./constants"

type SkeletonProps = PropsWithChildren & {
  className?: string
}

const Skeleton = ({ children, className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        ...base_td_classname,
        className
      )}
    >
      {children}
    </div>
  )
}

export default Skeleton
