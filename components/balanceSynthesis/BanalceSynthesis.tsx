"use client"

import { useLayoutEffect, useState } from "react"
import { shuffleArray } from "@/utils/client"
import { TypingText } from "./TypingText"
import { Button } from "../ui"
import { WithLocale, t } from "@/i18n-config"
import { slogans } from "./constants"
import { ColorfulSpinner } from "../ui/loaders"
import { usePathname, useRouter } from "next/navigation"
import Warning from "../warning/Warning"
import Link from "next/link"
import { useAppSelector } from "@/redux/hooks"

type banalceSynthesisProps = WithLocale & {}

const BanalceSynthesis = ({ currentLocale }: banalceSynthesisProps) => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth)

  const router = useRouter()
  const pathname = usePathname()
  const [wallets, setWallets] = useState<any | null>(null)
  const [fetchingWallets, setFetchingWallets] = useState(true)
  const [sessionError, setSessionError] = useState(false)
  const [textList] = useState(
    shuffleArray(slogans.map((s) => t(currentLocale, s)))
  )

  const navigateToAddWalletPage = () => {
    if (!pathname) {
      return
    }
    const segments = pathname.split("/").slice(0, 2)
    segments.push("add-wallet")
    console.log(segments.join("/"))
    router.push(segments.join("/"))
    /* router.push(segments.join("/")) */
  }

  useLayoutEffect(() => {
    const fetchWallets = async () => {
      /* if (session?.user?.id) {
        const [kuser, error] = await fetchFirestore<KeiboFirestoreUser>(
          "users",
          [session.user.id]
        )
        if (!kuser) {
          setSessionError(true)
          return
        }
        if (kuser.wallets && process.env.NODE_ENV !== "production") {
          return
        }
        const update_payload: Partial<KeiboFirestoreUser> = {
          last_activity: new Date().toISOString(),
          last_activity_unix: Date.now(),
          platform: "web",
        }
        if (!kuser.wallets) {
          update_payload.wallets = []
        }
        await updateFirestore("users", [session.user.id], update_payload)
      } else {
        setWallets(null)
      } */
    }
    fetchWallets().then(() => setFetchingWallets(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-4 m-auto rounded-md bg-sky-200 dark:bg-indigo-500">
      <div className="flex flex-col items-center justify-center text-center">
        {isLoading || fetchingWallets ? (
          <ColorfulSpinner size={64} withShadow />
        ) : (
          <>
            {isAuthenticated ? (
              <>
                {sessionError ? (
                  <>
                    <Warning currentLocale={currentLocale} />
                  </>
                ) : wallets ? (
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
                      onPress={() => navigateToAddWalletPage()}
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
                  <TypingText
                    texts={textList}
                    waitbt={50}
                    wait={3000}
                    speed={27}
                  />
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
          </>
        )}
        {process.env.NODE_ENV !== "production" ? (
          <>
            <Button
              onPress={() => {
                fetch(
                  `http://localhost:${
                    process.env.PORT ?? 3000
                  }/api/assets/crypto?size=10&page=2`
                )
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Network response was not ok")
                    }
                    return response.json()
                  })
                  .then((data) => {
                    // You can work with your data here
                    console.log(data)
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              }}
              style={{ marginTop: "0.5rem" }}
              corner="rounded"
            >
              API TEST
            </Button>
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
