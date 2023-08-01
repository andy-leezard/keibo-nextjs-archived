import { MyPageSidebar } from "@/components/layout/sidebar"
import { RequireAuth } from "@/components/utils"
import { WithLocaleParam } from "@/i18n-config"

interface LayoutProps extends WithLocaleParam {
  children: React.ReactNode
}

export default async function Layout({ children, params }: LayoutProps) {
  return (
    <main className="flex flex-1 flex-col sm:flex-row">
      <MyPageSidebar currentLocale={params.lang} />
      <RequireAuth>{children}</RequireAuth>
    </main>
  )
}
