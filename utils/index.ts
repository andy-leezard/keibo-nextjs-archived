export const isValidEmailAddress = (address: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(address)
}
export const isOdd = (n: number) => (n & 1) === 1
export const normalize = (
  str: string,
  unifyCase?: "uppercase" | "lowercase"
) => {
  const res = str.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
  if (unifyCase === "uppercase") {
    return res.toUpperCase()
  }
  if (unifyCase === "lowercase") {
    return res.toLowerCase()
  }
  return res
}
export function isNoneArrayObject<T>(value: T): boolean {
  return typeof value === "object" && !Array.isArray(value) && value !== null
}
export function getLastPath(pathname: string): string {
  // Remove trailing slashes (if any)
  pathname = pathname.replace(/\/+$/, "")

  // Split the pathname by "/"
  const paths = pathname.split("/")

  // Handle the special case where the path ends with "/"
  if (pathname.endsWith("/")) {
    // Return the second-to-last element as the last path
    return paths[paths.length - 2]
  } else {
    // Return the last element as the last path
    return paths[paths.length - 1]
  }
}
export function formatDateToLiteral(locale = "en-US", unixTimestamp?: number) {
  const os_locale = Intl.DateTimeFormat().resolvedOptions().locale
  function getDaySuffix(day: number) {
    const isFrench = locale.includes("fr")
    const isEnglish = locale.includes("en")
    if (!isEnglish && !isFrench) return ""
    if (day >= 11 && day <= 13) {
      return isFrench ? "" : "th"
    }

    const lastDigit = day % 10
    switch (lastDigit) {
      case 1:
        return isFrench ? "er" : "st"
      case 2:
        return isFrench ? "" : "nd"
      case 3:
        return isFrench ? "" : "rd"
      default:
        return isFrench ? "" : "th"
    }
  }
  const date = unixTimestamp ? new Date(unixTimestamp) : new Date()

  const day = date.getDate()
  const month = date.toLocaleString(locale, { month: "long" })
  const year = date.getFullYear()

  if (locale.includes("ko")) {
    return `${year}.${date.getMonth() + 1}.${day}`
  } else if (locale.includes("fr")) {
    // British standard
    return `${day}${getDaySuffix(day)} ${month} ${year}`
  } else if (locale.includes("en") && !os_locale.includes("US")) {
    // British standard
    return `${day}${getDaySuffix(day)} ${month} ${year}`
  } else {
    // American standard
    return `${month} ${day}, ${year}`
  }
}
export const isNullish = (input: any) => {
  return input === null || input === undefined
}
