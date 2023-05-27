"use client"

import Image from "next/image"
import { Label } from "@/components/ui/listbox/ListBox"
import { PDictionary, WithLocale, t } from "@/i18n-config"
import { ReactNode } from "react"
import styles from "./Icon.module.css"
import globalStyles from "../WalletCreator.module.css"

type RowIconProps = WithLocale & {
  image?: string | ReactNode
  fallbackIcon?: ReactNode
  displayName: string | PDictionary
  size?: "big_size" | "regular_size"
}

const RowIcon = ({
  currentLocale,
  image,
  fallbackIcon,
  displayName,
  size,
}: RowIconProps) => {
  return (
    <>
      {image ? (
        <div
          className={`${styles.flex_grid_item} ${
            size ? styles[size] : styles.big_size
          }`}
        >
          {typeof image === "string" ? (
            <div className={globalStyles.image_container}>
              <Image
                src={image}
                alt=""
                width={size === "regular_size" ? 48 : 64}
                height={size === "regular_size" ? 48 : 64}
              />
            </div>
          ) : (
            image ?? fallbackIcon ?? <></>
          )}
          <Label>{t(currentLocale, displayName)}</Label>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default RowIcon