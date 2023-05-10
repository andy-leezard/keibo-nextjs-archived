"use client"

import Button from "@/components/ui/button"

export const AuthState = () => {
  return (
    <Button
      onPressStart={() => console.log("on press START")}
      onPressEnd={() => console.log("on press END")}
    >
      Sign in
    </Button>
  )
}
