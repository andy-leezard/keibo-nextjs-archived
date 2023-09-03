import { PasswordResetForm } from "@/components/auth-forms"
import { WithLocaleParam, t } from "@/i18n-config"
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
    title: `${routes.reset_pw} | ${meta.title}`,
    description: `${meta.description}`,
  }
}

export default function Page({
  params,
  searchParams,
}: WithLocaleParam & WithSearchParams) {
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
          {t(params.lang, {
            en: "Reset your password",
            fr: "Réinitialiser le mot de passe",
            ko: "비밀번호 재설정",
          })}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <PasswordResetForm currentLocale={params.lang} />
      </div>
    </div>
  )
}
