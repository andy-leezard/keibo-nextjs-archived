import { RegisterForm } from "@/components/auth-forms"
import { SocialButtons } from "@/components/common"
import { Locale, t } from "@/i18n-config"
import Link from "next/link"

type PageProps = {
  params: { lang: Locale }
}

function Page({ params }: PageProps) {
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
        {t(params.lang, {
          en: "Sign up for your account",
          fr: "Créer votre compte",
          ko: "계정 만들기",
        })}
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <RegisterForm />
        <SocialButtons />
        <p className="mt-10 text-center text-sm text-gray-600 dark:text-gray-300">
          {t(params.lang, {
            en: "Already have an account?",
            fr: "Vous avez déjà un compte ?",
            ko: "계정이 이미 있으신가요?",
          })}
          &nbsp;
          <Link
            href="/auth/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Login here
          </Link>
        </p>
      </div>
    </>
  )
}

export default Page
