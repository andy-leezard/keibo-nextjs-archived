"use client"

import React, { useEffect, useLayoutEffect, useState } from "react"
import styles from "./BalanceSynthesis.module.css"
import { shuffleArray } from "@/utils/client"
import { TypingText } from "./TypingText"
import { Button } from "../ui"
import { WithLocale, t } from "@/i18n-config"
import { slogans } from "./constants"
import { ColorfulSpinner } from "../ui/loaders"
import { usePathname, useRouter } from "next/navigation"
import Warning from "../warning/Warning"
import Link from "next/link"
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice"

type banalceSynthesisProps = WithLocale & {}

const BanalceSynthesis = ({ currentLocale }: banalceSynthesisProps) => {
  const { data: user, isLoading, isFetching } = useRetrieveUserQuery()
  const router = useRouter()
  const pathname = usePathname()
  const [wallets, setWallets] = useState<any | null>(null)
  const [loaded, setLoaded] = useState(false)
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
    fetchWallets().then(() => setLoaded(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log({ user, isLoading, isFetching })

  return (
    <div id={styles.wrapper}>
      <div id={styles.container}>
        {process.env.NEXT_PUBLIC_HOST}
        {user ? (
          <>
            {loaded ? (
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
                <ColorfulSpinner size={48} />
              </>
            )}
          </>
        ) : (
          <>
            <span style={{ fontSize: "2rem" }}>🚀 WELCOME TO KEIBO 🚀</span>
            <div style={{ display: "flex" }}>
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
        <Button
          onPress={() => {
            fetch(
              `http://localhost:${
                process.env.PORT ?? 3000
              }/api/crypto?size=10&page=2`
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
      </div>
    </div>
  )
}

export default BanalceSynthesis
