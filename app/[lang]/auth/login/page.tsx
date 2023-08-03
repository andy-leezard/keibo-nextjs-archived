import { LoginForm } from "@/components/auth-forms"
import { SocialButtons } from "@/components/common"
import { WithLocaleParam, t } from "@/i18n-config"
import classNames from "classnames"
import Link from "next/link"

type PageProps = WithLocaleParam & {}

function Page({ params }: PageProps) {
  const { lang } = params
  return (
    <>
      <h2 className="mt-10 text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight">
        {t(lang, {
          en: "Sign in to your account",
          fr: "Connectez-vous à votre compte",
          ko: "당신의 계정에 연결하세요",
        })}
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
        <p className="mt-4 mb-4 text-center text-sm text-gray-600 dark:text-gray-300">
          {t(lang, {
            en: "Don't have an account?",
            fr: "Vous n'avez pas de compte ?",
            ko: "계정이 없으신가요?",
          })}
          &nbsp;&nbsp;&nbsp;
          <Link
            href="/auth/register"
            className="font-bold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {t(lang, {
              en: "Sign up",
              fr: "Inscrivez-vous ici",
              ko: "회원가입하기",
            })}
          </Link>
        </p>
        <div
          className={classNames(
            "separator",
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
