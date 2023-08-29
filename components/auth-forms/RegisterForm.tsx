"use client"

import { Form } from "@/components/auth-forms"
import { useRegister } from "@/hooks/auth"
import { WithLocale, t } from "@/i18n-config"

type RegisterFormProps = WithLocale

export default function RegisterForm({ currentLocale }: RegisterFormProps) {
  const {
    first_name,
    last_name,
    email,
    password,
    re_password,
    isLoading,
    onChange,
    onSubmit,
  } = useRegister()

  const config = [
    {
      labelText: t(currentLocale, {
        en: "Email address",
        fr: "Adresse mail",
        ko: "메일 주소",
      }),
      labelId: "email",
      type: "email",
      value: email,
      required: true,
    },
    {
      labelText: t(currentLocale, {
        en: "First name",
        fr: "Prénom",
        ko: "이름",
      }),
      labelId: "first_name",
      type: "text",
      value: first_name,
      required: true,
    },
    {
      labelText: t(currentLocale, {
        en: "Last name",
        fr: "Nom",
        ko: "성",
      }),
      labelId: "last_name",
      type: "text",
      value: last_name,
      required: true,
    },
    {
      labelText: t(currentLocale, {
        en: "Password",
        fr: "Mot de passe",
        ko: "비밀번호",
      }),
      labelId: "password",
      type: "password",
      value: password,
      required: true,
    },
    {
      labelText: t(currentLocale, {
        en: "Confirm password",
        fr: "Confirmation de mot de passe",
        ko: "비밀번호 재확인",
      }),
      labelId: "re_password",
      type: "password",
      value: re_password,
      required: true,
    },
  ]

  return (
    <Form
      config={config}
      isLoading={isLoading}
      btnText="Sign up"
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
}
