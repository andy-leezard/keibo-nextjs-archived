"use client"

import { WithLocale } from "@/i18n-config"
import sharedStyles from "../WalletCreator.module.css"

type DetailProps = WithLocale & {
  onConfirm: (
    detail: Required<Pick<WalletConstructor, "display_name" | "cash_input">>
  ) => void
  category: WalletConstructor["category"]
  onBack: () => void
}

const Detail = ({
  currentLocale,
  category,
  onConfirm,
  onBack,
}: DetailProps) => {
  return <div className={sharedStyles.flex_col_container}>Detail</div>
}

export default Detail
