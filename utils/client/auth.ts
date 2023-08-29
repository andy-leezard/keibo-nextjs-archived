"use client"

import { signOut } from "next-auth/react"
import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../constants"
import { AuthAccessResponseToken, AuthResponseTokens } from "@/types/auth"

export const logout = async () => {
  const init = {
    ...REQUEST_INIT,
    method: "POST",
  }
  const response = await fetch(`${BASE_URL}/logout/`, init)
  await signOut({
    redirect: true,
    callbackUrl: `${window.location.origin}/auth/login`,
  })
}

/**
 * is the login function
 */
export const jwtCreate = async (args: {
  email: string
  password: string
}): Promise<TGenericFetchResponse<AuthResponseTokens>> => {
  const uri = `${BASE_URL}/jwt/create/`
  const init = {
    ...REQUEST_INIT,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(args),
  }
  return await baseFetchQuery<AuthResponseTokens>({
    uri,
    init,
  })
}

export const socialSignin = async (args: {
  provider: "google-oauth2" | "github"
  state: string
  code: string
}): Promise<TGenericFetchResponse<AuthResponseTokens>> => {
  const { provider, state, code } = args
  const uri = `${BASE_URL}/o/${provider}/?state=${encodeURIComponent(
    state
  )}&code=${encodeURIComponent(code)}`
  const init = {
    ...REQUEST_INIT,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  }
  return await baseFetchQuery<AuthResponseTokens>({
    uri,
    init,
  })
}

export const registerUser = async (args: {
  first_name: string
  last_name: string
  email: string
  password: string
  re_password: string
}): Promise<TGenericFetchResponse<SerializedUser>> => {
  const uri = `${BASE_URL}/users/`
  const init = {
    ...REQUEST_INIT,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(args),
  }
  return await baseFetchQuery<SerializedUser>({
    uri,
    init,
  })
  /**
   * On success: `SerializedUser` type is returned
   */
  /**
   * TODO: HANDLE CASE
   * On `non_field_errors`
   * An object with `non_field_errors` property is returned;
   * example: {non_field_errors : "The two password fields didn't match"}
   */
  /**
   * TODO: HANDLE CASE
   * On `email` errors
   * An object with `email` property is returned;
   * example: {"email": ["keibo user with this email already exists."]}
   */
}

export const activateAccount = async (args: { uid: string; token: string }) => {
  const uri = `${BASE_URL}/users/activation/`
  const init = {
    ...REQUEST_INIT,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(args),
  }
  return await baseFetchQuery<SerializedUser>({
    uri,
    init,
  })
  /**
   * TODO: HANDLE CASE
   * On `token` erros
   * An object with `token` property is returned;
   * example: {token : "Invalid token for given user"}
   */
}

export const validateSession = async (): Promise<TGenericFetchResponse<object>> => {
  let statusCode = 0
  let networkError = false
  let data: any = null

  const init = {
    ...REQUEST_INIT,
    method: "POST",
    body: JSON.stringify({}),
  }
  const verifyReponse = await baseFetchQuery<object>({
    uri:`${BASE_URL}/jwt/verify/`,
    statusCode,
    networkError,
    data,
    init,
  })
  statusCode = verifyReponse.statusCode
  networkError = verifyReponse.networkError
  data = verifyReponse.data
  const access_expired = statusCode === 400
  if (access_expired) {
    const refreshReponse = await baseFetchQuery<AuthAccessResponseToken>({
      uri:`${BASE_URL}/jwt/verify/`,
      statusCode,
      networkError,
      data,
      init,
    })
    statusCode = refreshReponse.statusCode
    networkError = refreshReponse.networkError
    data = refreshReponse.data
  }
  return {
    statusCode,
    networkError,
    data,
  }
}
