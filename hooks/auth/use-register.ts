"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { registerUser } from "@/utils-api/client/auth/registerUser"

export default function useRegister() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  })

  const { first_name, last_name, email, password, re_password } = formData

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!first_name) {
      toast.warn("Field required: first_name")
      return
    }
    if (!last_name) {
      toast.warn("Field required: last_name")
      return
    }
    if (!email) {
      toast.warn("Field required: email")
      return
    }
    if (!password) {
      toast.warn("Field required: password")
      return
    }
    if (!re_password) {
      toast.warn("Field required: password confirmation")
      return
    }
    if (password !== re_password) {
      toast.warn("Password confirmation does not match password")
      return
    }
    setIsLoading(true)
    const { statusCode, networkError, data } = await registerUser(formData)
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
      router.push("/auth/login?register=true")
    } else {
      setIsLoading(false)
      toast.error(`Uncaught error`)
    }
  }

  return {
    first_name,
    last_name,
    email,
    password,
    re_password,
    isLoading,
    onChange,
    onSubmit,
  }
}
