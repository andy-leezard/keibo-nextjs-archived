"use client"

import { VscGithub } from "react-icons/vsc"
import { FcGoogle } from "react-icons/fc"
import { SocialButton } from "@/components/common"
import { continueWithGoogle, continueWithGithub } from "@/utils/client"
import { WithLocale, t } from "@/i18n-config"

type SocialButtonsProps = WithLocale & {}

export default function SocialButtons({ currentLocale }: SocialButtonsProps) {
  return (
    <div className="flex flex-col justify-between items-center gap-2 mt-3">
      <SocialButton provider="google" onClick={continueWithGoogle}>
        <FcGoogle className="mr-3" size={24} />
        <span>
          {t(currentLocale, {
            en: "Connect with Google",
            fr: "Se connecter avec Google",
            ko: "Google 로그인",
          })}
        </span>
      </SocialButton>
      <SocialButton provider="github" onClick={continueWithGithub}>
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
