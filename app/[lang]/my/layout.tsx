import { RequireAuth } from "@/components/utils"
import { WithLocaleParam } from "@/i18n-config"
import { Navbar } from "@/components/layout"

interface LayoutProps extends WithLocaleParam {
  children: React.ReactNode
}

export default async function Layout({ children, params }: LayoutProps) {
  return (
    <RequireAuth>
      <Navbar currentLocale={params.lang} />
      {children}
    </RequireAuth>
  )
}
