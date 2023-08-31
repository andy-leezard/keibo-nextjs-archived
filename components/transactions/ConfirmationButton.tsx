"use client"

import React, { useState } from "react"
import { Spinner } from "../common"
import { FcCheckmark } from "react-icons/fc"
import { BiError, BiTime } from "react-icons/bi"
import { Tooltip as ReactTooltip } from "react-tooltip"
import classNames from "classnames"
import { WithLocale, t } from "@/i18n-config"
import { useTransactionsContext } from "./context"
import { updateTransaction } from "@/utils/client/transaction"
import { useWalletContext } from "@/contexts/WalletContext"

type ConfirmationButtonProps = WithLocale & {
  transaction_id?: string
  isRecipient: boolean
  confirmed: boolean
}

const ConfirmationButton = ({
  transaction_id = `${Math.random()}`,
  isRecipient,
  currentLocale,
  confirmed,
}: ConfirmationButtonProps) => {
  const { setWallet } = useWalletContext()
  const [isLoading, setIsLoading] = useState(false)
  const [networkError, setNetworkError] = useState(false)
  const [statusCode, setStatusCode] = useState(0)
  const { transactions, setTransactions } = useTransactionsContext()
  const handleClick = async () => {
    setIsLoading(true)
    const payload: Partial<SerializedTransaction> = {}
    if (isRecipient) {
      payload.confirmed_by_recipient = !confirmed
    } else {
      payload.confirmed_by_sender = !confirmed
    }
    try {
      const {
        statusCode: code,
        networkError: error,
        data,
      } = await updateTransaction({
        ...payload,
        transaction_id,
      })
      if (error) {
        setNetworkError(true)
        if (code) {
          setStatusCode(code)
        }
        throw new Error(`Error with status (${code})`)
      }
      if (data) {
        const { new_balance, ...new_transaction } = data
        console.log(data)
        const idx = transactions.findIndex((tr) => tr.id === transaction_id)
        if (typeof new_balance === "number") {
          setWallet((prev) => (prev ? { ...prev, balance: new_balance } : prev))
        }
        if (idx >= 0) {
          setTransactions((prev) => {
            prev[idx] = new_transaction
            return [...prev]
          })
        }
        setStatusCode(0)
        setNetworkError(false)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <button
      className={classNames(
        "p-1 rounded-md",
        "bg-slate-300 dark:bg-zinc-600 hover:bg-slate-400 dark:hover:bg-zinc-500"
      )}
      data-tooltip-id={`tr-conf-btn-rtt-${transaction_id}`}
      data-tooltip-content={
        confirmed
          ? t(currentLocale, {
              en: "Revert",
              fr: "Annuler",
              ko: "철회",
            })
          : t(currentLocale, {
              en: `Confirm ${isRecipient ? "reception" : "expenditure"}`,
              fr: `Confirmer la ${isRecipient ? "réception" : "dépense"}`,
              ko: `${isRecipient ? "수입" : "지출"} 확인`,
            })
      }
      onClick={() => handleClick()}
    >
      {networkError ? (
        <BiError />
      ) : isLoading ? (
        <Spinner sm />
      ) : confirmed ? (
        <FcCheckmark />
      ) : (
        <BiTime color={"#CCCCCC"} />
      )}
      <ReactTooltip id={`tr-conf-btn-rtt-${transaction_id}`} place="right" />
    </button>
  )
}

export default ConfirmationButton
