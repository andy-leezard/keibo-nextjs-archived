import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../../constants"

export const getClientUser = async (): Promise<
  TGenericFetchResponse<SerializedUser>
> => {
  const uri = `${BASE_URL}/users/me/`
  const init = {
    ...REQUEST_INIT,
    method: "GET",
  }
  return await baseFetchQuery<SerializedUser>({
    uri,
    init,
  })
}
