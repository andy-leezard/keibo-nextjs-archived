import { Locale } from "@/i18n-config"
import { BsFillShieldLockFill } from "react-icons/bs"

export default function HomeLayout({
  children,
  params,
}: // params,
{
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <>
      <div className="inline-flex justify-center align-center pt-2 pb-2 gap-2 bg-slate-300 dark:bg-slate-700">
        <BsFillShieldLockFill
          size={18}
          className="mt-0.5 text-lime-700 dark:text-lime-400"
        />
        <span>
          URL verification:{" "}
          <span className="font-bold">
            <span className="text-lime-700 dark:text-lime-400">https://</span>
            <span className="font-bold">keibo.app</span>
          </span>
        </span>
      </div>
      <main className="flex flex-col p-4 m-auto">{children}</main>
    </>
  )
}
