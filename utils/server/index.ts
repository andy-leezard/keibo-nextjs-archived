export function toPositiveInt<T>(str: string | null, fallbackValue: T) {
  if (str === null) return fallbackValue
  const num = parseInt(str, 10)
  if (isNaN(num)) return fallbackValue
  return num
}
