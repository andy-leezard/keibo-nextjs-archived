import { Dispatch, SetStateAction, createContext, useContext } from "react"
interface transactionsContextInterface {
  transactions: Array<SerializedTransaction>
  setTransactions: Dispatch<SetStateAction<SerializedTransaction[]>>
}

export const TransactionsContext = createContext<transactionsContextInterface>({
  transactions: [],
  setTransactions: () => {}
})

export const useTransactionContext = () => {
  const context = useContext(TransactionsContext)
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}
