import cn from "classnames"
import SkeletonTd from "../ui/skeleton/SkeletonTd"
import ConfirmationButton from "./ConfirmationButton"
import { WithLocale } from "@/i18n-config"

type TransactionProps = WithLocale & {
  userWalletID: string
  tdClassName: string
  transaction: Partial<SerializedTransaction>
}

const Transaction = ({
  currentLocale,
  userWalletID,
  tdClassName,
  transaction,
}: TransactionProps) => {
  
  const isSkeleton = !Object.keys(transaction).length || !transaction.id
  const isRecipient = transaction.recipient === userWalletID
  const confirmed =
    (isRecipient && transaction.confirmed_by_recipient) ||
    (!isRecipient && transaction.confirmed_by_sender)

  return (
    <tr className="text-center min-h-48">
      <SkeletonTd className={cn(tdClassName)}>
        {transaction?.date
          ? new Date(transaction?.date).toLocaleString()
          : null}
      </SkeletonTd>
      <SkeletonTd className={cn(tdClassName)}>
        {transaction.category}
      </SkeletonTd>
      {/* <td className="py-2 px-2 border-b">{transaction.gross_amount}</td> */}
      <SkeletonTd className={cn(tdClassName)}>
        {transaction.net_amount}
      </SkeletonTd>
      <SkeletonTd className={cn(tdClassName)}>
        {transaction.transaction_fee}
      </SkeletonTd>
      {/* <td className="py-2 px-2 border-b">{transaction.recipient}</td>
      <td className="py-2 px-2 border-b">{transaction.sender}</td> */}
      <SkeletonTd className={cn(tdClassName)}>
        {isSkeleton ? null : (
          <ConfirmationButton
            confirmed={Boolean(confirmed)}
            transaction_id={transaction.id}
            isRecipient={isRecipient}
            currentLocale={currentLocale}
          />
        )}
      </SkeletonTd>
      <SkeletonTd className={cn(tdClassName)}>
        {transaction.description}
      </SkeletonTd>
    </tr>
  )
}

export default Transaction
