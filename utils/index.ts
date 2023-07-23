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
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}
export function getLastPath(pathname: string): string {
  // Remove trailing slashes (if any)
  pathname = pathname.replace(/\/+$/, '');

  // Split the pathname by "/"
  const paths = pathname.split('/');

  // Handle the special case where the path ends with "/"
  if (pathname.endsWith('/')) {
    // Return the second-to-last element as the last path
    return paths[paths.length - 2];
  } else {
    // Return the last element as the last path
    return paths[paths.length - 1];
  }
}