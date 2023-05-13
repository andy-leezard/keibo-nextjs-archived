import { Locale, t } from "@/i18n-config"

export type FirebaseAuthErrorType =
  | "email"
  | "pw"
  | "username"
  | "unknown"
  | "none"
export type FirebaseAuthErrorState = {
  type: FirebaseAuthErrorType
  msg: string
}
export const initial_error: FirebaseAuthErrorState = {
  type: "none",
  msg: "",
}
export const parseErrorCode = (error: any, currentLocale: Locale) => {
  let msg =
    error?.message ??
    t(currentLocale, {
      en: "Connection error with the server",
      fr: "Erreur de connexion avec le serveur",
      ko: "서버와 연결에 실패했습니다",
    })
  let type: FirebaseAuthErrorType = "unknown"
  if (error?.code && typeof error.code === "string") {
    /* const ward = error.code.replaceAll(/[/-]/g, (match: string) =>
      match === "/" ? "." : "_"
    )
    const output_text = convert(ward, false) */
    /* if (output_text) {
      msg = output_text
    } */
    switch (error.code) {
      case "auth/operation-not-allowed":
        msg = t(currentLocale, {
          en: "This authentication method is not enabled on the server.",
          fr: "Cette méthode d'authentification n'est pas activée sur le serveur.",
          ko: "지원되지 않은 인증 방식입니다.",
        })
        break
      case "auth/invalid-email":
        msg = t(currentLocale, {
          en: "The email address is incorrectly formatted.",
          fr: "L'adresse mail est mal formatée.",
          ko: "이메일이 올바르지 않습니다.",
        })
        break
      case "auth/user-not-found":
        msg = t(currentLocale, {
          en: "There is no user record corresponding to this email address.",
          fr: "Il n'y a aucun utilisateur correspondant à cette adresse mail.",
          ko: "입력된 정보에 해당하는 유저가 없습니다.",
        })
        break
      case "email-already-in-use":
        msg = t(currentLocale, {
          en: "The email address is already in use by another account.",
          fr: "L'adresse e-mail est déjà utilisée par un autre compte.",
          ko: "해당 이메일 주소는 이미 다른 계정에서 사용 중입니다.",
        })
        break
      case "auth/wrong-password":
        msg = t(currentLocale, {
          en: "Wrong password.",
          fr: "Mot de passe incorrecte.",
          ko: "비밀번호가 틀립니다.",
        })
        break
      case "auth/weak-password":
        msg = t(currentLocale, {
          en: "Password is too simple",
          fr: "Le mot de passe est trop simple.",
          ko: "암호가 너무 짧습니다.",
        })
        break
      default:
    }
    switch (error.code) {
      case "auth/invalid-email":
      case "auth/user-not-found":
      case "email-already-in-use":
        type = "email"
        break
      case "auth/wrong-password":
      case "auth/weak-password":
        type = "pw"
        break
      default:
    }
  }
  return {
    type: type,
    msg: msg,
  }
}
