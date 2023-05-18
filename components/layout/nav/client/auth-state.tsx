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
import { Session } from "next-auth"

type AuthStateProps = WithLocale & {
  session: Session | null
}

export const AuthState = ({ currentLocale, session }: AuthStateProps) => {
  const router = useRouter()
  const pathname = usePathname()

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
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    width={28}
                    height={28}
                    style={{ borderRadius: "4px" }}
                    alt={session.user?.name ?? "profile"}
                  />
                ) : (
                  <></>
                )}
                <span>
                  {session.user?.name ?? session.user?.email ?? "User"}
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
