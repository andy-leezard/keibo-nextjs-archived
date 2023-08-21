import { ButtonHTMLAttributes } from "react"
import cn from "classnames"

export default function SocialButton({
  provider,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  provider: "google" | "github"
}) {
  const className = cn(
    "flex-1 w-full rounded-md px-3 py-2 font-medium",
    "border border-solid rounded-md",
    "hover:bg-neutral-200 dark:hover:bg-zinc-700"
  )

  return (
    <button className={className} {...rest}>
      <div className="flex justify-start items-center">{children}</div>
    </button>
  )
}
