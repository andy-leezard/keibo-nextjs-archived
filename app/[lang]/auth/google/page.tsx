"use client"

import { useSocialAuthenticateMutation } from "@/redux/features/authApiSlice"
import { useSocialAuth } from "@/hooks/redux"
import { Spinner } from "@/components/common"

export default function Page() {
  const [googleAuthenticate] = useSocialAuthenticateMutation()
  useSocialAuth(googleAuthenticate, "google-oauth2")

  return (
    <main>
      <div className="my-8">
        <Spinner lg />
      </div>
    </main>
  )
}
