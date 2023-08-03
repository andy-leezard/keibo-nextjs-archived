import { WithLocale, t } from "@/i18n-config"
import { Sidebar, SidebarItem } from "./core"
import { FaCircleUser } from "react-icons/fa6"
import { MdSecurity } from "react-icons/md"
import { PiSlidersHorizontalBold } from "react-icons/pi"

type MyPageSidebarProps = WithLocale & {}

const MyPageSidebar = ({ currentLocale }: MyPageSidebarProps) => {
  return (
    <Sidebar>
      <SidebarItem href={"/my/dashboard"}>
        <FaCircleUser size={16} />
        <span>
          {t(currentLocale, {
            en: "Dashboard",
            ko: "대시보드",
          })}
        </span>
      </SidebarItem>
      <SidebarItem href={"/my/security"}>
        <MdSecurity size={16} />
        <span>
          {t(currentLocale, {
            en: "Security",
            fr: "Sécurité",
            ko: "보안 설정",
          })}
        </span>
      </SidebarItem>
      <SidebarItem href={"/my/settings"}>
        <PiSlidersHorizontalBold size={16} />
        <span>
          {t(currentLocale, {
            en: "Settings",
            fr: "Paramètres",
            ko: "고급 설정",
          })}
        </span>
      </SidebarItem>
    </Sidebar>
  )
}

export default MyPageSidebar
