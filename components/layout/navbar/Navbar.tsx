"use client"

import { WithLocale } from "@/i18n-config"
import Image from "next/image"
import Link from "next/link"
import { AuthMenu, BurgerButton } from "./widgets"
import { useState } from "react"
import ThemeSwitcher from "@/components/user-prefs/theme/ThemeSwitcher"

type NavBarProps = WithLocale & {}

export default function Navbar({ currentLocale }: NavBarProps) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-10 bg-gray-800">
      <div className="relative flex h-16 justify-between px-2 sm:px-6">
        {/* MOBILE SCREEN DROPDOWN ICON */}
        <div className="absolute flex items-center">
          <BurgerButton
            currentLocale={currentLocale}
            setOpen={setOpen}
            open={open}
          />
        </div>
        {/* REGULAR ITEMS */}
        <div className="flex flex-1 justify-center sm:justify-start">
          <Link href={`/${currentLocale}`} className="flex items-center">
            <Image src="/letter_64.png" width={32} height={32} alt="Home" />
          </Link>
        </div>
        <div className="hidden sm:flex flex-1 gap-4 justify-end">
          <AuthMenu currentLocale={currentLocale} isMobile={false} />

          <ThemeSwitcher />
        </div>
      </div>

      {/* MOBILE SCREEN DROPDOWN ITEMS */}
      {open ? (
        <div className="sm:hidden space-y-1 px-2 pb-3 pt-2">
          <AuthMenu currentLocale={currentLocale} isMobile={true} />
        </div>
      ) : (
        <></>
      )}
    </nav>
  )
}
