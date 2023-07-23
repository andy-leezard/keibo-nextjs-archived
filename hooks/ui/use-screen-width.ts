"use client"

import { useState, useEffect } from "react"

const size_map = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  ["2xl"]: 1536,
} as const

const useScreenWidth = (param: number | "sm" | "md" | "lg" | "xl" | "2xl") => {
  const [conditionMet, setConditionMet] = useState(
    typeof window !== "undefined"
      ? window.innerWidth >=
          (typeof param === "number" ? param : size_map[param])
      : null
  )

  useEffect(() => {
    let handleResize = () => {}

    if (typeof window !== "undefined") {
      handleResize = () => {
        setConditionMet(
          window.innerWidth >=
            (typeof param === "number" ? param : size_map[param])
        )
      }
    }

    // Add event listener to listen for window resize events
    window.addEventListener("resize", handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [param]) // Empty dependency array ensures the effect runs only once during component mount

  return conditionMet
}

export default useScreenWidth
