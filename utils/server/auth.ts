import "server-only"

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

const BASE_URL = `${process.env.NEXT_PUBLIC_HOST}/api` as const
const REQUEST_INIT = {
  credentials: "include",
  mode: "cors",
} as const

export const getUser = async (
  cookie: ReadonlyRequestCookies
): Promise<TGenericFetchResponse> => {
  const access = cookie.get("access")
  const refresh = cookie.get("refresh")
  const sessionid = cookie.get("sessionid")
  let statusCode = 0
  let networkError = false
  let data: any = null
  if (!access || !refresh || !sessionid) {
    return {
      statusCode: 401,
      networkError,
      data,
    }
  }
  try {
    const response = await fetch(`${BASE_URL}/users/me/`, {
      ...REQUEST_INIT,
      headers: { Cookie: cookie.toString() },
      method: "GET",
    })
    statusCode = response.status
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const as_json = await response.json()
    data = as_json
  } catch (error) {
    console.error(error)
    if(!statusCode){
      networkError = true
    }
  }
  return {
    statusCode,
    networkError,
    data,
  }
}

export const validate = async (cookie: ReadonlyRequestCookies) => {
  const access = cookie.get("access")
  const refresh = cookie.get("refresh")
  const sessionid = cookie.get("sessionid")
  let statusCode = 0
  let networkError = false
  let data: any = null
  if (!access || !refresh || !sessionid) {
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
    if(!statusCode){
      networkError = true
    }
  }
  console.log(`status: ${statusCode}`)
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
      if(!statusCode){
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
