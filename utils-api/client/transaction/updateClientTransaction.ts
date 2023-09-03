"use client"

import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../../constants"

export const updateClientTransaction = async (
  args: Partial<SerializedTransaction> & {
    transaction_id: string
  }
) => {
  const { transaction_id, ...payload } = args
  const uri = `${BASE_URL}/transaction/${transaction_id}/`
  const init = {
    ...REQUEST_INIT,
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(payload),
  }
  return await baseFetchQuery<
    SerializedTransaction & {
      new_balance: number | null
    }
  >({
    uri,
    init,
  })
}
