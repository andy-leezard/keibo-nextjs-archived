import "./globals.css"
import { Nav, Footer } from "@/components/layout"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Keibo - your accounts",
  description: "The official Keibo web app",
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
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
