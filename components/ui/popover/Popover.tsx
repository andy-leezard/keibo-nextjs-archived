"use client"

import type { OverlayTriggerState } from "react-stately"
import styled, { css } from "styled-components"
import {
  AriaPopoverProps,
  DismissButton,
  Overlay,
  Placement,
  usePopover,
} from "react-aria"
import { useRef } from "react"
import styles from "./Popover.module.css"

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: React.ReactNode
  state: OverlayTriggerState
  popoverRef?: React.RefObject<HTMLDivElement>
}

/* Conditional styles based on isOpen and isFocusVisible props */
const Wrapper = styled.div<{ placement?: Placement }>`
  ${({ placement }) => css`
    ${placement?.includes("top") ? "bottom" : "top"}: 100%;
  `}
`

export default function Popover(
  props: PopoverProps & { placement?: Placement }
) {
  let ref = useRef<HTMLDivElement>(null)
  let { popoverRef = ref, state, children, isNonModal } = props

  let { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state
  )

  return (
    <Overlay>
      {!isNonModal && (
        <div {...underlayProps} style={{ position: "fixed", inset: 0 }} />
      )}
      <Wrapper className={styles.popover} {...popoverProps} ref={popoverRef} placement={props.placement}>
        {!isNonModal && <DismissButton onDismiss={state.close} />}
        {children}
        <DismissButton onDismiss={state.close} />
      </Wrapper>
    </Overlay>
  )
}
