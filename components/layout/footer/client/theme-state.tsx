"use client"

import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui"
import ThemeSVG from "./ThemeSVG"

type Props = {}

const ThemeState = (props: Props) => {
  const [mounted, setMounted] = useState(false)
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
    setMounted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted) {
    return <></>
  }

  return (
    <Button
      corner="rounded"
      onPress={() => toggleTheme()}
      style={{
        flexShrink: 0,
        width: "44px",
        backgroundColor: theme === "light" ? "#ffffff" : "#343434",
      }}
    >
      <ThemeSVG size={32} />
    </Button>
  )
}

export default ThemeState
