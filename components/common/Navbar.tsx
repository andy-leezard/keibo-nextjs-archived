"use client"

import { usePathname } from "next/navigation"
import { Disclosure } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { useLogoutMutation } from "@/redux/features/authApiSlice"
import { logout as setLogout } from "@/redux/features/authSlice"
import { NavLink } from "@/components/common"
import { WithLocale, t } from "@/i18n-config"
import Image from "next/image"
import Link from "next/link"

type NavBarProps = WithLocale & {}

export default function Navbar({ currentLocale }: NavBarProps) {
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const [logout] = useLogoutMutation()

  const { isAuthenticated } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout())
      })
  }

  const isSelected = (path: string) => (pathname === path ? true : false)

  const authLinks = (isMobile: boolean) => (
    <>
      <NavLink
        isSelected={isSelected("/dashboard")}
        isMobile={isMobile}
        href="/dashboard"
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
  )

  const guestLinks = (isMobile: boolean) => (
    <>
      <NavLink
        isSelected={isSelected("/auth/login")}
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
        isSelected={isSelected("/auth/register")}
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
  )

  return (
    <Disclosure as="nav" className="sticky top-0 z-10 bg-gray-800">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* MOBILE SCREEN DROPDOWN ICON */}
              <div className="flex sm:hidden items-center">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">
                    {t(currentLocale, {
                      en: "Open main menu",
                      fr: "Ouvrir le menu principal",
                      ko: "메뉴 열기",
                    })}
                  </span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* REGULAR ITEMS */}
              <div className="flex flex-1 justify-between gap-4">
                <div className="flex flex-1 justify-center sm:justify-start items-center">
                  <Link href={`/${currentLocale}`}>
                    <Image
                      src="/letter_64.png"
                      width={32}
                      height={32}
                      alt="Home"
                    />
                  </Link>
                </div>
                <div className="hidden sm:flex flex-1 items-center gap-2 justify-end">
                  {isAuthenticated ? authLinks(false) : guestLinks(false)}
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE SCREEN DROPDOWN ITEMS */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {isAuthenticated ? authLinks(true) : guestLinks(true)}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
