import cn from "classnames"
import { PropsWithChildren } from "react"

type SkeletonProps = PropsWithChildren & {
  className?: string
}

const Skeleton = ({ children, className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "bg-white/5 p-4 opacity-40 dark:opacity-25",
        "bg-zinc-400",
        //"bg-gradient-to-r from-zinc-200 via-transparent to-zinc-200",
        "relative isolate overflow-hidden",
        "before:absolute before:inset-0",
        "before:-translate-x-full",
        "before:animate-[shimmer_2s_infinite]",
        "before:bg-gradient-to-r",
        "before:from-transparent before:via-zinc-100 before:to-transparent",
        "shadow-xl shadow-black/5",
        "before:border-t before:border-zinc-100/10",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Skeleton
