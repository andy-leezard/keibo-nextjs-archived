import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../../constants"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

export const getServerWallets = async (args: {
  target?: number
  range?: number
  cookie: ReadonlyRequestCookies
}) => {
  const { target, range, cookie } = args
  const uri = `${BASE_URL}/get_wallets/${target}/${range}/`
  const init: RequestInit = {
    ...REQUEST_INIT,
    headers: { Cookie: cookie.toString() },
    method: "GET",
  }
  return await baseFetchQuery<Array<SerializedWallet>>({ uri, init })
}
