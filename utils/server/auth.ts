import "server-only"

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../constants"

export const getServerUser = async (
  /** Stringified Cookie containing `access` and `refresh` */
  cookie: ReadonlyRequestCookies
): Promise<TGenericFetchResponse<SerializedUser>> => {
  const access = cookie.get("access")
  const refresh = cookie.get("refresh")
  if (!access || !refresh) {
    return {
      statusCode: 401,
      networkError: false,
      data: null,
    }
  }
  const uri = `${BASE_URL}/users/me/`
  const init = {
    ...REQUEST_INIT,
    headers: { Cookie: cookie.toString() },
    method: "GET",
  }
  return await baseFetchQuery<SerializedUser>({
    uri,
    init,
  })
}

export const validate = async (
  cookie: ReadonlyRequestCookies
): Promise<TGenericFetchResponse<object>> => {
  const access = cookie.get("access")
  const refresh = cookie.get("refresh")
  let statusCode = 0
  let networkError = false
  let data: any = null
  if (!access || !refresh) {
    return {
      statusCode: 401,
      networkError,
      data,
    }
  }
  try {
    const response = await fetch(`${BASE_URL}/jwt/verify/`, {
      ...REQUEST_INIT,
      headers: {
        Cookie: cookie.toString(),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({}),
    })
    statusCode = response.status
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const as_json = await response.json()
    data = as_json
  } catch (error) {
    console.error(error)
    if (!statusCode) {
      networkError = true
    }
  }
  if (networkError) {
    console.log("ERROR ANCHOR 2")
    return {
      statusCode: 401,
      networkError,
      data,
    }
  }
  const access_expired = statusCode === 400
  if (access_expired) {
    try {
      const response = await fetch(`${BASE_URL}/jwt/refresh/`, {
        ...REQUEST_INIT,
        headers: {
          Cookie: cookie.toString(),
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({}),
      })
      statusCode = response.status
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const as_json = await response.json()
      data = as_json
    } catch (error) {
      console.error(error)
      if (!statusCode) {
        networkError = true
      }
    }
  }
  return {
    statusCode,
    networkError,
    data,
  }
}
