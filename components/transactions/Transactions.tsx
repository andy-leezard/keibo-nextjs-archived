"use client"

import { getTransactionsFromWallet } from "@/utils/client/transaction"
import cn from "classnames"
import { useLayoutEffect, useState } from "react"

type TransactionsProps = {
  wallet_id: string
}

const Transactions = ({ wallet_id }: TransactionsProps) => {
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
    return () => {}
  }, [wallet_id])

  return (
    <div className="p-8">
      <h2>Register transactions (new)</h2>
      <h2>Register transactions (retro)</h2>
      <div className={cn("")}></div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Recipient</th>
              <th className="py-2 px-4 border-b">Sender</th>
              <th className="py-2 px-4 border-b">Confirmed By Recipient</th>
              <th className="py-2 px-4 border-b">Confirmed By Sender</th>
              <th className="py-2 px-4 border-b">Gross Amount</th>
              <th className="py-2 px-4 border-b">Net Amount</th>
              <th className="py-2 px-4 border-b">Transaction Fee</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{transaction.category}</td>
                <td className="py-2 px-4 border-b">{transaction.recipient}</td>
                <td className="py-2 px-4 border-b">{transaction.sender}</td>
                <td className="py-2 px-4 border-b">
                  {transaction.confirmed_by_recipient ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-b">
                  {transaction.confirmed_by_sender ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-b">
                  {transaction.gross_amount}
                </td>
                <td className="py-2 px-4 border-b">{transaction.net_amount}</td>
                <td className="py-2 px-4 border-b">
                  {transaction.transaction_fee}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(transaction.date).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {transaction.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transactions
