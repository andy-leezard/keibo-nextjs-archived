"use client"

import Button from "@/components/ui/button"
import { WithLocale, t } from "@/i18n-config"
import { auth } from "@/lib/client/firebase"
import { updateFirestore } from "@/lib/client/firebase/firestore"
import { log } from "@/utils/client"
import { User } from "firebase/auth"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const AuthState = ({ currentLocale }: WithLocale) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const auth_unsubscribe = auth.onAuthStateChanged(async (user) => {
      log("AuthWrapper.tsx - defining user status...")
      log(user ? `USER : ${JSON.stringify(user.uid)}` : "NOT SIGNED IN")
      if (user) {
        if (user.email) {
          await updateFirestore("users", [user.email, "platform", "web"], {
            lastActivity: new Date().toUTCString(),
            lastActivityUnix: new Date().getTime(),
          })
        }
      }
      setUser(user)
    })
    return () => {
      auth_unsubscribe()
    }
  }, [])

  if (pathname.includes("auth")) {
    return <></>
  }

  if (user) {
    return <span onClick={() => auth.signOut()}>{user.email}</span>
  }

  return (
    <Button
      /* onPressStart={() => console.log("on press START")}
      onPressEnd={() => console.log("on press END")} */
      transparency
      corner="capsule"
      aria-label="Authenticate"
      onPress={() => {
        const segments = pathname.split("/")
        if (segments.length <= 2) {
          router.push(`${currentLocale}/auth`)
        } else {
          segments[2] = "auth"
          router.push(segments.slice(0, 3).join("/"))
        }
      }}
      /* theme="blueish" */
    >
      {t(currentLocale, {
        en: "Sign in",
        fr: "Se connecter",
        ko: "로그인",
      })}
    </Button>
  )
}
