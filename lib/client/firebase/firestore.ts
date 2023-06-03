"use client"

import { isOdd } from "@/utils"
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { fdb } from "./firebase"

export const docRef = (initialCollection: string, pathSegments: string[]) =>
  doc(fdb, initialCollection, ...pathSegments)

export const getFirestore = (
  initialCollection: string,
  pathSegments: string[]
) => getDoc(docRef(initialCollection, pathSegments))

export const fetchFirestore = async <T>(
  initialCollection: string,
  pathSegments: string[]
): Promise<[response: T | null, error: unknown]> => {
  try {
    if (!isOdd(pathSegments.length)) {
      throw new Error(
        `Firebase FDB Error: path segments' length ${pathSegments.length} is not an odd number; path is pointing a collection instead of a doc. If you wanted to fetch a whole collection, use another method.`
      )
    }
    const snapshot = await getFirestore(initialCollection, pathSegments)
    if (!snapshot.exists()) {
      throw new Error(
        `Firebase FDB Error: path ${initialCollection}${pathSegments.map(
          (p) => `/${p}`
        )} does not exist!`
      )
    }
    return [snapshot.data() as T, null]
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}

export const searchUsersByEmail = async (
  keyword: string
): Promise<[response: Array<FirestoreUser> | null, error: unknown]> => {
  const q = query(collection(fdb, "users"), where("email", "==", keyword))
  try {
    const snapshot = await getDocs(q)
    const data = snapshot.docs
      .filter((doc) => doc.exists())
      .map((doc) => doc.data()) as Array<FirestoreUser>
    return [data, null]
  } catch (error) {
    console.error(error)
    return [null, error]
  }
}

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
