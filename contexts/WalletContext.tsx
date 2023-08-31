"use client"

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"

interface WalletContextValue {
  statusCode: number
  networkError: boolean
  wallet: SerializedWallet | null
  setWallet: Dispatch<SetStateAction<SerializedWallet | null>>
}

const WalletContext = createContext<WalletContextValue | null>(null)

type WalletProvider = PropsWithChildren & {
  statusCode: number
  networkError: boolean
  initial_wallet: SerializedWallet | null
}

export const WalletProvider = ({
  children,
  statusCode,
  networkError,
  initial_wallet,
}: WalletProvider) => {
  const [wallet, setWallet] = useState<SerializedWallet | null>(initial_wallet)

  /* useLayoutEffect(() => {
    if (wallet_id) {
      getWallet({
        wallet_id,
      }).then((res) => {
        const { statusCode: code, networkError: error, data } = res
        setStatusCode(code)
        setNetworkError(error)
        setWallet(data)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet_id]) */

  return (
    <WalletContext.Provider
      value={{ statusCode, networkError, wallet, setWallet }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWalletContext = () => {
  const context = useContext(WalletContext)

  if (!context) {
    const error_message = "Antipattern access of WalletContext"
    console.error(error_message)
    throw new Error(error_message)
  }
  return context
}
