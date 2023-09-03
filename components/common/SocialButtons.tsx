"use client"

import { VscGithub } from "react-icons/vsc"
import { FcGoogle } from "react-icons/fc"
import { SocialButton } from "@/components/common"
import { WithLocale, t } from "@/i18n-config"
import continueWithSocialAuth from "@/utils-api/client/auth/continueWithSocialAuth"

type SocialButtonsProps = WithLocale & {}

export default function SocialButtons({ currentLocale }: SocialButtonsProps) {
  return (
    <div className="flex flex-col justify-between items-center gap-2 mt-3">
      <SocialButton
        provider="google"
        onClick={() => continueWithSocialAuth("google-oauth2", "google")}
      >
        <FcGoogle className="mr-3" size={24} />
        <span>
          {t(currentLocale, {
            en: "Connect with Google",
            fr: "Se connecter avec Google",
            ko: "Google 로그인",
          })}
        </span>
      </SocialButton>
      <SocialButton
        provider="github"
        onClick={() => continueWithSocialAuth("github", "github")}
      >
        <VscGithub className="mr-3" size={24} />
        <span>
          {t(currentLocale, {
            en: "Connect with GitHub",
            fr: "Se connecter avec GitHub",
            ko: "GitHub 로그인",
          })}
        </span>
      </SocialButton>
    </div>
  )
}
