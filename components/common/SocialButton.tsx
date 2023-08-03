import { PropsWithChildren } from "react"
import cn from "classnames"

type SocialButtonProps = PropsWithChildren & {
  provider: "google" | "github"
  [rest: string]: any
}

export default function SocialButton({
  provider,
  children,
  ...rest
}: SocialButtonProps) {
  const className = cn(
    "flex-1 w-full rounded-md px-3 py-2 font-medium",
    "border border-solid rounded-md",
    "hover:bg-neutral-200 dark:hover:bg-zinc-700",
  )

  return (
    <button className={className} {...rest}>
      <div className="flex justify-start items-center">{children}</div>
    </button>
  )
}
