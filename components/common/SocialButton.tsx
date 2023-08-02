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
  const className = cn("flex-1 text-white rounded-md px-3 py-2 font-medium", {
    "bg-red-500 hover:bg-red-400": provider === "google",
    "bg-blue-500 hover:bg-blue-400": provider === "github",
  })

  return (
    <button className={className} {...rest}>
      <span className="flex justify-start items-center">{children}</span>
    </button>
  )
}
