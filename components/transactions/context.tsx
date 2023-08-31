"use client"

import { getTransactionsFromWallet } from "@/utils/client/transaction"
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react"
interface transactionsContextInterface {
  transactions: Array<SerializedTransaction>
  setTransactions: Dispatch<SetStateAction<SerializedTransaction[]>>
}

export const TransactionsContext = createContext<transactionsContextInterface>({
  transactions: [],
  setTransactions: () => {},
})

type TransactionProviderProps = PropsWithChildren & {
  wallet_id: string
}

export const TransactionsProvider = ({
  children,
  wallet_id,
}: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<
    Array<SerializedTransaction>
  >([])

  useLayoutEffect(() => {
    getTransactionsFromWallet(wallet_id).then((dat) => {
      console.log(dat)
      if (dat.data) {
        setTransactions(dat.data)
      }
    })
  }, [wallet_id])

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext)
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}
