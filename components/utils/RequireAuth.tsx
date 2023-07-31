"use client"

import { redirect } from "next/navigation"
import { useAppSelector } from "@/redux/hooks"
import { ColorfulSpinner } from "../ui/loaders"

interface Props {
  children: React.ReactNode
}

export default function RequireAuth({ children }: Props) {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth)

  if (isLoading) {
    return (
      <div className="m-auto">
        <ColorfulSpinner size={64} withShadow />
      </div>
    )
  }

  if (!isAuthenticated) {
    redirect("/auth/login")
  }

  return <>{children}</>
}
