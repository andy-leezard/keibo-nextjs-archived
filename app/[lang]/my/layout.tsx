import { MyPageSidebar } from "@/components/layout/sidebar"
import { WithLocaleParam } from "@/i18n-config"
import { PropsWithChildren } from "react"

type LayoutProps = WithLocaleParam & PropsWithChildren

export default async function Layout({ children, params }: LayoutProps) {
  return (
    <main className="flex flex-1 flex-col sm:flex-row">
      <MyPageSidebar currentLocale={params.lang} />
      {children}
    </main>
  )
}
