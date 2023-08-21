"use client"

import { FilterableItem } from "../type"
import Image from "next/image"
import { ReactNode } from "react"
import styled from "styled-components"

type IconRendererProps = {
  image?: string | ReactNode
  size?: number
  fallbackIcon?: ReactNode
}

interface IconContainerDivProps {
  size: number
}
const IconContainerDiv = styled.div<IconContainerDivProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`

const IconRenderer = ({
  image,
  size = 32,
  fallbackIcon,
}: IconRendererProps) => {
  return (
    <>
      {typeof image === "string" ? (
        <IconContainerDiv
          size={size}
          className="relative bg-white p-0 overflow-hidden flex-shrink-0 flex items-center justify-center rounded-lg border border-transparent border-solid"
        >
          <Image
            src={image}
            alt=""
            fill
          />
        </IconContainerDiv>
      ) : (
        image ?? fallbackIcon ?? <></>
      )}
    </>
  )
}

export default IconRenderer
