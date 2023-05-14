"use client"

import { isOdd } from "@/utils"
import { DocumentData, doc, updateDoc } from "firebase/firestore"
import { fdb } from "./firebase"

export const docRef = (initialCollection: string, pathSegments: string[]) =>
  doc(fdb, initialCollection, ...pathSegments)

export const updateFirestore = async (
  initialCollection: string,
  pathSegments: string[],
  payload: DocumentData
) => {
  try {
    if (!isOdd(pathSegments.length)) {
      throw new Error(
        `Firebase FDB Error: path segments' length ${pathSegments.length} is not an odd number; cannot update a doc where a collection is supposed to be!`
      )
    }
    await updateDoc(docRef(initialCollection, pathSegments), payload)
    return true
  } catch (e) {
    return false
  }
}
