"use client"

import { SSRProvider } from "react-aria"

const AriaSSRProvider = ({ children }: WithChildren) => {
  return <SSRProvider>{children}</SSRProvider>
}

export default AriaSSRProvider
