"use client"

import React, { useContext, useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import styles from "./BalanceSynthesis.module.css"
import { shuffleArray } from "@/utils/client"
import { TypingText } from "./TypingText"
import { Button } from "../ui"
import { WithLocale, t } from "@/i18n-config"

type banalceSynthesisProps = WithLocale & {}

const BanalceSynthesis = ({ currentLocale }: banalceSynthesisProps) => {
  const { data: session } = useSession()
  const [textList] = useState(
    shuffleArray([
      t(currentLocale, {
        en: "favorite investment portfolio tracker",
        fr: "tracker de portefeuille d'investissement préféré",
        ko: "투자 포트폴리오 트래커",
      })
      ,
      t(currentLocale, {
        en: "personal financial analytics",
        fr: "analyse financière personnelle",
        ko: "가계부 분석 앱",
      })
      ,
      t(currentLocale, {
        en: "investment & trading simulator",
        fr: "simulateur d'investissement et de trading",
        ko: "투자 & 트레이딩 시뮬레이터",
      })
      ,
      t(currentLocale, {
        en: "new budget app",
        fr: "nouvelle app de budgét",
        ko: "예산 지출 관리 앱",
      })
    ])
  )

  useEffect(() => {
    if (session) {
    }
  }, [session])

  return (
    <div id={styles.wrapper}>
      {session ? (
        <></>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            userSelect: "none",
          }}
        >
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
          <Button
            onPress={() => signIn()}
            style={{ marginTop: "0.5rem" }}
            corner="rounded"
          >
            {t(currentLocale, {
              en: "Sign in",
              fr: "Se connecter",
              ko: "로그인",
            })}
          </Button>
        </div>
      )}
    </div>
  )
}

export default BanalceSynthesis
