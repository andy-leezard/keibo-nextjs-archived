"use client"

import { useResetPassword } from "@/hooks/redux"
import { Form } from "@/components/auth-forms"
import { WithLocale, t } from "@/i18n-config"

export default function PasswordResetForm({ currentLocale }: WithLocale) {
  const { email, isLoading, onChange, onSubmit } = useResetPassword()

  const config = [
    {
      labelText: "Email address",
      labelId: "email",
      type: "email",
      onChange,
      value: email,
      required: true,
    },
  ]

  return (
    <Form
      config={config}
      isLoading={isLoading}
      btnText={t(currentLocale, {
        en: "Request email verification",
        fr: "Demander la vérification par mail",
        ko: "인증 이메일 받기",
      })}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
}
