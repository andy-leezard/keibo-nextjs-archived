"use client"

import { getTransactionsFromWallet } from "@/utils/client/transaction"
import cn from "classnames"
import { useLayoutEffect, useState } from "react"
import Transaction from "./Transaction"
import { WithLocale } from "@/i18n-config"
import { TransactionsContext } from "./context"

type TransactionsProps = WithLocale & {
  wallet_id: string
}

const base_td_classname = "py-2 px-2 border-b dark:border-b-zinc-700"

const Transactions = ({ currentLocale, wallet_id }: TransactionsProps) => {
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
      <div className="p-2">
        <h2>Register transactions (new)</h2>
        <h2>Register transactions (retro)</h2>
        {/* <div className={cn("")}></div> */}
        <div>
          <table className="min-w-full bg-slate-100 dark:bg-zinc-800">
            <thead>
              <tr>
                <th className={cn(base_td_classname)}>Date</th>
                <th className={cn(base_td_classname)}>Category</th>
                {/* <th className={cn(base_td_classname)}>Gross Amount</th> */}
                <th className={cn(base_td_classname)}>Net Amount</th>
                <th className={cn(base_td_classname)}>Transaction Fee</th>
                {/* <th className={cn(base_td_classname)}>Recipient</th>
            <th className={cn(base_td_classname)}>Sender</th> */}
                <th className={cn(base_td_classname)}>Confirmed</th>
                <th className={cn(base_td_classname)}>Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.length
                ? transactions.map((transaction, index) => (
                    <Transaction
                      key={index}
                      tdClassName={base_td_classname}
                      transaction={transaction}
                      userWalletID={wallet_id}
                      currentLocale={currentLocale}
                    />
                  ))
                : Array.from(Array(5).keys()).map((val) => (
                    <Transaction
                      key={val}
                      tdClassName={base_td_classname}
                      transaction={{}}
                      userWalletID={wallet_id}
                      currentLocale={currentLocale}
                    />
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </TransactionsContext.Provider>
  )
}

export default Transactions
