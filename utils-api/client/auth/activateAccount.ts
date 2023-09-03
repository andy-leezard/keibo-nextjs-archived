"use client"

import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../../constants"

export const activateAccount = async (args: { uid: string; token: string }) => {
  const uri = `${BASE_URL}/users/activation/`
  const init = {
    ...REQUEST_INIT,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(args),
  }
  return await baseFetchQuery<SerializedUser>({
    uri,
    init,
  })
  /**
   * TODO: HANDLE CASE
   * On `token` erros
   * An object with `token` property is returned;
   * example: {token : "Invalid token for given user"}
   */
}
