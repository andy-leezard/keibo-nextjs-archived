"use client"

import { ReactNode, useRef } from "react"
import {
  MenuTriggerProps,
  TreeState,
  useMenuTriggerState,
  useTreeState,
  Node,
} from "react-stately"
import {
  AriaMenuProps,
  useMenu,
  useMenuItem,
  useMenuSection,
  useMenuTrigger,
  useSeparator,
} from "react-aria"
import Popover from "../popover"
import { HiChevronDown } from "react-icons/hi"
import { InnerButton } from "./InnerButton"
import styles from "./Menu.module.css"

interface MenuButtonProps<T extends object>
  extends AriaMenuProps<T>,
    MenuTriggerProps {
  label: string | ReactNode
}

export function MenuButton<T extends object>(props: MenuButtonProps<T>) {
  // Create state based on the incoming props
  let state = useMenuTriggerState(props)

  // Get props for the menu trigger and menu elements
  let ref = useRef<HTMLButtonElement>(null)
  let { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref)

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <InnerButton {...menuTriggerProps} isPressed={state.isOpen} ref={ref}>
        {props.label}
        <HiChevronDown className={styles.chevron_down} />
      </InnerButton>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <Menu
            {...menuProps}
            {...props}
            autoFocus={state.focusStrategy || true}
            onClose={() => state.close()}
          />
        </Popover>
      )}
    </div>
  )
}

interface MenuProps<T extends object> extends AriaMenuProps<T> {
  onClose: () => void
}

function Menu<T extends object>(props: MenuProps<T>) {
  // Create state based on the incoming props
  let state = useTreeState(props)

  // Get props for the menu element
  let ref = useRef()
  /* @ts-expect-error */
  let { menuProps } = useMenu(props, state, ref)

  return (
    <ul
      {...menuProps}
      /* @ts-expect-error */
      ref={ref}
      className={styles.ui}
    >
      {[...state.collection].map((item) => (
        <MenuSection
          key={item.key}
          section={item}
          state={state}
          /* @ts-expect-error */
          onAction={props.onAction}
          onClose={props.onClose}
        />
      ))}
    </ul>
  )
}

interface MenuSectionProps<T> {
  section: Node<T>
  state: TreeState<T>
  onAction: (key: React.Key) => void
  onClose: () => void
}

function MenuSection<T>({
  section,
  state,
  onAction,
  onClose,
}: MenuSectionProps<T>) {
  let { itemProps, groupProps } = useMenuSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  })

  let { separatorProps } = useSeparator({
    elementType: "li",
  })

  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li {...separatorProps} className={styles.menu_selection_li} />
      )}
      <li {...itemProps}>
        <ul {...groupProps}>
          {[...section.childNodes].map((node) => (
            <MenuItem
              key={node.key}
              item={node}
              state={state}
              onAction={onAction}
              onClose={onClose}
            />
          ))}
        </ul>
      </li>
    </>
  )
}

interface MenuItemProps<T> {
  item: Node<T>
  state: TreeState<T>
  onAction: (key: React.Key) => void
  onClose: () => void
}

function MenuItem<T>({ item, state, onAction, onClose }: MenuItemProps<T>) {
  // Get props for the menu item element
  let ref = React.useRef()
  let { menuItemProps } = useMenuItem(
    {
      key: item.key,
      onAction,
      onClose,
    },
    state,
    /* @ts-expect-error */
    ref
  )

  // Handle focus events so we can apply highlighted
  // style to the focused menu item
  /* let isFocused = state.selectionManager.focusedKey === item.key
  let focusBg =
    item.key === "delete" || item.key === "signout"
      ? "bg-red-500"
      : "bg-blue-500"
  let focus = isFocused ? `${focusBg} text-white` : "text-gray-900" */

  return (
    <li
      {...menuItemProps}
      /* @ts-expect-error */
      ref={ref}
      // Handle focus events so we can apply highlighted
      className={`${styles.menu_item_li} ${
        state.selectionManager.focusedKey === item.key
          ? styles.menu_item_li_focused
          : ""
      } ${
        item.key === "delete" || item.key === "signout"
          ? styles.destructive
          : ""
      }`}
    >
      {item.rendered}
    </li>
  )
}
