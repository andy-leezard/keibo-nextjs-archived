import { CSSProperties, PropsWithChildren, ReactNode } from "react"

export type THoverState = {
  display: boolean
  pos: {
    top?: CSSProperties["top"]
    left?: CSSProperties["left"]
    right?: CSSProperties["right"]
    bottom?: CSSProperties["bottom"]
    translate?: CSSProperties["translate"]
    marginLeft?: CSSProperties["marginLeft"]
    marginRight?: CSSProperties["marginRight"]
    marginTop?: CSSProperties["marginTop"]
    marginBottom?: CSSProperties["marginBottom"]
  }
}

export type DropdownMenuProps = Required<PropsWithChildren> & {
  thresholdWidth: number
  thresholdHeight: number
  /**
   * Direct children of the wrapper div - always visible. Example: icons, texts.
   *
   * If you intend to add dropdown menu items, insert them as `children` in the default way instead of using this prop.
   *
   */
  displayNode?: ReactNode | undefined
  /** margin horizontal between the icon and the hovering dropdown menu */
  marginX?: number
  /** margin vertical between the icon and the hovering dropdown menu */
  marginY?: number

  /** wrapper div (always visible) id */
  id?: string
  /** wrapper div (always visible) className */
  className?: string
  /** wrapper div (always visible) style */
  style?: CSSProperties

  mode?: "hover" | "click"

  /** dropdown menu div (visible on hover) id */
  dropdownId?: string
  /** dropdown menu div (visible on hover) className */
  dropdownClassName?: string
  /** dropdown menu div (visible on hover) style */
  dropdownStyle?: Omit<
    CSSProperties,
    keyof THoverState["pos"] | "maxWidth" | "maxHeight"
  >

  debug?: boolean
  /** hover dropdown menu will be only either left or right anchor based. */
  disableMiddleAnchor?: boolean
  debugOptions?: {
    /** orange by default */
    nativeTransformParentColor?: CSSProperties["color"]
    /** red by default */
    offsetParentColor?: CSSProperties["color"]
    /** yellow by default */
    clientRectColor?: CSSProperties["color"]
  }
  useOffsetParent?: boolean

  /** The primary button as a router link */
  href?: string
}