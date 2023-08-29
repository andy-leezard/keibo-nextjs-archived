import { WithLocaleParam } from "@/i18n-config"
import BanalceSynthesis from "@/components/balanceSynthesis"
import { cookies } from "next/headers"
import { getServerUser } from "@/utils/server/auth"

type PageProps = WithLocaleParam & WithSearchParams

export default async function Page({ params, searchParams }: PageProps) {
  const {
    networkError,
    statusCode,
    data: user,
  } = await getServerUser(cookies())

  return (
    <>
      <main className="relative flex flex-1 flex-col">
        <BanalceSynthesis currentLocale={params.lang} user={user} />
      </main>
    </>
  )
}
