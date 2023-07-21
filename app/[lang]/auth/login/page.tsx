import { LoginForm } from "@/components/auth-forms"
import { SocialButtons } from "@/components/common"
import { Locale, t } from "@/i18n-config"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type PageProps = {
  params: { lang: Locale }
}

function Page({ params }: PageProps) {
  return (
    <div className="flex flex-col p-4 m-auto">
      <div className="flex flex-col items-center">
        <Link href={`/${params.lang}`}>
          <Image
            className="mx-auto"
            width={64}
            height={64}
            src="/letter_64.png"
            alt="Logo"
            title="Home"
          />
        </Link>
        <h2 className="mt-10 text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight">
          {t(params.lang, {
            en: "Sign in to your account",
            fr: "Connectez-vous à votre compte",
            ko: "당신의 계정에 연결하세요",
          })}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
        <SocialButtons />
        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Page
