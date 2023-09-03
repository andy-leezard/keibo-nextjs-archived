import { isNoneArrayObject } from "@/utils"

export function generatePreviousArray(currentPage: number, size: number) {
  return Array.from({ length: size }, (_, i) => currentPage - 1 - i).filter(
    (i) => i >= 0
  )
}

export function generateNextArray(
  currentPage: number,
  size: number,
  max: number
) {
  return Array.from({ length: size }, (_, i) => currentPage + 1 + i).filter(
    (i) => i <= max
  )
}

export const getPageRange = (currentPage: number, size: number) => {
  if (currentPage <= size) {
    return currentPage
  } else {
    return size
  }
}

export type AwaitedArrayData<T> = {
  metadata: {
    page_ended: boolean
  }
  data: Array<T>
}

export const fetchEdgeDataAsArray = async <T>(
  url: string
): Promise<[response: AwaitedArrayData<T> | null, error: unknown]> => {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error("Network response was not ok")
    }
    const json_res = await res.json()
    if (!isNoneArrayObject(json_res)) {
      throw new Error("Response data type is not an object")
    }
    return [json_res, null]
    /* const { metadata, data } = json_res
    setData(data)
    setPageEnded(Boolean(metadata.page_ended)) */
  } catch (error) {
    console.log(error)
    return [null, error]
  }
}

export const fetchEdgeData = async <T>(
  url: string
): Promise<[response: T | null, error: unknown]> => {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error("Network response was not ok")
    }
    const json_res = await res.json()
    return [json_res, null]
    /* const { metadata, data } = json_res
    setData(data)
    setPageEnded(Boolean(metadata.page_ended)) */
  } catch (error) {
    console.log(error)
    return [null, error]
  }
}
