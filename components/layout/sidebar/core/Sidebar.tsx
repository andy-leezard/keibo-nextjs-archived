import React, { PropsWithChildren } from "react"

type DrawerProps = PropsWithChildren & {
  className?: string
}

const Sidebar = ({ children, className }: DrawerProps) => {
  return (
    <div
      className={`hidden sm:flex flex-col border-solid border-r border-gray-200 dark:border-zinc-600 ${className}`}
    >
      {children}
    </div>
  )
}

export default Sidebar
