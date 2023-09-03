import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "./i18n-config"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { withAuth } from "next-auth/middleware"

// middleware is applied to all routes, use conditionals to select

export default withAuth(
  function middleware(request) {
    const pathname = request.nextUrl.pathname

    // all the url param part
    const searchParams = request.nextUrl.search

    if (
      // Ignore public files
      /\.(.*)$/.test(request.nextUrl.pathname)
    ) {
      return
    }

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )/*  && !pathname.includes("api") */

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request)

      // e.g. incoming request is /products
      // The new URL is now /en-US/products
      return NextResponse.redirect(
        new URL(
          `/${locale}/${pathname}${searchParams ? `/${searchParams}` : ""}`,
          request.url
        )
      )
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const pathname = req.nextUrl.pathname
        /* console.log("middleware callback auth req START >>>")
        console.log(req.cookies.getAll().map((rqc) => rqc.name))
        console.log("middleware callback auth req END >>>")
        console.log("---")
        console.log("middleware callback auth token START >>>")
        console.log(token)
        console.log("middleware callback auth token END >>>") */
        if (
          (pathname.includes("accounts") || pathname.includes("my")) &&
          token === null
        ) {
          return false
        }
        return true
      },
    },
  }
)

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  return matchLocale(languages, locales, i18n.defaultLocale)
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
