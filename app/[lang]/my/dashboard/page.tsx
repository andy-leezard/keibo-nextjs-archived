"use client"

import { useRetrieveUserQuery } from "@/redux/features/authApiSlice"
import { List } from "@/components/common"
import { ColorfulSpinner } from "@/components/ui/loaders"

export default function Page() {
  const { data: user, isLoading, isFetching } = useRetrieveUserQuery()

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
      {isLoading || isFetching ? (
        <ColorfulSpinner size={64} withShadow />
      ) : (
        <List config={config} />
      )}
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
