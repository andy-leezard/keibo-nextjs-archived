import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../constants"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

export const getWallet = async (args: {
  wallet_id: string
  cookie?: ReadonlyRequestCookies
}) => {
  const { wallet_id, cookie } = args
  const uri = `${BASE_URL}/wallet/${wallet_id}/`
  const init: RequestInit = {
    ...REQUEST_INIT,
    method: "GET",
  }
  if (cookie) {
    init.headers = { Cookie: cookie.toString() }
  }
  return await baseFetchQuery<SerializedWallet>({ uri, init })
}

export const getWallets = async (args: {
  target?: number
  range?: number
  cookie?: ReadonlyRequestCookies
}) => {
  const { target, range, cookie } = args
  const uri = `${BASE_URL}/get_wallets/${target}/${range}/`
  const init: RequestInit = {
    ...REQUEST_INIT,
    method: "GET",
  }
  if (cookie) {
    init.headers = { Cookie: cookie.toString() }
  }
  return await baseFetchQuery<Array<SerializedWallet>>({ uri, init })
}
