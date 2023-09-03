"use client"

import { BASE_URL, REQUEST_INIT, baseFetchQuery } from "../../constants"

export const registerUser = async (args: {
  first_name: string
  last_name: string
  email: string
  password: string
  re_password: string
}): Promise<TGenericFetchResponse<SerializedUser>> => {
  const uri = `${BASE_URL}/users/`
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
   * On success: `SerializedUser` type is returned
   */
  /**
   * TODO: HANDLE CASE
   * On `non_field_errors`
   * An object with `non_field_errors` property is returned;
   * example: {non_field_errors : "The two password fields didn't match"}
   */
  /**
   * TODO: HANDLE CASE
   * On `email` errors
   * An object with `email` property is returned;
   * example: {"email": ["keibo user with this email already exists."]}
   */
}
