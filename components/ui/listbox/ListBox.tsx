"use client"

import {
  createContext,
  useContext,
  useRef,
  RefObject,
  HTMLAttributes,
  PropsWithChildren,
} from "react"
import type { ListState, Node } from "react-stately"
import { AriaListBoxOptions, useListBox, useOption } from "react-aria"
import styled from "styled-components"
import { HiCheck } from "react-icons/hi"
import ListItem from "./ListItem"

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: RefObject<HTMLUListElement>
  state: ListState<unknown>
}

interface OptionProps {
  item: Node<unknown>
  state: ListState<unknown>
}

const List = styled.ul`
  max-height: 300px;
  overflow: auto;
  list-style: none;
  padding: 0;
  margin: 4px 0;
  outline: none;
  width: 100%;
`

const ItemContent = styled.div`
  display: flex;
  align-items: center;
`

export default function ListBox(props: ListBoxProps) {
  let ref = useRef<HTMLUListElement>(null)
  let { listBoxRef = ref, state } = props
  let { listBoxProps } = useListBox(props, state, listBoxRef)

  return (
    <List {...listBoxProps} ref={listBoxRef}>
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </List>
  )
}

interface OptionContextValue {
  labelProps: HTMLAttributes<HTMLElement>
  descriptionProps: HTMLAttributes<HTMLElement>
}

const OptionContext = createContext<OptionContextValue>({
  labelProps: {},
  descriptionProps: {},
})

function Option({ item, state }: OptionProps) {
  let ref = useRef<HTMLLIElement>(null)
  let { optionProps, labelProps, descriptionProps, isSelected, isFocused } =
    useOption(
      {
        key: item.key,
      },
      state,
      ref
    )

  return (
    <ListItem
      ariaProps={optionProps}
      isFocused={isFocused}
      isSelected={isSelected}
      ref={ref}
    >
      <ItemContent>
        <OptionContext.Provider value={{ labelProps, descriptionProps }}>
          {item.rendered}
        </OptionContext.Provider>
      </ItemContent>
      {isSelected && <HiCheck aria-hidden="true" size={18} />}
    </ListItem>
  )
}

// The Label and Description components will be used within an <Item>.
// They receive props from the OptionContext defined above.
// This ensures that the option is ARIA labelled by the label, and
// described by the description, which makes for better announcements
// for screen reader users.

export function Label({ children }: PropsWithChildren) {
  let { labelProps } = useContext(OptionContext)
  return <div {...labelProps}>{children}</div>
}

const StyledDescription = styled.div`
  font-weight: normal;
  font-size: 12px;
`

export function Description({ children }: PropsWithChildren) {
  let { descriptionProps } = useContext(OptionContext)
  return <StyledDescription {...descriptionProps}>{children}</StyledDescription>
}
