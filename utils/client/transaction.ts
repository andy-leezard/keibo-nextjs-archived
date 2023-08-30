import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../constants"

export const getTransactionsFromWallet = async (wallet_id: string) => {
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

export const updateTransaction = async (
  args: Partial<SerializedTransaction> & {
    transaction_id: string
  }
) => {
  const { transaction_id, ...payload} = args
  const uri = `${BASE_URL}/transaction/${transaction_id}/`
  const init = {
    ...REQUEST_INIT,
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(payload),
  }
  return await baseFetchQuery<SerializedTransaction>({
    uri,
    init,
  })
}
