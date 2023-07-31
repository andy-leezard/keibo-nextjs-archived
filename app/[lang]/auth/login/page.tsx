import { LoginForm } from "@/components/auth-forms"
import { SocialButtons } from "@/components/common"
import { Locale, t } from "@/i18n-config"
import Link from "next/link"
import React from "react"

type PageProps = {
  params: { lang: Locale }
}

function Page({ params }: PageProps) {
  return (
    <>
      <h2 className="mt-10 text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight">
        {t(params.lang, {
          en: "Sign in to your account",
          fr: "Connectez-vous à votre compte",
          ko: "당신의 계정에 연결하세요",
        })}
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
        <SocialButtons />
        <p className="mt-10 text-center text-sm text-gray-600 dark:text-gray-300">
          {t(params.lang, {
            en: "Don't have an account yet?",
            fr: "Vous n'avez pas encore de compte ?",
            ko: "계정이 아직 없으신가요?",
          })}
          &nbsp;&nbsp;&nbsp;
          <Link
            href="/auth/register"
            className="font-bold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {t(params.lang, {
              en: "Register here",
              fr: "Inscrivez-vous ici",
              ko: "회원가입하기",
            })}
          </Link>
        </p>
      </div>
    </>
  )
}

export default Page
