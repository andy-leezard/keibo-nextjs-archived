"use client"

import { useState, useRef, useEffect } from "react"
import styles from "./TypingText.module.css"

export const TypingText = (props: {
  texts: string[]
  className?: string
  wait?: number
  waitbt?: number
  speed?: number
  op?: number
}) => {
  const [state, setState] = useState({
    left: "",
    right: "",
    texts: props.texts,
    current: props.texts[0],
  })
  const stay = useRef(false)
  const staybt = useRef(false)
  const update = () => {
    const addNextChar = () => {
      setState({
        ...state,
        left: state.left + state.texts[0].slice(0, 1),
        right: state.texts[0].slice(1),
        texts: state.texts.map((e, i) => (i === 0 ? e.slice(1) : e)),
      })
    }
    const deleteLastChar = () => {
      if (state.left.slice(0, -1) === "") {
        stay.current = true
        staybt.current = true
      }
      setState({
        ...state,
        left: state.left.slice(0, -1),
        right: state.left.slice(-1) + state.right,
      })
    }
    const switchToNextText = () => {
      stay.current = false
      staybt.current = false
      const nextText = state.texts[1]
      setState({
        ...state,
        left: nextText.slice(0, 1), // first char of next text
        right: nextText.slice(1), // rest of the next char
        texts: [
          ...state.texts.slice(1).map((e, i) => (i === 0 ? e.slice(1) : e)),
          state.current,
        ],
        current: nextText,
      })
    }
    if (state.texts[0].length === 0) {
      stay.current = false
      if (state.left === "") switchToNextText()
      else deleteLastChar()
    } else addNextChar()
  }
  useEffect(() => {
    setTimeout(
      () => {
        if (state.texts[0].length === 1) stay.current = true
        window.requestAnimationFrame(update)
      },
      stay.current
        ? staybt.current
          ? props.waitbt || 30
          : props.wait || 3000
        : props.speed || 30
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update])
  return (
    <span className={`${styles.typing_text} ${props.className ?? ""}`}>
      {state.left}
      <span>{state.right}</span>
    </span>
  )
}
