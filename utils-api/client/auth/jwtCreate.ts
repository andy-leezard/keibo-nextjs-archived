"use client"

import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../../constants"
import type { AuthResponseTokens } from "@/types/auth"

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
