"use client"

import { useContext, useRef, useState } from "react"
import { WalletCreationContext } from "../context"
import { WithLocale, t } from "@/i18n-config"
import sharedStyles from "../WalletCreator.module.css"
import { RowIcon } from "../widgets"
import { FaPlus } from "react-icons/fa"
import { BsBank } from "react-icons/bs"
import { MdOutlineAccountBalanceWallet } from "react-icons/md"
import { Button, NumberField, TextField } from "@/components/ui"

type MetadataCreatorProps = WithLocale & {}

const MetadataCreator = ({ currentLocale }: MetadataCreatorProps) => {
  const { asset, category, provider, update } = useContext(
    WalletCreationContext
  )
  const [displayName, setDisplayName] = useState("")
  const [cashInput, setCashInput] = useState<WalletConstructor["cash_input"]>(
    {}
  )
  const [participants, setParticipants] = useState<
    WalletConstructor["participants"]
  >({})
  const displayNameInputRef = useRef<HTMLInputElement>(null)
  const quantityInputRef = useRef<HTMLInputElement>(null)

  const onNameChange = (str: string) => {
    setDisplayName(str)
  }

  const onQuantityChange = (num: number) => {
    if (!quantityInputRef?.current) return
    if (asset) {
      update("asset", { ...asset, quantity: num })
    }
  }

  const onCreateWallet = () => {
    if (!displayName.trim()) return
  }

  return (
    <div className={sharedStyles.flex_col_container}>
      <div className={sharedStyles.flex_row_container}>
        {category ? (
          <RowIcon
            currentLocale={currentLocale}
            image={category.image}
            displayName={category.display_name}
            size={"regular_size"}
          />
        ) : (
          <></>
        )}
        {provider ? (
          <>
            <FaPlus size={24} />
            <RowIcon
              currentLocale={currentLocale}
              image={provider.image}
              displayName={provider.display_name}
              fallbackIcon={<BsBank size={48} />}
              size={"regular_size"}
            />
          </>
        ) : (
          <></>
        )}
        {asset ? (
          <>
            <FaPlus size={24} />
            <RowIcon
              currentLocale={currentLocale}
              image={asset.image}
              displayName={asset.display_name}
              fallbackIcon={<MdOutlineAccountBalanceWallet size={48} />}
              size={"regular_size"}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <TextField
        ref={displayNameInputRef}
        aria-label="display name"
        maxLength={32}
        placeholder={t(currentLocale, {
          en: "Ex: secondary savings account",
          fr: "Ex: compte d'épargne secondaire",
          ko: "Ex: 저축 계좌",
        })}
        label={t(currentLocale, {
          en: "Name of the wallet *",
          fr: "Nom du portefeuille *",
          ko: "지갑 이름 *",
        })}
        maxWidth={400}
        onChange={onNameChange}
      />
      <NumberField
        currentLocale={currentLocale}
        ref={quantityInputRef}
        aria-label="amount of reserves"
        label={t(currentLocale, {
          en: "Amount of reserves *",
          fr: "Montant des réserves *",
          ko: "보유량 *",
        })}
        maxWidth={400}
        formatOptions={{
          ...(asset?.symbol && category?.value !== "crypto"
            ? {
                style: "currency",
                currencyDisplay: "symbol",
                currency: asset.symbol.toUpperCase(),
              }
            : {}),
          ...{
            maximumFractionDigits: category?.value === "crypto" ? 8 : 2,
          },
        }}
        /* prefix={asset?.symbol ? `${asset?.symbol.toUpperCase()} ` : ""} */
        suffix={asset?.symbol ? `${asset?.symbol.toUpperCase()} ` : ""}
        minValue={0}
        onChange={onQuantityChange}
      />
      <span style={{ textAlign: "center" }}>- - - Optional - - -</span>
      <div className={sharedStyles.buttons_container}>
        <Button
          /* isDisabled={Boolean(
            typeof currentIndex !== "number" ||
              !indexIsValidForArray(wallet_categories, currentIndex)
          )} */
          corner="rounded"
          className={sharedStyles.button}
          onPress={() => {
            update("asset", null)
          }}
        >
          {t(currentLocale, {
            en: "Previous",
            fr: "Retour",
            ko: "이전",
          })}
        </Button>
        <Button
          isDisabled={Boolean(!displayName)}
          corner="rounded"
          className={sharedStyles.button}
          onPress={() => onCreateWallet()}
          style={{ opacity: displayName ? 1 : 0.5 }}
        >
          {t(currentLocale, {
            en: "Next",
            fr: "Suivant",
            ko: "다음",
          })}
        </Button>
      </div>
    </div>
  )
}

export default MetadataCreator
