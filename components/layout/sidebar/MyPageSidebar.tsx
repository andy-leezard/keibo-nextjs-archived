"use client"

import { WithLocale } from "@/i18n-config"
import { Sidebar, SidebarItem } from "./core"
import { usePathname } from "next/navigation"
import { FaCircleUser } from "react-icons/fa6"
import { MdSecurity } from "react-icons/md"
import { PiSlidersHorizontalBold } from "react-icons/pi"

type MyPageSidebarProps = WithLocale & {}

const MyPageSidebar = (props: MyPageSidebarProps) => {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <Sidebar>
      <SidebarItem href={"/my/dashboard"}>
        <FaCircleUser size={16} />
        <span>Dashboard</span>
      </SidebarItem>
      <SidebarItem href={"/my/security"}>
        <MdSecurity size={16} />
        <span>Security</span>
      </SidebarItem>
      <SidebarItem href={"/my/settings"}>
        <PiSlidersHorizontalBold size={16} />
        <span>Settings</span>
      </SidebarItem>
    </Sidebar>
  )
}

export default MyPageSidebar
