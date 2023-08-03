import { PropsWithChildren } from "react"
import "./globals.css"
import type { Metadata } from "next/types"
import { Fira_Sans } from "next/font/google"
import Providers from "./providers"
import cn from "classnames"

const inter = Fira_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
})

export const metadata: Metadata = {
  icons: {
    icon: "/logo_64.webp",
    shortcut: "/logo_64.webp",
  },
  /** There are two default meta tags that are always added even if a route doesn't define metadata: */
  // <meta charSet="UTF-8" />
  // <meta name="viewport" content="width=device-width, initial-scale=1.0" />
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "fixed inset-0 flex flex-col text-neutral-800 dark:text-gray-200 dark:bg-zinc-950"
        )}
      >
        <div className="relative flex flex-1 flex-col overflow-y-auto">
          <Providers>
            {/* <AriaSSRProvider> */}
            {children}
            {/* </AriaSSRProvider> */}
          </Providers>
        </div>
      </body>
    </html>
  )
}
