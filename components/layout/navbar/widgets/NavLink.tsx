import Link from "next/link"
import cn from "classnames"
import React from "react"
import styles from "./NavLink.module.css"

interface Props {
  isSelected?: boolean
  isMobile?: boolean
  isBanner?: boolean
  href?: string
  children: React.ReactNode
  [rest: string]: any
}

export default function NavLink({
  isSelected,
  isMobile,
  isBanner,
  href,
  children,
  ...rest
}: Props) {
  const numberOfChildren = React.Children.count(children)
  const className = cn(
    rest.className,
		styles.nav_link,
    "min-w- px-4 py-4 font-medium flex",
    {
      "text-white": !isSelected,
      "bg-gray-900 text-gray-300 pointer-events-none": isSelected,
      "hover:bg-gray-800 hover:stroke-cyan-700": !isSelected && !isBanner,
      "block text-base": isMobile,
      "text-sm": !isMobile,
      "text-gray-300": isBanner,
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
