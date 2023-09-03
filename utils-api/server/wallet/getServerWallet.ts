import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../../constants"

export const getServerWallet = async (args: {
  wallet_id: string
  cookie: ReadonlyRequestCookies
}) => {
  const { wallet_id, cookie } = args
  const uri = `${BASE_URL}/wallet/${wallet_id}/`
  const init: RequestInit = {
    ...REQUEST_INIT,
    headers: { Cookie: cookie.toString() },
    method: "GET",
  }
  return await baseFetchQuery<SerializedWallet>({ uri, init })
}
