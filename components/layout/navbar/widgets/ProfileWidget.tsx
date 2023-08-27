"use client"

import Skeleton from "@/components/ui/skeleton/Skeleton"
import { WithLocale, t } from "@/i18n-config"
import styled from "styled-components"

const Container = styled.div`
  width: 250px;
`

type ProfileWidgetProps = WithLocale & {
  user?: SerializedUser
}

const ProfileWidget = ({ currentLocale, user }: ProfileWidgetProps) => {
  return (
    <Container className="inline-flex font-medium pl-4 pt-4 pb-2 text-lg">
      {!user ? (
        <Skeleton className="rounded-md w-full h-7" />
      ) : (
        <div className="flex flex-col">
          <span>
            {t(currentLocale, {
              en: "Hello, ",
              fr: "Bonjour, ",
              ko: "환영합니다, ",
            })}
            {currentLocale === "ko"
              ? `${user?.last_name}${user?.first_name}님`
              : `${user?.first_name} ${user?.last_name}`}
          </span>
          <span className="text-xs">{user?.email}</span>
        </div>
      )}
    </Container>
  )
}

export default ProfileWidget
