"use client"

import { WithLocale, t } from "@/i18n-config"
import styles from "./AuthForm.module.css"
import Link from "next/link"
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react"
import { Button } from "../ui"
import { isValidEmailAddress } from "@/utils"
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "@/lib/client/firebase"
import {
  FirebaseAuthErrorState,
  initial_error,
  parseErrorCode,
} from "@/lib/client/firebase/utils"
import { ColorfulSpinner } from "../ui/loaders"
import { log } from "@/utils/client"
import { useSession, signIn, signOut } from "next-auth/react"

type AuthFormProps = WithLocale

const AuthForm = ({ currentLocale }: AuthFormProps) => {
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const [msg_error, setmsg_error] =
    useState<FirebaseAuthErrorState>(initial_error)
  const [processing, setProcessing] = useState(false)

  const handleEmailAddress = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const final = e.target.value.toLowerCase().replaceAll(" ", "")
    if (emailInputRef?.current) {
      emailInputRef.current.value = final
    }
  }, [])

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (processing || !emailInputRef?.current || !passwordInputRef?.current)
        return
      const email = emailInputRef.current.value
      const pw = passwordInputRef.current.value
      if (!isValidEmailAddress(email)) {
        setmsg_error({
          type: "email",
          msg: t(currentLocale, {
            en: "The email address is incorrectly formatted.",
            fr: "L'adresse mail est mal formatée.",
            ko: "이메일이 올바르지 않습니다.",
          }),
        })
        return
      }
      if (!pw) {
        setmsg_error({
          type: "pw",
          msg: t(currentLocale, {
            en: "Password is required.",
            fr: "Veuillez saisir le mot de passe.",
            ko: "비밀번호를 입력하십시오.",
          }),
        })
        return
      }
      setProcessing(true)
      try {
        await signInWithEmailAndPassword(auth, email, pw)
        log("User signed in!")
      } catch (error) {
        log(error, 2)
        setmsg_error(parseErrorCode(error, currentLocale))
      } finally {
        setProcessing(false)
      }
    },
    [currentLocale, processing]
  )

  /* const testFunc = async () => {
    const googleAuthProvider = new GoogleAuthProvider()
    try {
      const result = await test()
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      // The signed-in user info.
      const user = result?.user
      // IdP data available using getAdditionalUserInfo(result)
      console.log({
        user,
        token,
      })
      return {
        user,
        token,
      }
    } catch (_error) {
      // Handle Errors here.
      const error = _error as any
      const errorCode = error?.code
      const errorMessage = error?.message
      // The email of the user's account used.
      const email = error?.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
      console.log({
        error,
        errorCode,
        errorMessage,
        email,
      })
    }
  } */

  return (
    <form className={styles.form_base} onSubmit={onSubmit}>
      <p className={styles.title}>Welcome</p>
      {(msg_error.type === "email" || msg_error.type === "unknown") &&
      msg_error.msg ? (
        <label htmlFor="auth-input-email">{msg_error.msg}</label>
      ) : (
        <></>
      )}
      <input
        ref={emailInputRef}
        type="email"
        id="auth-input-email"
        aria-required="true"
        placeholder={t(currentLocale, {
          en: "Your email address",
          fr: "Votre adresse e-mail",
          ko: "메일 주소",
        })}
        onChange={handleEmailAddress}
        maxLength={64}
        /* pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" */
      />
      {msg_error.type === "pw" && msg_error.msg ? (
        <label htmlFor="auth-input-password">{msg_error.msg}</label>
      ) : (
        <></>
      )}
      <input
        ref={passwordInputRef}
        id="auth-input-password"
        type="password"
        aria-required="true"
        placeholder={t(currentLocale, {
          en: "Your password",
          fr: "Votre mot de passe",
          ko: "비밀번호",
        })}
        maxLength={64}
        /* pattern="\S*" */
      />
      <Button
        overrideType="submit"
        isDisabled={processing}
        corner="rounded"
        aria-label="Sign In"
        style={{ marginTop: "10px", marginBottom: "10px" }}
        theme="blueish"
      >
        {processing ? (
          <ColorfulSpinner size={20} />
        ) : (
          t(currentLocale, {
            en: "Sign in",
            fr: "Se connecter",
            ko: "로그인",
          })
        )}
      </Button>
      <Button corner="rounded" onPress={() => signIn()}>
        Sign in with Google
      </Button>
      {currentLocale === "ko" ? (
        <span>
          본 웹사이트에 로그인 및 계정생성 함으로서{" "}
          <Link href={`${currentLocale}/notice/cookies`}>쿠키 사용</Link>과{" "}
          <Link href={`${currentLocale}/notice/targeting`}>타겟형 마케팅</Link>
          을 위한 유저 메타데이터 사용에 동의합니다. 자세한 내용은{" "}
          <Link href={`${currentLocale}/notice/conditions-of-use`}>
            이용약관
          </Link>
          과{" "}
          <Link href={`${currentLocale}/notice/privacy`}>
            개인정보 처리방침
          </Link>
          을 참조 하십시오.
        </span>
      ) : currentLocale === "fr" ? (
        <span>
          En utilisant ce site web, vous acceptez les{" "}
          <Link href={`${currentLocale}/notice/conditions-of-use`}>
            Conditions générales
          </Link>{" "}
          de Keibo. Veuillez consulter notre{" "}
          <Link href={`${currentLocale}/notice/privacy`}>
            Notice Protection de vos informations personnelles
          </Link>
          , notre{" "}
          <Link href={`${currentLocale}/notice/cookies`}>Notice Cookies</Link>{" "}
          et notre{" "}
          <Link href={`${currentLocale}/notice/targeting`}>
            Notice Annonces publicitaires basées sur vos centres d&apos;intérêt
          </Link>
          .
        </span>
      ) : (
        <span>
          By continuing, you agree to Keibo&apos;s{" "}
          <Link href={`${currentLocale}/notice/conditions-of-use`}>
            Conditions of Use{" "}
          </Link>
          and{" "}
          <Link href={`${currentLocale}/notice/privacy`}>Privacy Notice</Link>.
        </span>
      )}
    </form>
  )
}

export default AuthForm
