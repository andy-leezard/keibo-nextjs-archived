export const BASE_URL = `${process.env.NEXT_PUBLIC_HOST}/api` as const
export const REQUEST_INIT = {
  credentials: "include",
  mode: "cors",
} as const
export const FIELD_ERROR: TGenericFetchResponse<null> = {
  statusCode: 0,
  networkError: true,
  data: null,
}
export const baseFetchQuery = async <T>(args: {
  uri: string
  statusCode?: number
  networkError?: boolean
  data?: any
  init?: RequestInit
}): Promise<TGenericFetchResponse<T>> => {
  let { statusCode = 0, networkError = false, data = null, uri, init } = args
  try {
    const response = await fetch(uri, init)
    statusCode = response.status
    if (!response.ok) {
      throw new Error(
        `Network response was not ok with status ${statusCode} - ${response.statusText}`
      )
    }
    const as_json = await response.json()
    data = as_json
  } catch (error) {
    console.error(error)
    if (!statusCode) {
      networkError = true
    }
  }
  return {
    statusCode,
    networkError,
    data,
  }
}
