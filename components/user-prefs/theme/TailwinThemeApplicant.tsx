"use client"

import { useTheme } from "next-themes"
import React, { useLayoutEffect } from "react"

const TailwinThemeApplicant = () => {
  const { theme } = useTheme()

  useLayoutEffect(() => {
    const currentTheme =
      theme === "light" || theme === "dark"
        ? theme
        : Boolean(
            window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches
          )
        ? "light"
        : "dark"
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return <></>
}

export default TailwinThemeApplicant
