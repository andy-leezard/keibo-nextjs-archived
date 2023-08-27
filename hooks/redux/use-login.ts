import { useState, ChangeEvent, FormEvent } from "react"
import { toast } from "react-toastify"
import { signIn } from "next-auth/react"
import { jwtCreate } from "@/utils/common/auth"

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isLoading) return
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) {
      toast.warn("Field required: email")
      return
    }
    if (!password) {
      toast.warn("Field required: password")
      return
    }
    setIsLoading(true)
    const { statusCode, networkError, data } = await jwtCreate({
      email,
      password,
    })
    if (networkError) {
      setIsLoading(false)
      toast.error(
        `Network error occurred ${
          statusCode ? `with status Code: ${statusCode}` : ""
        }`
      )
      return
    }
    if (data) {
      await signIn("credentials", {
        ...data,
        redirect: true,
        callbackUrl: `${window.location.origin}/my/dashboard`,
      })
    } else {
      toast.error(`Uncaught error`)
    }
  }

  return {
    email,
    password,
    isLoading,
    onChange,
    onSubmit,
  }
}
