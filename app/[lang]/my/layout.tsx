import { RequireAuth } from "@/components/utils"
import { WithLocaleParam } from "@/i18n-config"

interface LayoutProps extends WithLocaleParam {
  children: React.ReactNode
}

export default async function Layout({ children, params }: LayoutProps) {
  return (
    <main className="flex flex-col flex-1 p-4 m-auto">
      <RequireAuth>{children}</RequireAuth>
    </main>
  )
}
