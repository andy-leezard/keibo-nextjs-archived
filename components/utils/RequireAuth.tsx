import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"
import { cookies } from "next/headers"
import { validate } from "@/utils/server/auth"

type RequireAuthProps = PropsWithChildren & {}

export default async function RequireAuth({ children }: RequireAuthProps) {
  const isAuthenticated = await validate(cookies())

  if (!isAuthenticated.data) {
    redirect("/auth/login")
  }

  return <>{children}</>
}
