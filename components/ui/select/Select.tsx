"use client"

import { useSelectState } from "react-stately"
import {
  useSelect,
  HiddenSelect,
  AriaSelectProps,
  mergeProps,
  useFocusRing,
  useButton,
  Placement,
} from "react-aria"
import styled from "styled-components"
import { HiSelector } from "react-icons/hi"
import { useRef } from "react"
import { Label, Wrapper } from "../shared"
import Popover from "../popover"
import ListBox from "../listbox"
import AlternativeButton from "./AlternativeButton"

const Value = styled.span`
  display: inline-flex;
  align-items: center;
`

const StyledIcon = styled.div`
  padding: 6px 2px;
  margin: 0 4px;
  background: var(--accent-color);
  border-radius: 4px;
  color: white;
`

export default function Select<T extends object>(
  props: AriaSelectProps<T> & {
    placement?: Placement
    hideLabel?: boolean
  }
) {
  // Create state based on the incoming props
  let state = useSelectState(props)

  // Get props for child elements from useSelect
  let ref = useRef(null)
  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  )

  // Get props for the button based on the trigger props from useSelect
  let { buttonProps } = useButton(triggerProps, ref)

  let { focusProps, isFocusVisible } = useFocusRing()

  const ariaProps = mergeProps(buttonProps, focusProps)

  return (
    <Wrapper>
      {!props.hideLabel ? <Label {...labelProps}>{props.label}</Label> : <></>}
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <AlternativeButton
        ref={ref}
        ariaProps={ariaProps}
        isOpen={state.isOpen}
        isFocusVisible={isFocusVisible}
        /* buttonProps={{
          isOpen: state.isOpen,
          isFocusVisible: isFocusVisible,
        }} */
      >
        <Value {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : "Select an option"}
        </Value>
        <StyledIcon>
          <HiSelector />
        </StyledIcon>
      </AlternativeButton>
      {state.isOpen && (
        <Popover
          state={state}
          triggerRef={ref}
          placement={props.placement ?? "bottom start"}
        >
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </Wrapper>
  )
}

export { Item } from "react-stately"
