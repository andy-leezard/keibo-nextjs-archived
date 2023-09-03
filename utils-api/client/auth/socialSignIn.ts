"use client"

import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../../constants"
import type { AuthResponseTokens } from "@/types/auth"

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
