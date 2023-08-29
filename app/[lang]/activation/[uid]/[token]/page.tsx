import { WithLocaleParam, t } from "@/i18n-config"
import { activateAccount } from "@/utils/client/auth"
import { redirect } from "next/navigation"

type PageProps = WithLocaleParam<{
  uid: string
  token: string
}>

export default async function Page({ params }: PageProps) {
  const { uid, token, lang } = params
  const {
    statusCode,
    networkError,
    data: user,
  } = await activateAccount({ uid, token })

  if (user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {t(lang, {
            en: `Error occurred while activating account (${statusCode})`,
            fr: `Une erreur s'est produite lors de l'activation du compte (${statusCode})`,
            ko: `계정 활성화 오류 발생 (${statusCode})`,
          })}
        </h1>
      </div>
    </div>
  )
}
