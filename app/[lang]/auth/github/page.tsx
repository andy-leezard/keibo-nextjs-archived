"use client"

import { useSocialAuthenticateMutation } from "@/redux/features/authApiSlice"
import { useSocialAuth } from "@/hooks/redux"
import { ColorfulSpinner } from "@/components/ui/loaders"
import { WithLocaleParam, t } from "@/i18n-config"
import { VscGithub } from "react-icons/vsc"

type PageProps = WithLocaleParam & {}

export default function Page({ params }: PageProps) {
  const [githubAuthenticate] = useSocialAuthenticateMutation()
  useSocialAuth(githubAuthenticate, "github")
  const { lang } = params

  return (
    <div className="m-auto flex flex-col items-center gap-6">
      <ColorfulSpinner size={64} withShadow />
      <div className="flex flex-col items-center">
        <VscGithub size={48} />
        <span>
          {t(lang, {
            en: "Authenticating with GitHub...",
            fr: "Authentification en cours avec GitHub...",
            ko: "GitHub에서 인증하는 중...",
          })}
        </span>
      </div>
    </div>
  )
}
