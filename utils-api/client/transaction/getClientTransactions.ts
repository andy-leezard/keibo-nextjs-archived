"use client"

import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../../constants"

export const getClientTransactions = async (wallet_id: string) => {
  const uri = `${BASE_URL}/get_transactions/${wallet_id}/`
  const init = {
    ...REQUEST_INIT,
    method: "GET",
  }
  return await baseFetchQuery<Array<SerializedTransaction>>({
    uri,
    init,
  })
}
