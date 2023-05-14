"use client"

import { useTheme } from "next-themes"
import React from "react"
import { Button } from "@/components/ui"
import ThemeSVG from "./ThemeSVG"

type Props = {}

const ThemeState = (props: Props) => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (!theme || theme === "system") {
      setTheme(
        Boolean(
          window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        )
          ? "light"
          : "dark"
      )
      return
    }
    setTheme(theme === "dark" ? "light" : "dark")
  }
  return (
    <Button
      corner="rounded"
      onPress={() => toggleTheme()}
      style={{
        flexShrink: 0,
        width: "44px",
        backgroundColor: theme === "dark" ? "#343434" : "#ffffff",
      }}
    >
      <ThemeSVG size={32} />
    </Button>
  )
}

export default ThemeState
