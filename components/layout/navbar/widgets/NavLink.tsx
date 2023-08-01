import Link from "next/link"
import cn from "classnames"
import styles from "./NavLink.module.css"
import { Children } from "react"

interface Props {
  isSelected?: boolean
  isMobile?: boolean
  isBanner?: boolean
  href?: string
  nested?: boolean
  children: React.ReactNode
  [rest: string]: any
}

export default function NavLink({
  isSelected,
  isMobile,
  isBanner,
  href,
  children,
  nested,
  ...rest
}: Props) {
  const numberOfChildren = Children.count(children)
  const className = cn(
    rest.className,
		styles.nav_link,
    "font-medium flex",
    {
      [styles.nested]: nested,
      "px-4 py-4": nested,
      "self-center p-1 rounded-md": !nested,
      "text-white": !isSelected,
      "pointer-events-none": isSelected,
      "text-gray-300": isBanner || isSelected,
      "bg-gray-900 dark:bg-cyan-950": nested && isSelected && !isBanner,
      "hover:bg-slate-500 dark:hover:bg-slate-800": nested && !isSelected && !isBanner,
      "block text-base": isMobile,
      "text-sm": !isMobile,
      "inline-flex": numberOfChildren === 1,
      "flex-col": numberOfChildren > 1,
    }
  )

  if (!href) {
    return (
      <span className={className} role="button" onClick={rest.onClick}>
        {children}
      </span>
    )
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  )
}
