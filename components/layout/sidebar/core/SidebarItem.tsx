"use client"

import Link from "next/link"
import { PropsWithChildren } from "react"
import cn from "classnames"
import { usePathname } from "next/navigation"

type SidebarItemProps = PropsWithChildren & {
  className?: string
  href: string
}

const SidebarItem = ({ children, href, ...rest }: SidebarItemProps) => {
  const pathname = usePathname()
  const isSelected = pathname.endsWith(href.split("/").at(-1) ?? "")

  const className = cn(
    rest.className,
    "flex items-center py-3.5 pl-4 pr-16 gap-3 border-l-4 border-solid",
    {
      "border-transparent hover:bg-neutral-100 dark:hover:bg-gray-800":
        !isSelected,
      "font-medium border-sky-500 pointer-events-none bg-neutral-100 dark:bg-gray-800":
        isSelected,
      //"text-slate-900 ": isSelected,
      /* "self-center p-1 rounded-md": !nested,
      "text-white": !isSelected,
      "pointer-events-none": isSelected,
      "text-gray-300": isBanner || isSelected,
      "bg-gray-900 dark:bg-cyan-950": nested && isSelected && !isBanner,
      "hover:bg-slate-500 dark:hover:bg-slate-800": nested && !isSelected && !isBanner,
      "block text-base": isMobile,
      "text-sm": !isMobile,
      "inline-flex": numberOfChildren === 1,
      "flex-col": numberOfChildren > 1, */
    }
  )

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  )
}

export default SidebarItem
