import { WithLocaleParam } from "@/i18n-config"
import BanalceSynthesis from "@/components/balanceSynthesis"
import { getUser } from "@/utils/common/auth"
import { cookies } from "next/headers"

type PageProps = WithLocaleParam & WithSearchParams

export default async function Page({ params, searchParams }: PageProps) {
  const {
    networkError,
    statusCode,
    data: user,
  } = await getUser(cookies().toString())
  
  return (
    <>
      <main className="relative flex flex-1 flex-col">
        <BanalceSynthesis currentLocale={params.lang} user={user} />
      </main>
    </>
  )
}
