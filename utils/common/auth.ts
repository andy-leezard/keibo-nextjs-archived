const BASE_URL = `${process.env.NEXT_PUBLIC_HOST}/api` as const
const REQUEST_INIT = {
  credentials: "include",
  mode: "cors",
} as const
/**
 * is the login function
 */
export const jwtCreate = async (args?: {
  email: string
  password: string
}): Promise<
  TGenericFetchResponse<{
    refresh: string
    access: string
  }>
> => {
  let statusCode = 0
  let networkError = false
  let data: {
    refresh: string
    access: string
  } | null = null
  if (!args) {
    console.log("ERROR ANCHOR 3")
    return {
      statusCode: 401,
      networkError,
      data,
    }
  }
  try {
    const response = await fetch(`${BASE_URL}/jwt/create/`, {
      ...REQUEST_INIT,
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(args),
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
  return {
    statusCode,
    networkError,
    data,
  }
}

export const getUser = async (
  /** Stringified Cookie containing `access` and `refresh` */
  Cookie?: string
): Promise<TGenericFetchResponse<SerializedUser>> => {
  /* console.log(headers) */
  let statusCode = 0
  let networkError = false
  let data: any = null
  if (!Cookie) {
    console.log(`Headers does not exist!!`)
    return {
      statusCode: 401,
      networkError,
      data,
    }
  }
  const init = {
    ...REQUEST_INIT,
    headers: { Cookie },
    method: "GET",
  }
  try {
    const response = await fetch(`${BASE_URL}/users/me/`, init)
    statusCode = response.status
    if (!response.ok) {
      throw new Error(`Network response was not ok with status ${statusCode}`)
    }
    const as_json = await response.json()
    data = as_json
  } catch (error) {
    console.error(error)
    if (!statusCode) {
      networkError = true
    }
  }
  const access_expired = statusCode === 400
  if (access_expired) {
    try {
      const response = await fetch(`${BASE_URL}/jwt/refresh/`, {
        ...REQUEST_INIT,
        headers: {
          Cookie,
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
