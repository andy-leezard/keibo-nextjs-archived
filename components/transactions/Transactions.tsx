"use client"

import cn from "classnames"
import { WithLocale } from "@/i18n-config"
import { TransactionsProvider } from "./context"
import { base_td_classname } from "./constants"
import TransactionRows from "./TransactionRows"

type TransactionsProps = WithLocale & {
  wallet_id: string
}

const Transactions = ({ currentLocale, wallet_id }: TransactionsProps) => {
  return (
    <TransactionsProvider wallet_id={wallet_id}>
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
            <TransactionRows currentLocale={currentLocale} wallet_id={wallet_id} />
          </table>
        </div>
      </div>
    </TransactionsProvider>
  )
}

export default Transactions
