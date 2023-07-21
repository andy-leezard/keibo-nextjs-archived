import { RegisterForm } from "@/components/auth-forms"
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
    <main>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
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
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            {t(params.lang, {
              en: "Sign up for your account",
              fr: "Créer votre compte",
              ko: "계정 만들기",
            })}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <RegisterForm />
          <SocialButtons />
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Page
