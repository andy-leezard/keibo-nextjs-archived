export default async function HomeLayout({
  children,
}: // params,
{
  children: React.ReactNode
  // params: { lang: Locale }
}) {
  return (
    <main className="fixed inset-0 flex">
      <div className="relative flex flex-1 flex-col overflow-y-auto max-h-screen">
        {children}
      </div>
    </main>
  )
}
