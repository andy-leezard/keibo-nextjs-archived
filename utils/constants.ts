export const BASE_URL = `${process.env.NEXT_PUBLIC_HOST}/api` as const
export const REQUEST_INIT = {
  credentials: "include",
  mode: "cors",
} as const
