"use client"

import { ThemeProvider } from "next-themes"

const NextThemeProvider = ({ children }: WithChildren) => {
  return <ThemeProvider>{children}</ThemeProvider>
}

export default NextThemeProvider
