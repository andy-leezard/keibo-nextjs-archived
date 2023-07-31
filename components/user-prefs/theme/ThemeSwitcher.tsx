"use client"

import { useTheme } from "next-themes"
import React, { CSSProperties, useEffect, useState } from "react"
import styles from "./ThemeSVG.module.css"
import ThemeSVG from "./ThemeSVG"

type ThemeSwitcherProps = {
  style?: CSSProperties
  className?: string
  size?: number
}

const ThemeSwitcher = ({ style, className, size }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const initializeTheme = () => {
    const currentTheme = Boolean(
      window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      ? "light"
      : "dark"
    if (!theme || theme === "system") {
      setTheme(currentTheme)
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    if (theme && theme !== "system") {
      setTheme(newTheme)
      return
    }
    // localStorage.theme = newTheme
    initializeTheme()
  }

  useEffect(() => {
    /** work-around for avoiding Hydration Mismatch  */
    setMounted(true)
    
    initializeTheme()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted) {
    return <></>
  }

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
