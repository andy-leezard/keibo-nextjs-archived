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
