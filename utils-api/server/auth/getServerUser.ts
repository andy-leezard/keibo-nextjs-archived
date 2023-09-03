import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../../constants"

export const getServerUser = async (
  cookie: ReadonlyRequestCookies
): Promise<TGenericFetchResponse<SerializedUser>> => {
  const access = cookie.get("access")
  const refresh = cookie.get("refresh")
  if (!access || !refresh) {
    return {
      statusCode: 401,
      networkError: false,
      data: null,
    }
  }
  const uri = `${BASE_URL}/users/me/`
  const init = {
    ...REQUEST_INIT,
    headers: { Cookie: cookie.toString() },
    method: "GET",
  }
  return await baseFetchQuery<SerializedUser>({
    uri,
    init,
  })
}
