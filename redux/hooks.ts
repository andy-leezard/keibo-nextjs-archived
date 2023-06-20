import { useSelector, useDispatch } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch } from "./store"

/** Enforce typing on useDispatch */
export const useAppDispatch: () => AppDispatch = useDispatch
/** Enforce typing on useSelector */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
