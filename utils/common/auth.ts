import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../constants"

export const getUser = async (
  /** Stringified Cookie containing `access` and `refresh` */
  Cookie: string
): Promise<TGenericFetchResponse<SerializedUser>> => {
  const uri = `${BASE_URL}/users/me/`
  const init = {
    ...REQUEST_INIT,
    headers: { Cookie },
    method: "GET",
  }
  return await baseFetchQuery<SerializedUser>({
    uri,
    init,
  })
}
