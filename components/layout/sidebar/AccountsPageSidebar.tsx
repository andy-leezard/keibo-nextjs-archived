import { WithLocale, t } from "@/i18n-config"
import { Sidebar, SidebarItem } from "./core"
import { FaCircleUser } from "react-icons/fa6"

type AccountsPageSidebarProps = WithLocale & {}

const AccountsPageSidebar = ({ currentLocale }: AccountsPageSidebarProps) => {
  return (
    <Sidebar>
      <SidebarItem href={"/accounts/overview"}>
        <FaCircleUser size={16} />
        <span>
          {t(currentLocale, {
            en: "Overview",
            fr: "Aperçu",
            ko: "종합",
          })}
        </span>
      </SidebarItem>
    </Sidebar>
  )
}

export default AccountsPageSidebar
