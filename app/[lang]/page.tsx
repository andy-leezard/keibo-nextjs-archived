import { Locale } from "@/i18n-config"
import { getDictionary } from "@/utils/server/get-dictionary"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Image from "next/image"

type PageProps = {
  params: { lang: Locale }
  searchParams: SearchParams
}

export default async function Page({ params, searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  /* console.log({ hello: "hello from server", ...session }) */
  const dict = await getDictionary(params.lang) // en
  return (
    <main style={{ display: "flex", flex: 1 }}>
      {session?.user ? (
        <div
          style={{
            padding: "0.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {session.user.image ? (
            <Image src={session.user.image} alt="" width={64} height={64} />
          ) : (
            <></>
          )}
          {session.user.email ? <span>{session.user.email}</span> : <></>}
          {session.user.name ? <span>{session.user.name}</span> : <></>}
        </div>
      ) : (
        <span>{dict.Home.title}</span>
      )}
    </main>
  )
}
