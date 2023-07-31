import { PasswordResetForm } from "@/components/auth-forms"
import { WithLocaleParam } from "@/i18n-config"
import { getDictionary } from "@/utils/server/get-dictionary"
import type { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"

export async function generateMetadata(
  { params, searchParams }: WithLocaleParam & WithSearchParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  const { meta, routes } = dict
  return {
    title: `${meta.title} ${routes.reset_pw}`,
    description: `${meta.description}`,
  }
}

export const metadata: Metadata = {
  title: "Full Auth | Password Reset",
  description: "Full Auth password reset page",
}

export default function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto"
          width={64}
          height={64}
          src="/letter_64.png"
          alt="Logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <PasswordResetForm />
      </div>
    </div>
  )
}
