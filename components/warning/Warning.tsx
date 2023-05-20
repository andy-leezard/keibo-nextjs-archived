"use client"

import { WithLocale } from "@/i18n-config"
import Image from "next/image"
import styles from "./Warning.module.css"

type WarningProps = WithLocale & {}

const Warning = (props: WarningProps) => {
  return (
    <div className={styles.wrapper}>
      <Image
        src={"/custom_icons/under_construction.webp"}
        alt=""
        width={300}
        height={300}
      />
    </div>
  )
}

export default Warning
