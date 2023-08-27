"use client"

import { signOut } from "next-auth/react"
import { BASE_URL, REQUEST_INIT } from "../constants"

export const logout = async () => {
  const init = {
    ...REQUEST_INIT,
    method: "POST",
  }
  const response = await fetch(`${BASE_URL}/logout/`, init)
  await signOut()
}

export const socialSignin = async (args: {
  provider: "google-oauth2" | "github"
  state: string
  code: string
}) => {
  const { provider, state, code } = args
  let statusCode = 0
  let networkError = false
  let data: any = null
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