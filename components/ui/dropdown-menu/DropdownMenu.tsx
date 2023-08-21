"use client"

import { useState, MouseEvent as ReactMouseEvent } from "react"
import { domRectToStyle } from "./constants"
import type { DropdownMenuProps, THoverState } from "./types"
import DropdownWidget from "./DropdownWidget"
import { useRouter } from "next/navigation"

const INITIAL_HOVER_STATE: THoverState = {
  display: false,
  pos: {},
}

const DropdownMenu = ({
  mode = "hover",
  // Required
  thresholdWidth,
  thresholdHeight,
  displayNode,
  children,

  // Optional (Router)
  href,

  // Optional (UI)
  marginX = 0,
  marginY = 0,
  id,
  className,
  style,
  dropdownId,
  dropdownClassName,
  dropdownStyle,
  disableMiddleAnchor,
  debug,
  debugOptions,
  useOffsetParent,
}: DropdownMenuProps) => {
  const [hoverPos, setHoverPos] = useState<THoverState>(INITIAL_HOVER_STATE)
  const [clientRect, setClientRect] = useState<DOMRect | null>(null)
  const [parentRect, setParentRect] = useState<DOMRect | null>(null)
  const router = useRouter()
  const {
    nativeTransformParentColor = "orange",
    offsetParentColor = "red",
    clientRectColor = "yellow",
  } = debugOptions ?? {}

  const show = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetParentRect =
      e.currentTarget.offsetParent?.getBoundingClientRect()
    const MARGIN_X = mode === "click" ? marginX : 0
    const MARGIN_Y = mode === "click" ? marginY : 0
    const THRESHOLD_WIDTH = thresholdWidth + MARGIN_X
    const THRESHOLD_HEIGHT = thresholdHeight + MARGIN_Y
    const {
      left: parentRectLeft = 0,
      top: parentRectTop = 0,
      right: parentRectRight = 0,
      bottom: parentRectBottom = 0,
    } = useOffsetParent && offsetParentRect
      ? offsetParentRect
      : {
          right: window.innerWidth,
          bottom: window.innerHeight,
        }
    if (debug) {
      setParentRect(
        e.currentTarget.offsetParent?.getBoundingClientRect() ?? null
      )
      setClientRect(rect)
    }
    const left_anchor = rect.left - parentRectLeft
    const right_anchor = parentRectRight - rect.right
    const top_anchor = rect.top - parentRectTop
    const bottom_anchor = parentRectBottom - rect.bottom
    let horizontal_anchor: "left" | "right" | "middle" = "left"
    if (right_anchor + rect.width < THRESHOLD_WIDTH) {
      horizontal_anchor = "right"
    } else if (!disableMiddleAnchor && left_anchor > THRESHOLD_WIDTH) {
      horizontal_anchor = "middle"
    }
    let vertical_anchor: "above" | "below" = "below"
    if (bottom_anchor < THRESHOLD_HEIGHT && parentRectTop > THRESHOLD_HEIGHT) {
      vertical_anchor = "above"
    }
    const pos: Partial<THoverState["pos"]> = {}
    if (horizontal_anchor === "left") {
      pos.left = `${left_anchor}px`
    } else if (horizontal_anchor === "middle") {
      pos.left = `${left_anchor + rect.width / 2}px`
      pos.translate = "-50%"
    } else if (horizontal_anchor === "right") {
      pos.right = `${right_anchor}px`
    }
    if (vertical_anchor === "below") {
      pos.top = `${top_anchor + rect.height}px`
    } else {
      pos.bottom = `${bottom_anchor + rect.height}px`
    }
    if (MARGIN_X) {
      if (pos.left) {
        pos.marginLeft = MARGIN_X
      }
      if (pos.right) {
        pos.marginRight = MARGIN_X
      }
    }
    if (MARGIN_Y) {
      if (pos.top) {
        pos.marginTop = MARGIN_Y
      }
      if (pos.bottom) {
        pos.marginBottom = MARGIN_Y
      }
    }
    setHoverPos({
      pos,
      display: true,
    })
  }

  const hide = () => setHoverPos(INITIAL_HOVER_STATE)

  return (
    <>
      <button
        type="button"
        id={id}
        className={className}
        style={style}
        onMouseEnter={(e) => {
          if(href){
            router.prefetch(href)
          }
          if (mode === "hover") show(e)
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && href) {
            router.push(href)
            return
          }
          if (mode !== "click") return
          if (!hoverPos.display) {
            show(e)
            return
          }
          hide()
        }}
        /* onBlur={() => {
          if (mode !== "click") return
          hide()
        }} */
        /* onBlurCapture={() => {
          if (mode !== "click") return
          hide()
        }} */
        onMouseLeave={() => {
          if (mode === "hover") hide()
        }}
      >
        {displayNode}
        {mode === "hover" ? (
          <DropdownWidget
            hoverPos={hoverPos}
            id={dropdownId}
            className={dropdownClassName}
            style={dropdownStyle}
            thresholdWidth={thresholdWidth}
            thresholdHeight={thresholdHeight}
          >
            {children}
          </DropdownWidget>
        ) : (
          <></>
        )}
        {debug && hoverPos.display ? (
          <>
            {parentRect ? (
              <div
                className="fixed pointer-events-none"
                style={{
                  ...domRectToStyle(parentRect),
                  border: `1px solid ${offsetParentColor}`,
                }}
              />
            ) : (
              <></>
            )}
            {clientRect ? (
              <div
                className="fixed pointer-events-none"
                style={{
                  ...domRectToStyle(clientRect),
                  border: `1px solid ${clientRectColor}`,
                }}
              />
            ) : (
              <></>
            )}
            <div
              className="fixed inset-0 pointer-events-none"
              style={{
                border: `1px solid ${nativeTransformParentColor}`,
              }}
            />
          </>
        ) : (
          <></>
        )}
      </button>
      {mode === "click" ? (
        <>
          <DropdownWidget
            hoverPos={hoverPos}
            id={dropdownId}
            className={dropdownClassName}
            style={dropdownStyle}
            thresholdWidth={thresholdWidth}
            thresholdHeight={thresholdHeight}
            onMouseLeave={() => hide()}
            /* onClick={() => hide()} */
          >
            {children}
          </DropdownWidget>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default DropdownMenu
