import { List } from "@/components/common"
import { getServerUser } from "@/utils/server/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page() {
  const {
    networkError,
    statusCode,
    data: user,
  } = await getServerUser(cookies())

  if (!user) {
    redirect("/auth/login")
  }

  const config = [
    {
      label: "First Name",
      value: user?.first_name,
    },
    {
      label: "Last Name",
      value: user?.last_name,
    },
    {
      label: "Email",
      value: user?.email,
    },
  ]

  return (
    <div className="m-auto">
      <List config={config} />
      {/* isLoading || isFetching ? (
        <ColorfulSpinner size={64} withShadow />
      ) : (
        <List config={config} />
      ) */}
      {/* <div className='bg-white dark:bg-slate-400 shadow'>
				<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold tracking-tight'>
						Dashboard
					</h1>
				</div>
			</div>
			<main className='mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8'>
				<List config={config} />
			</main> */}
    </div>
  )
}
