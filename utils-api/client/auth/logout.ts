"use client"

import { signOut } from "next-auth/react"
import { BASE_URL, REQUEST_INIT } from "../../constants"

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
