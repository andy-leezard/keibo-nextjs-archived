import { RegisterForm } from "@/components/auth-forms"
import { SocialButtons } from "@/components/common"
import { Locale, t } from "@/i18n-config"
import Link from "next/link"
import classNames from "classnames"

type PageProps = {
  params: { lang: Locale }
}

function Page({ params }: PageProps) {
  const { lang } = params
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
        {t(lang, {
          en: "Sign up for your account",
          fr: "Créer votre compte",
          ko: "계정 만들기",
        })}
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <RegisterForm />
        <p className="mt-10 text-center text-sm text-gray-600 dark:text-gray-300">
          {t(lang, {
            en: "Already have an account?",
            fr: "Vous avez déjà un compte ?",
            ko: "계정이 이미 있으신가요?",
          })}
          &nbsp;
          <Link
            href="/auth/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {t(lang, {
              en: "Sign in",
              fr: "Se connecter",
              ko: "로그인",
            })}
          </Link>
        </p>
        <div
          className={classNames(
            "g-separator",
            "w-full flex flex-row uppercase text-xs font-medium m-0 pb-6"
          )}
        >
          <span className="text-center m-0">OR</span>
        </div>
        <SocialButtons currentLocale={lang} />
      </div>
    </>
  )
}

export default Page
