"use client"

import { ThemeProvider } from "next-themes"
import { store } from "@/redux/store"
import { Provider as ReduxProvider } from "react-redux"
import { SessionProvider } from "next-auth/react"

export default function Providers({ children }: WithChildren) {
  return (
    <ThemeProvider attribute="class">
      <ReduxProvider store={store}>
        <SessionProvider>{children}</SessionProvider>
      </ReduxProvider>
    </ThemeProvider>
  )
}
