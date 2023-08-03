"use client"

import NavLink from "./NavLink"
import { WithLocale, t } from "@/i18n-config"
import { usePathname } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { useLogoutMutation } from "@/redux/features/authApiSlice"
import { logout as setLogout } from "@/redux/features/authSlice"
import { getLastPath } from "@/utils"
import { FaCircleUser } from "react-icons/fa6"
import { GiExitDoor } from "react-icons/gi"
import { DropdownMenu } from "@/components/ui/dropdown-menu"

type AuthMenuProps = WithLocale & {
  /** sm */
  isMobile: boolean
}

const AuthMenu = ({ currentLocale, isMobile }: AuthMenuProps) => {
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const [logout] = useLogoutMutation()

  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth)

  const isSelected = (path: string) => Boolean(getLastPath(pathname) === path)
  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout())
      })
  }
  if (isLoading) {
    return <></>
  }
  return (
    <>
      {isAuthenticated ? (
        <>
          <DropdownMenu
            mode="hover"
            disableMiddleAnchor
            thresholdWidth={200}
            thresholdHeight={200}
            displayNode={
              <FaCircleUser color="white" size={28} style={{ margin: "4px" }} />
            }
            dropdownClassName={"bg-zinc-700 dark:bg-zinc-800"}
          >
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
            <NavLink isMobile={isMobile} nested onClick={handleLogout}>
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
