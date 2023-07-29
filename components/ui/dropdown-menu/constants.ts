import { CSSProperties } from "react"

export const domRectToStyle = (domRect: DOMRect): CSSProperties => {
  const { width, height, top, left, right, bottom } = domRect
  return { width, height, top, left, right, bottom }
}
