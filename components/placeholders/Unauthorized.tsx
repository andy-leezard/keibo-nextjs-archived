"use client"

import { WithLocale, t } from "@/i18n-config"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BsDiscord } from "react-icons/bs"

type UnauthorizedProps = WithLocale & {}

const Unauthorized = ({ currentLocale }: UnauthorizedProps) => {
  const router = useRouter()
  return (
    <div className="flex flex-1 flex-col text-center m-auto justify-center">
      <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
        {t(currentLocale, {
          en: `Uncaught error`,
          fr: `Erreur`,
          ko: `예기치 않은 오류가 발생했습니다.`,
        })}
      </p>
      <Image
        className="self-center"
        src={"/custom_icons/under_construction.webp"}
        alt=""
        width={200}
        height={200}
      />
      {/* <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
        {t(currentLocale, {
          en: "You don't have permission to view the content of this page.",
          fr: "Vous n'êtes pas autorisé à consulter le contenu de cette page.",
          ko: "해당 내용에 관한 권한이 없습니다.",
        })}
      </h1> */}
      {/* <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
        {t(currentLocale, {
          en: "Please double-check the user account you are currently using.",
          fr: "Veuillez vérifier le compte d'utilisateur que vous utilisez actuellement.",
          ko: "현재 사용중인 아이디를 재확인하십시오.",
        })}
      </p> */}
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <button
          type="button"
          className="rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => router.back()}
        >
          {t(currentLocale, {
            en: "Go back",
            fr: "Retourner",
            ko: "돌아가기",
          })}
        </button>
        <a
          href="https://discord.gg/X3fW8MAabT"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-semibold"
        >
          {t(currentLocale, {
            en: "Contact support",
            fr: "Contacter le support client",
            ko: "고객지원",
          })}{" "}
          <span aria-hidden="true">&nbsp;&nbsp;&rarr;&nbsp;&nbsp;</span>
          <BsDiscord
            size={30}
            color={"#5662f6"}
          />
        </a>
      </div>
    </div>
  )
}

export default Unauthorized
