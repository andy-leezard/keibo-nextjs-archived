import "./globals.css"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import { NextThemeProvider } from "@/lib/client"
import { TailwinThemeApplicant } from "@/components/user-prefs/theme"
import CustomReduxProvider from "@/redux/provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  icons: {
    icon: "/logo_64.webp",
    shortcut: "/logo_64.webp",
  },
  /** There are two default meta tags that are always added even if a route doesn't define metadata: */
  // <meta charSet="UTF-8" />
  // <meta name="viewport" content="width=device-width, initial-scale=1.0" />
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" /* suppressHydrationWarning */>
      <body className={`fixed inset-0 flex flex-col ${inter.className}`}>
        <div className="relative flex flex-1 flex-col overflow-y-auto max-h-screen">
          <CustomReduxProvider>
            <NextThemeProvider>
              <TailwinThemeApplicant />
              {/* <AriaSSRProvider> */}
              {children}
              {/* </AriaSSRProvider> */}
            </NextThemeProvider>
          </CustomReduxProvider>
        </div>
      </body>
    </html>
  )
}
