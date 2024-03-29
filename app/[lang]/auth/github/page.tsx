"use client"

import { ColorfulSpinner } from "@/components/ui/loaders"
import { WithLocaleParam, t } from "@/i18n-config"
import { VscGithub } from "react-icons/vsc"
import { useEffect } from "react"
import { signIn } from "next-auth/react"
import { toast } from "react-toastify"
import { socialSignin } from "@/utils-api/client/auth/socialSignIn"

type PageProps = WithLocaleParam & WithSearchParams

export default function Page({ params, searchParams }: PageProps) {
  const { state, code } = searchParams ?? {}
  const { lang } = params

  useEffect(() => {
    if (
      !state ||
      !code ||
      typeof state !== "string" ||
      typeof code !== "string"
    ) {
      console.log("NO PARAMS")
    } else {
      const auth = async () => {
        const { statusCode, networkError, data } = await socialSignin({
          provider: "github",
          state,
          code,
        })
        if (networkError) {
          // setIsLoading(false)
          toast.error(
            `Network error occurred ${
              statusCode ? `with status Code: ${statusCode}` : ""
            }`
          )
          return
        }
        if (data) {
          await signIn("credentials", {
            ...data,
            redirect: true,
            callbackUrl: `${window.location.origin}/my/dashboard`,
          })
        } else {
          toast.error(`Uncaught error`)
        }
      }
      auth()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
