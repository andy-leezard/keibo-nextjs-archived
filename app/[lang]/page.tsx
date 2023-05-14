import { Locale } from "@/i18n-config"
import { getDictionary } from "@/utils/server/get-dictionary"
/* import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route" */

type PageProps = {
  params: { lang: Locale }
  searchParams: SearchParams
}

export default async function Page({ params, searchParams }: PageProps) {
  /* const session = await getServerSession(authOptions)
  console.log({ hello: "hello from server", ...session }) */
  const dict = await getDictionary(params.lang) // en
  return (
    <main style={{ display: "flex", flex: 1 }}>
      <span>{dict.Home.title}</span>
    </main>
  )
}
