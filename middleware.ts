import { NextRequest, NextResponse } from "next/server"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

const locales = ["en", "fr", "ko"]
const defaultLocale = "en"
const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  if (
    /* request.nextUrl.pathname.startsWith('/_next') || */
    request.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return
  }

  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  const accept_language = request.headers.get("accept-language")
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = accept_language
      ? match(
          new Negotiator({
            headers: {
              "accept-language": accept_language,
            },
          }).languages(),
          locales,
          defaultLocale
        )
      : defaultLocale

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}${pathname ? `/${pathname}` : ""}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
}
