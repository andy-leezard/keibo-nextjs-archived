"use client"

import { useRef } from "react"
import styled from "styled-components"
import { useComboBoxState } from "react-stately"
import {
  useComboBox,
  useButton,
  useFilter,
  AriaComboBoxProps,
} from "react-aria"
import { HiChevronDown } from "react-icons/hi"
import { Label, Wrapper } from "../shared"
import Popover from "../popover"
import ListBox from "../listbox"

export { Item, Section } from "react-stately"

interface StyleProps {
  isFocused?: boolean
  isOpen?: boolean
}

const InputGroup = styled.div<StyleProps>`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  overflow: hidden;
  margin-top: 4px;
  border-radius: 4px;
  width: 200px;
`

const Input = styled.input<StyleProps>`
  appearance: none;
  border: none;
  padding: 6px 8px;
  outline: none;
  font-size: 16px;
  border: 1px solid;
  border-right: none;
  border-color: ${(props) => (props.isFocused ? "var(--accent-color)" : "lightgray")};
  border-radius: 4px 0 0 4px;
  color: white;
  margin: 0;
  flex: 1;
  width: 0;
`

const Button = styled.button`
  appearance: none;
  border: none;
  background: var(--accent-color);
  color: white;
  margin: 0;
`

export default function ComboBox<T extends object>(
  props: AriaComboBoxProps<T>
) {
  let { contains } = useFilter({ sensitivity: "base" })
  let state = useComboBoxState({ ...props, defaultFilter: contains })

  let buttonRef = useRef(null)
  let inputRef = useRef(null)
  let listBoxRef = useRef(null)
  let popoverRef = useRef(null)

  let {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps,
  } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state
  )

  let { buttonProps } = useButton(triggerProps, buttonRef)

  return (
    <Wrapper>
      <Label {...labelProps}>{props.label}</Label>
      <InputGroup isFocused={state.isFocused}>
        <Input {...inputProps} ref={inputRef} isFocused={state.isFocused} />
        <Button {...buttonProps} ref={buttonRef}>
          <HiChevronDown style={{ width: 18, height: 18 }} aria-hidden="true" />
        </Button>
      </InputGroup>
      {state.isOpen && (
        <Popover
          popoverRef={popoverRef}
          triggerRef={inputRef}
          state={state}
          isNonModal
          placement="bottom start"
        >
          <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
        </Popover>
      )}
    </Wrapper>
  )
}
