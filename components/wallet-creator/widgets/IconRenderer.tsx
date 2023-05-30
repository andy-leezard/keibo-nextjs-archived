"use client"

import { FilterableItem } from "../type"
import Image from "next/image"
import globalStyles from "../WalletCreator.module.css"
import { ReactNode } from "react"

type IconRendererProps = {
  image: FilterableItem["image"]
  size?: number
  fallbackIcon?: ReactNode
}

const IconRenderer = ({
  image,
  size = 32,
  fallbackIcon,
}: IconRendererProps) => {
  return (
    <>
      {typeof image === "string" ? (
        <div
          className={globalStyles.image_container}
          style={{ backgroundColor: "#ffffff" }}
        >
          <Image src={image} alt="" width={size} height={size} />
        </div>
      ) : (
        image ?? fallbackIcon ?? <></>
      )}
    </>
  )
}

export default IconRenderer
