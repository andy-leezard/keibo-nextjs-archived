"use client"

import { Disclosure } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { WithLocale, t } from "@/i18n-config"
import Image from "next/image"
import Link from "next/link"
import AuthMenu from "./AuthMenu"

type NavBarProps = WithLocale & {}

export default function Navbar({ currentLocale }: NavBarProps) {
  return (
    <Disclosure as="nav" className="sticky top-0 z-10 bg-gray-800">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6">
            <div className="relative flex h-16 items-center justify-between">
              {/* MOBILE SCREEN DROPDOWN ICON */}
              <div className="absolute flex sm:hidden items-center">
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
                  <AuthMenu currentLocale={currentLocale} isMobile={false} />
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE SCREEN DROPDOWN ITEMS */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <AuthMenu currentLocale={currentLocale} isMobile={true} />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
