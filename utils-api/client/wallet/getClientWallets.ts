import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../../constants"

export const getClientWallets = async (args: { target?: number; range?: number }) => {
  const { target, range } = args
  const uri = `${BASE_URL}/get_wallets/${target}/${range}/`
  const init: RequestInit = {
    ...REQUEST_INIT,
    method: "GET",
  }
  return await baseFetchQuery<Array<SerializedWallet>>({ uri, init })
}
