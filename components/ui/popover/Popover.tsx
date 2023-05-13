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

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: React.ReactNode
  state: OverlayTriggerState
  popoverRef?: React.RefObject<HTMLDivElement>
}

const Wrapper = styled.div<{ placement?: Placement }>`
  position: absolute;
  z-index: 1;
  width: 200px;
  border-radius: 4px;
  margin-top: 6px;

  
  background: white;
  border: 1px solid lightgray;
  @media (prefers-color-scheme: dark) {
    background: #444444;
    border: 1px solid #222222;
  }

  /* Conditional styles based on isOpen and isFocusVisible props */
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
      <Wrapper {...popoverProps} ref={popoverRef} placement={props.placement}>
        {!isNonModal && <DismissButton onDismiss={state.close} />}
        {children}
        <DismissButton onDismiss={state.close} />
      </Wrapper>
    </Overlay>
  )
}
