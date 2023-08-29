import { PasswordResetConfirmForm } from "@/components/auth-forms"
import { Locale, WithLocaleParam, t } from "@/i18n-config"
import { getDictionary } from "@/utils/server/get-dictionary"
import type { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"

export async function generateMetadata(
  { params, searchParams }: WithLocaleParam & WithSearchParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  const { meta, routes } = dict
  return {
    title: `${routes.new_pw} | ${meta.title}`,
    description: `${meta.description}`,
  }
}

export default function Page({
  params: { lang, uid, token },
}: WithLocaleParam<{
  uid: string
  token: string
}>) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto"
          width={64}
          height={64}
          src="/letter_64.png"
          alt="Logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {t(lang, {
            en: "New password",
            fr: "Nouveau mot de passe",
            ko: "새 비밀번호 만들기",
          })}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <PasswordResetConfirmForm
          currentLocale={lang}
          uid={uid}
          token={token}
        />
      </div>
    </div>
  )
}
