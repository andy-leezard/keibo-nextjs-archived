"use client"

import { useTheme } from "next-themes"
import React, { CSSProperties, useEffect } from "react"
import styles from "./ThemeSVG.module.css"
import ThemeSVG from "./ThemeSVG"

type ThemeSwitcherProps = {
  style?: CSSProperties
  className?: string
  size?: number
}

const ThemeSwitcher = ({ style, className, size }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme()

  const initializeTheme = () => {
    if (!theme || theme === "system") {
      setTheme(
        Boolean(
          window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        )
          ? "light"
          : "dark"
      )
    }
  }

  const toggleTheme = () => {
    if (theme && theme !== "system") {
      setTheme(theme === "dark" ? "light" : "dark")
      return
    }
    initializeTheme()
  }

  useEffect(() => {
    initializeTheme()
    /** work-around for avoiding Hydration Mismatch  */
    // setMounted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <button
      type="button"
      className={`${styles.theme_btn} ${className}`}
      onClick={() => toggleTheme()}
      style={style}
    >
      <ThemeSVG size={24} />
    </button>
  )
}

export default ThemeSwitcher
