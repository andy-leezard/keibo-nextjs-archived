import { ChangeEvent, PropsWithChildren } from "react"
import Link from "next/link"

type InputProps = PropsWithChildren & {
  labelId: string
  type: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
  link?: {
    linkText: string
    linkUrl: string
  }
  required?: boolean
}

export default function Input({
  labelId,
  type,
  onChange,
  value,
  children,
  link,
  required = false,
}: InputProps) {
  return (
    <div>
      <div className="flex justify-between align-center">
        <label
          htmlFor={labelId}
          className="block text-sm font-medium leading-6"
        >
          {children}
        </label>
        {link && (
          <div className="text-sm">
            <Link
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              href={link.linkUrl}
            >
              {link.linkText}
            </Link>
          </div>
        )}
      </div>
      <input
        id={labelId}
        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-zinc-800"
        name={labelId}
        type={type}
        onChange={onChange}
        value={value}
        required={required}
      />
    </div>
  )
}
