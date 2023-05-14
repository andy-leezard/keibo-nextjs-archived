"use client"

import Button from "@/components/ui/button"
import { WithLocale, t } from "@/i18n-config"
import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { Key } from "react"
import { MenuButton } from "@/components/ui/menu/Menu"
import { Section, Item } from "react-stately"

export const AuthState = ({ currentLocale }: WithLocale) => {
  const session =
    useSession(/* {
    required: true,
    onUnauthenticated(){
      redirect('/signin?callback=/here')
    }
  } */)
  const router = useRouter()
  const pathname = usePathname()

  /* useEffect(() => {
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
  }, []) */

  const handleSessionMenu = (key: Key) => {
    switch (key) {
      case "signout":
        signOut()
        break
      default:
        console.error(`Unhandled menu key ${key}`)
        break
    }
  }

  if (pathname.includes("auth")) {
    return <></>
  }

  return (
    <>
      {session ? (
        <>
          <MenuButton
            label={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {session.data?.user?.image ? (
                  <Image
                    src={session.data.user.image}
                    width={28}
                    height={28}
                    style={{ borderRadius: "4px" }}
                    alt={session.data.user?.name ?? "profile"}
                  />
                ) : (
                  <></>
                )}
                <span>
                  {session.data?.user?.name ??
                    session.data?.user?.email ??
                    "User"}
                </span>
              </div>
            }
            onAction={handleSessionMenu}
          >
            {/* <Section>
                <Item key="edit">Edit…</Item>
                <Item key="duplicate">Duplicate</Item>
              </Section>
              <Section>
                <Item key="move">Move…</Item>
                <Item key="rename">Rename…</Item>
              </Section> */}
            <Section>
              {/* <Item key="archive">Archive</Item> */}
              <Item key="signout">
                {t(currentLocale, {
                  en: "Sign out",
                  fr: "Se deconnecter",
                  ko: "로그아웃",
                })}
              </Item>
            </Section>
          </MenuButton>
        </>
      ) : (
        <Button
          /* onPressStart={() => console.log("on press START")}
      onPressEnd={() => console.log("on press END")} */
          transparency
          corner="capsule"
          aria-label="Authenticate"
          onPress={() => signIn()}
          /* theme="blueish" */
        >
          {t(currentLocale, {
            en: "Sign in",
            fr: "Se connecter",
            ko: "로그인",
          })}
        </Button>
      )}
    </>
  )
}
