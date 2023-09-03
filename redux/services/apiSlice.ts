import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query"
import { Mutex } from "async-mutex"
import { logout } from "@/utils-api/client/auth/logout"

const mutex = new Mutex()
const tailoredFetchBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
  /** attach cookies automatically to the requests for handling CORS */
  credentials: "include",
})
const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  const start_at = Date.now()
  console.log("waiting for mutex to be available")
  await mutex.waitForUnlock()
  const waited_ms = Date.now() - start_at
  console.log(`mutex availability check took ${waited_ms}ms`)
  let result = await tailoredFetchBaseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    await mutex.waitForUnlock()
    const release = await mutex.acquire()
    try {
      const refreshResult = await tailoredFetchBaseQuery(
        {
          url: "/jwt/refresh/",
          method: "POST",
        },
        api,
        extraOptions
      )
      if (refreshResult.data) {
        // retry the initial query
        result = await tailoredFetchBaseQuery(args, api, extraOptions)
      } else {
        await logout()
      }
    } catch (e) {
      console.error(e)
    } finally {
      // release must be called once the mutex should be released again.
      release()
    }
  }
  return result
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({}),
})
