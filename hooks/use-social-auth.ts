import { useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAppDispatch } from "@/redux/hooks"
import { setAuth } from "@/redux/features/authSlice"
import { toast } from "react-toastify"

export default function useSocialAuth(authenticate: any, provider: string) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialized = useRef(false)

  useEffect(() => {
    const state = searchParams.get("state")
    const code = searchParams.get("code")

    if (state && code && !initialized.current) {
      authenticate({ provider, state, code })
        .unwrap()
        .then(() => {
          dispatch(setAuth())
          toast.success("Logged in")
          router.push("/dashboard")
        })
        .catch(() => {
          toast.error("Failed to log in")
          router.push("/auth/login")
        })
    }

    return () => {
      initialized.current = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticate, provider])
}
