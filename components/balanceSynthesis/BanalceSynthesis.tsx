"use client"

import { useState } from "react"
import { shuffleArray } from "@/utils/client"
import { TypingText } from "./TypingText"
import { Button } from "../ui"
import { WithLocale, t } from "@/i18n-config"
import { slogans } from "./constants"
import { useRouter } from "next/navigation"
import Link from "next/link"

type banalceSynthesisProps = WithLocale & {
  user: SerializedUser | null
}

const BanalceSynthesis = ({ currentLocale, user }: banalceSynthesisProps) => {
  const router = useRouter()
  const [textList] = useState(
    shuffleArray(slogans.map((s) => t(currentLocale, s)))
  )
  const wallets: SerializedWallet[] = []

  return (
    <div className="p-4 m-auto rounded-md bg-sky-200 dark:bg-indigo-500">
      <div className="flex flex-col items-center justify-center text-center">
        {user ? (
          <>
            {wallets ? (
              <>
                <span style={{ fontSize: "2rem" }}>🚀 Your Summary 🚀</span>
              </>
            ) : (
              <>
                <p>
                  {t(currentLocale, {
                    en: "You currently have no wallets registered",
                    fr: "Vous n'avez actuellement aucun portefeuille enregistré",
                    ko: "현재 등록된 지갑이 없습니다.",
                  })}
                </p>
                <Button
                  onPress={() => router.push("accounts/new-wallet")}
                  style={{ marginTop: "1rem" }}
                  corner="rounded"
                >
                  {t(currentLocale, {
                    en: "Create your first wallet 🚀",
                    fr: "Créer mon premier wallet 🚀",
                    ko: "지갑 생성하기 🚀",
                  })}
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <h2>🚀 WELCOME TO KEIBO 🚀</h2>
            <div className="flex">
              <span>
                {t(currentLocale, {
                  en: "Your",
                  fr: "Votre",
                  ko: "당신의",
                })}
                {String.fromCharCode(160)}
              </span>
              <TypingText texts={textList} waitbt={50} wait={3000} speed={27} />
            </div>
            <Link
              href="/auth/login"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {t(currentLocale, {
                en: "Sign in",
                fr: "Se connecter",
                ko: "로그인",
              })}
            </Link>
          </>
        )}
        {process.env.NODE_ENV !== "production" ? (
          <>
            <code>Public host: {process.env.NEXT_PUBLIC_HOST}</code>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default BanalceSynthesis
