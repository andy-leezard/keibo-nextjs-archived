"use client"

import { ThemeProvider } from "next-themes"
import { store } from "@/redux/store"
import { Provider as ReduxProvider } from "react-redux"
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({ children }: WithChildren) {
  return (
    <ThemeProvider attribute="class">
      <ReduxProvider store={store}>
        <SessionProvider>
          {children}
          <ToastContainer />
        </SessionProvider>
      </ReduxProvider>
    </ThemeProvider>
  )
}
