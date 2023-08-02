"use client"

import { ThemeProvider } from "next-themes"
import { store } from "@/redux/store"
import { Provider as ReduxProvider } from "react-redux"

export default function Providers({ children }: WithChildren) {
  return (
    <ThemeProvider attribute="class">
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ThemeProvider>
  )
}
