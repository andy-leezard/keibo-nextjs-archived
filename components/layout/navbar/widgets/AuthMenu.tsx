"use client"

import React from "react"
import NavLink from "./NavLink"
import { WithLocale, t } from "@/i18n-config"
import { usePathname } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { useLogoutMutation } from "@/redux/features/authApiSlice"
import { logout as setLogout } from "@/redux/features/authSlice"
import { getLastPath } from "@/utils"

type AuthMenuProps = WithLocale & {
  /** sm */
  isMobile: boolean
}

const AuthMenu = ({ currentLocale, isMobile }: AuthMenuProps) => {
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const [logout] = useLogoutMutation()

  const { isAuthenticated } = useAppSelector((state) => state.auth)

  const isSelected = (path: string) => Boolean(getLastPath(pathname) === path)
  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout())
      })
  }
  return (
    <>
      {isAuthenticated ? (
        <>
          <NavLink
            isSelected={isSelected("dashboard")}
            isMobile={isMobile}
            href="/my/dashboard"
          >
            {t(currentLocale, {
              en: "Dashboard",
              ko: "대시보드",
            })}
          </NavLink>
          <NavLink isMobile={isMobile} onClick={handleLogout}>
            {t(currentLocale, {
              en: "Sign out",
              fr: "Se déconnecter",
              ko: "로그아웃",
            })}
          </NavLink>
        </>
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
  )
}

export default AuthMenu
