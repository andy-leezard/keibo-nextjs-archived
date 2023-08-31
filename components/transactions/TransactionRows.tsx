"use client"

import React from "react"
import Transaction from "./Transaction"
import { base_td_classname } from "./constants"
import { WithLocale } from "@/i18n-config"
import { useTransactionsContext } from "./context"

type TransactionRowsProps = WithLocale & {
  wallet_id: string
}

const TransactionRows = ({
  currentLocale,
  wallet_id,
}: TransactionRowsProps) => {
  const { transactions } = useTransactionsContext()
  return (
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
  )
}

export default TransactionRows
