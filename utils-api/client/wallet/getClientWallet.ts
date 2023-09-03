import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../../constants"

export const getClientWallet = async (args: { wallet_id: string }) => {
  const { wallet_id } = args
  const uri = `${BASE_URL}/wallet/${wallet_id}/`
  const init: RequestInit = {
    ...REQUEST_INIT,
    method: "GET",
  }
  return await baseFetchQuery<SerializedWallet>({ uri, init })
}
