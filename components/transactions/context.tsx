"use client"

import { getClientTransactions } from "@/utils-api/client/transaction/getClientTransactions"
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
  const [loaded, setLoaded] = useState(false)

  useLayoutEffect(() => {
    getClientTransactions(wallet_id)
      .then((dat) => {
        console.log(dat)
        if (dat.data) {
          setTransactions(dat.data)
        }
      })
      .finally(() => setLoaded(true))
  }, [wallet_id])

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
      {loaded && !transactions.length ? <span className="p-4 text-center" >No result</span> : <></>}
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
