"use client"

import {
  MouseEvent,
  TouchEvent,
  forwardRef,
  ForwardedRef,
  RefObject,
} from "react"
import styles from "./Dialog.module.css"
import Button from "../button"
import { WithLocale, t } from "@/i18n-config"

type DialogProps = WithLocale &
  WithChildren & {
    onClose?: () => void
  }

const DialogRef = (
  { currentLocale, children, onClose }: DialogProps,
  ref: ForwardedRef<HTMLDialogElement>
) => {
  const closeDialog = (ref: ForwardedRef<HTMLDialogElement>) => {
    const dialogRef = ref as RefObject<HTMLDialogElement>
    if (!dialogRef?.current) return
    dialogRef.current.close()
  }

  const onMouseDownBackdrop = (
    event: MouseEvent<HTMLDialogElement, globalThis.MouseEvent>
  ) => {
    const dialogRef = ref as RefObject<HTMLDialogElement>
    if (!dialogRef?.current) return
    const rect = dialogRef.current.getBoundingClientRect()
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width
    if (!isInDialog) {
      closeDialog(ref)
    }
  }

  const onTouchStartBackdrop = (event: TouchEvent<HTMLDialogElement>) => {
    const dialogRef = ref as RefObject<HTMLDialogElement>
    if (!dialogRef?.current) return
    const rect = dialogRef.current.getBoundingClientRect()
    const touchLocation = event.touches[0]
    const isInDialog =
      rect.top <= touchLocation.clientY &&
      touchLocation.clientY <= rect.top + rect.height &&
      rect.left <= touchLocation.clientX &&
      touchLocation.clientX <= rect.left + rect.width
    if (!isInDialog) {
      closeDialog(ref)
    }
  }

  return (
    <dialog
      ref={ref}
      className={styles.modal}
      onClose={() => onClose && onClose()}
      onMouseDown={(event) => onMouseDownBackdrop(event)}
      onTouchStart={(event) => onTouchStartBackdrop(event)}
    >
      <div
        className={styles.modal_container}
      >
        {children}
        <Button corner="rounded" onPress={() => closeDialog(ref)}>
          {t(currentLocale, {
            en: "Close",
            fr: "Fermer",
            ko: "닫기",
          })}
        </Button>
      </div>
    </dialog>
  )
}

const Dialog = forwardRef(DialogRef)

export default Dialog
