export const isValidEmailAddress = (address: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(address)
}
export const isOdd = (n: number) => (n & 1) === 1
