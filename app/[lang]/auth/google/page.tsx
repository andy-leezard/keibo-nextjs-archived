"use client"

import { useSocialAuthenticateMutation } from "@/redux/features/authApiSlice"
import { useSocialAuth } from "@/hooks/redux"
import { ColorfulSpinner } from "@/components/ui/loaders"

export default function Page() {
  const [googleAuthenticate] = useSocialAuthenticateMutation()
  useSocialAuth(googleAuthenticate, "google-oauth2")

  return (
    <div className="m-auto flex flex-col items-center gap-6">
      <ColorfulSpinner size={64} withShadow />
      <span>Authenticating with Google...</span>
    </div>
  )
}
