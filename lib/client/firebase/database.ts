"use client"

import { get, ref } from "firebase/database"
import { rdb } from "./firebase"

const refRDB = (path: string) => ref(rdb, path)
const getRDB = (path: string) => get(refRDB(path))

/**
 * @callback onFirebaseError
 */

/**
 * This function is an extended version of get_rtdb.
 * @param {string} path - path as raw string path
 * @param {onFirebaseError | undefined} onError - ()=>void onError
 * @returns {any}
 */
const fetchRDB = async <T>(
  path: string,
  onError?: () => void
): Promise<T | null> => {
  try {
    const snapshot = await getRDB(path)
    if (!snapshot.exists()) {
      throw new Error(`Firebase RTDB Error: path ${path} does not exist!`)
    }
    return snapshot.val()
  } catch (e) {
    console.error((e as Error)?.message)
    onError && onError()
    return null
  }
}

export { refRDB, getRDB, fetchRDB }
