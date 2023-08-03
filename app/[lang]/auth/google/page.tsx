"use client"

import { useSocialAuthenticateMutation } from "@/redux/features/authApiSlice"
import { useSocialAuth } from "@/hooks/redux"
import { ColorfulSpinner } from "@/components/ui/loaders"
import { FcGoogle } from "react-icons/fc"
import { WithLocaleParam, t } from "@/i18n-config"

type PageProps = WithLocaleParam & {}

export default function Page({ params }: PageProps) {
  const [googleAuthenticate] = useSocialAuthenticateMutation()
  useSocialAuth(googleAuthenticate, "google-oauth2")
  const { lang } = params

  return (
    <div className="m-auto flex flex-col items-center gap-6">
      <ColorfulSpinner size={64} withShadow />
      <div className="flex flex-col items-center">
        <FcGoogle size={48} />
        <span>
          {t(lang, {
            en: "Authenticating with Google...",
            fr: "Authentification en cours avec Google...",
            ko: "Google에서 인증하는 중...",
          })}
        </span>
      </div>
    </div>
  )
}
