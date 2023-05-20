"use client"

import { WithLocale } from "@/i18n-config"
import Warning from "../warning"
import styles from "./SequentialBox.module.css"
import { useState } from "react"

type SequentialBoxProps = WithLocale & WithSession & {}

// TODO : Add a wallet

// TODO : Add histories backwards.

const SequentialBox = ({ currentLocale, session }: SequentialBoxProps) => {
  const [] = useState()

  if (!session) {
    return <Warning currentLocale={currentLocale} />
  }
  return <div className={styles.wrapper}>

  </div>
}

export default SequentialBox
