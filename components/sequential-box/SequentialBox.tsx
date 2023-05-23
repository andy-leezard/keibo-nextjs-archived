"use client"

import { PDictionary, WithLocale, t } from "@/i18n-config"
import Warning from "../warning"
import styles from "./SequentialBox.module.css"
import { useMemo, useRef, useState } from "react"
import { FaWallet } from "react-icons/fa"
import { indexIsValidForArray } from "@/utils/client"
import { display_messages, wallet_categories } from "./constants"
import { Button, ComboBox, Item } from "../ui"
import Image from "next/image"
import { Description, Label } from "../ui/listbox/ListBox"
import Category from "./Category"
import WalletProvider from "./WalletProvider"

type SequentialBoxProps = WithLocale & WithSession & {}
// TODO : Add histories backwards.

const _default_constructor = {
  provider: "",
  category: "cash",
  display_name: "",
  cash_input: {},
  participants: {},
}

const SequentialBox = ({ currentLocale, session }: SequentialBoxProps) => {
  const [currentWallet, setCurrentWallet] = useState<
    Partial<WalletConstructor>
  >({
    provider: undefined,
    category: undefined,
    display_name: undefined,
    cash_input: undefined,
    participants: undefined,
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const step = useMemo(() => {
    if (!currentWallet?.category) return 0
    if (!currentWallet?.provider) return 1
    if (!currentWallet?.display_name) return 2
    if (!currentWallet?.cash_input) return 3
    if (!currentWallet?.participants) return 4
    return 5
  }, [currentWallet])

  if (!session) {
    return <Warning currentLocale={currentLocale} />
  }
  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.icon_container}>
        <FaWallet size={18} />
      </div> */}
      {indexIsValidForArray(display_messages, step) ? (
        <span style={{ textAlign: "center" }}>
          {display_messages[step][currentLocale]}
        </span>
      ) : (
        <></>
      )}
      {!step ? (
        <Category
          currentLocale={currentLocale}
          onConfirm={(category: WalletConstructor["category"]) =>
            setCurrentWallet((prev) => ({
              ...prev,
              category,
            }))
          }
        />
      ) : currentWallet.category ? (
        <WalletProvider
          currentLocale={currentLocale}
          category={currentWallet.category}
          onConfirm={(provider: WalletConstructor["provider"]) =>
            setCurrentWallet((prev) => ({
              ...prev,
              provider,
            }))
          }
          onBack={() =>
            setCurrentWallet((prev) => ({
              ...prev,
              category: undefined,
            }))
          }
        />
      ) : (
        <></>
      )}
      <span style={{ textAlign: "center" }}>{step}/5</span>
      {/* <input className={styles.input} type="text" placeholder=""/> */}
    </div>
  )
}

export default SequentialBox
