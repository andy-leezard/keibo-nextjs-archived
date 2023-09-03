"use client"

import NavLink from "./NavLink"
import { WithLocale, t } from "@/i18n-config"
import { usePathname } from "next/navigation"
import { getLastPath } from "@/utils"
import { FaCircleUser } from "react-icons/fa6"
import { GiExitDoor } from "react-icons/gi"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { MdSecurity } from "react-icons/md"
import { BiSolidWallet } from "react-icons/bi"
import { TbReportMoney } from "react-icons/tb"
import { PiSlidersHorizontalBold } from "react-icons/pi"
import { PALETTE } from "@/lib/palette"
import { useSession } from "next-auth/react"
import ProfileWidget from "./ProfileWidget"
import { logout } from "@/utils-api/client/auth/logout"

type AuthMenuProps = WithLocale & {
  /** sm */
  isMobile: boolean
}

const AuthMenu = ({ currentLocale, isMobile }: AuthMenuProps) => {
  const pathname = usePathname()
  const { data: session, status, update } = useSession()

  const isSelected = (path: string) => Boolean(getLastPath(pathname) === path)

  if (status === "loading") {
    return <></>
  }
  return (
    <>
      {status === "authenticated" ? (
        <>
          <DropdownMenu
            mode="hover"
            href="/accounts/overview"
            disableMiddleAnchor
            thresholdWidth={200}
            thresholdHeight={300}
            displayNode={
              <BiSolidWallet
                className="m-1 pointer-events-none"
                color={pathname.includes("accounts") ? PALETTE.MINT : "#ffffff"}
                size={28}
              />
            }
            dropdownClassName={"bg-zinc-700 dark:bg-zinc-800"}
          >
            <div className="inline-flex font-medium p-2">
              <span>
                {t(currentLocale, {
                  en: "Accounts",
                  fr: "Comptes",
                  ko: "계좌 관리",
                })}
              </span>
            </div>
            <NavLink
              isSelected={isSelected("overview")}
              isMobile={isMobile}
              nested
              href="/accounts/overview"
            >
              <div className="flex gap-2">
                <TbReportMoney size={16} />
                <span>
                  {t(currentLocale, {
                    en: "Overview",
                    fr: "Aperçu",
                    ko: "종합",
                  })}
                </span>
              </div>
            </NavLink>
          </DropdownMenu>
          <DropdownMenu
            mode="hover"
            href="/my/dashboard"
            disableMiddleAnchor
            thresholdWidth={300}
            thresholdHeight={300}
            displayNode={
              <FaCircleUser
                color={pathname.includes("my") ? PALETTE.MINT : "#ffffff"}
                size={28}
                style={{ margin: "4px" }}
              />
            }
            dropdownClassName={"bg-zinc-700 dark:bg-zinc-800"}
          >
            <ProfileWidget
              currentLocale={currentLocale}
              user={session.user as SerializedUser}
            />
            <NavLink
              isSelected={isSelected("dashboard")}
              isMobile={isMobile}
              nested
              href="/my/dashboard"
            >
              <div className="flex gap-2">
                <FaCircleUser size={16} />
                <span>
                  {t(currentLocale, {
                    en: "Dashboard",
                    ko: "대시보드",
                  })}
                </span>
              </div>
            </NavLink>
            <NavLink
              isSelected={isSelected("security")}
              isMobile={isMobile}
              nested
              href="/my/security"
            >
              <div className="flex gap-2">
                <MdSecurity size={16} />
                <span>
                  {t(currentLocale, {
                    en: "Security",
                    fr: "Sécurité",
                    ko: "보안 설정",
                  })}
                </span>
              </div>
            </NavLink>
            <NavLink
              isSelected={isSelected("settings")}
              isMobile={isMobile}
              nested
              href="/my/settings"
            >
              <div className="flex gap-2">
                <PiSlidersHorizontalBold size={16} />
                <span>
                  {t(currentLocale, {
                    en: "Settings",
                    fr: "Paramètres",
                    ko: "고급 설정",
                  })}
                </span>
              </div>
            </NavLink>
            <NavLink isMobile={isMobile} nested onClick={() => logout()}>
              <div className="flex gap-2">
                <GiExitDoor size={16} />
                <span>
                  {t(currentLocale, {
                    en: "Sign out",
                    fr: "Se déconnecter",
                    ko: "로그아웃",
                  })}
                </span>
              </div>
            </NavLink>
          </DropdownMenu>
        </>
      ) : (
        <>
          {pathname.includes("auth") ? (
            <></>
          ) : (
            <>
              <NavLink
                isSelected={isSelected("login")}
                isMobile={isMobile}
                href="/auth/login"
              >
                {t(currentLocale, {
                  en: "Sign in",
                  fr: "Se connecter",
                  ko: "로그인",
                })}
              </NavLink>
              <NavLink
                isSelected={isSelected("register")}
                isMobile={isMobile}
                href="/auth/register"
              >
                {t(currentLocale, {
                  en: "Sign up",
                  fr: "Créer un compte",
                  ko: "회원가입",
                })}
              </NavLink>
            </>
          )}
        </>
      )}
    </>
  )
}

export default AuthMenu
