import { WithLocaleParam } from "@/i18n-config"

type PageProps = WithLocaleParam & WithSearchParams

export default function Page({ params, searchParams }: PageProps) {
  return (
    <main style={{ display: "flex", flex: 1 }}>
      Targeting
    </main>
  )
}
