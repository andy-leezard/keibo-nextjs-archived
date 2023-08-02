"use client"

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { WithLocale, t } from "@/i18n-config"
import { Dispatch, SetStateAction } from "react"

type BurgerButtonProps = WithLocale & {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const BurgerButton = ({ currentLocale, open, setOpen }: BurgerButtonProps) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    >
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
    </button>
  )
}

export default BurgerButton
