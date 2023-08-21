"use client"

import { useContext, useRef, useState } from "react"
import { WalletCreationContext } from "../context"
import { WithLocale, t } from "@/i18n-config"
import { RowIcon } from "../widgets"
import { FaPlus } from "react-icons/fa"
import { BsBank } from "react-icons/bs"
import { MdOutlineAccountBalanceWallet } from "react-icons/md"
import { NumberField, TextField } from "@/components/ui"
import { ButtonForward } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ColorfulSpinner } from "@/components/ui/loaders"

type MetadataCreatorProps = WithLocale & {}

const MetadataCreator = ({ currentLocale }: MetadataCreatorProps) => {
  const { state, dispatch } = useContext(WalletCreationContext)
  const { category, provider, asset } = state
  const [displayName, setDisplayName] = useState("")
  const displayNameInputRef = useRef<HTMLInputElement>(null)
  const quantityInputRef = useRef<HTMLInputElement>(null)
  const [processing, setProcessing] = useState(false)
  const router = useRouter()

  const onNameChange = (str: string) => {
    setDisplayName(str)
  }

  const onQuantityChange = (num: number) => {
    if (!quantityInputRef?.current) return
    if (asset) {
      dispatch({ type: "SET_ASSET_QUANTITY", payload: num })
    }
  }

  const onCreateWallet = async () => {
    if (
      !asset ||
      !category ||
      !provider ||
      !displayNameInputRef.current?.value.trim()
    )
      return
    let created_wallet_id = ""
    try {
      const uri = `${process.env.NEXT_PUBLIC_HOST}/api/wallet/`
      const body: Partial<SerializedWallet> = {
        provider: provider.value,
        category: category.value,
        asset_id: asset.value,
        balance: asset.quantity,
        name: displayNameInputRef.current?.value,
        is_public: false,
      }
      if (provider.image) {
        body.icon = provider.image
      }
      setProcessing(true)
      const response = await fetch(uri, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify(body),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const as_json = await response.json()
      console.log("created wallet >>")
      console.log(as_json)
      if (as_json.id) {
        created_wallet_id = as_json.id
      }
    } catch (error) {
      console.error(error)
    } finally {
      /* setProcessing(false) */
      if (created_wallet_id) {
        router.replace(`/accounts/wallets/${created_wallet_id}`)
      }
    }
  }

  return (
    <div className="flex flex-col m-4 gap-4">
      <div className="flex justify-center items-center gap-4">
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
      {processing ? (
        <ColorfulSpinner size={64} className="m-auto" />
      ) : (
        <>
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
          {/* <span style={{ textAlign: "center" }}>- - - Optional - - -</span> */}
          {/* <Participants
                currentLocale={currentLocale}
                participants={participants}
                setParticipants={setParticipants}
              /> */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <ButtonForward
              className="rounded-md p-2 min-w-90"
              onClick={() => {
                dispatch({ type: "SET_ASSET", payload: null })
              }}
            >
              {t(currentLocale, {
                en: "Previous",
                fr: "Retour",
                ko: "이전",
              })}
            </ButtonForward>
            <ButtonForward
              disabled={Boolean(!displayName)}
              className="rounded-md p-2 min-w-90"
              onClick={() => onCreateWallet()}
              style={{ opacity: displayName ? 1 : 0.5 }}
            >
              {t(currentLocale, {
                en: "Confirm",
                fr: "Confirmer",
                ko: "확인",
              })}
            </ButtonForward>
          </div>
        </>
      )}
    </div>
  )
}

export default MetadataCreator
