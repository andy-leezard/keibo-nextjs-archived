"use client"

import { useResetPasswordConfirm } from "@/hooks/redux"
import { Form } from "@/components/auth-forms"
import { Locale, t } from "@/i18n-config"

interface Props {
  currentLocale: Locale
  uid: string
  token: string
}

export default function PasswordResetConfirmForm({
  currentLocale,
  uid,
  token,
}: Props) {
  const { new_password, re_new_password, isLoading, onChange, onSubmit } =
    useResetPasswordConfirm(uid, token)

  const config = [
    {
      labelText: "New password",
      labelId: "new_password",
      type: "password",
      onChange,
      value: new_password,
      required: true,
    },
    {
      labelText: "Confirm new password",
      labelId: "re_new_password",
      type: "password",
      onChange,
      value: re_new_password,
      required: true,
    },
  ]

  return (
    <Form
      config={config}
      isLoading={isLoading}
      btnText={t(currentLocale, {
        en: "Confirm",
        fr: "Confirmer",
        ko: "확인"
      })}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
}
