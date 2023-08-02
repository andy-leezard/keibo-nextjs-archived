"use client"

import { ImGoogle } from "react-icons/im"
import { SocialButton } from "@/components/common"
import { continueWithGoogle } from "@/utils/client"

export default function SocialButtons() {
  return (
    <div className="flex justify-between items-center gap-2 mt-3">
      <SocialButton provider="google" onClick={continueWithGoogle}>
        <ImGoogle className="mr-3" /> Google Signin
      </SocialButton>
    </div>
  )
}
