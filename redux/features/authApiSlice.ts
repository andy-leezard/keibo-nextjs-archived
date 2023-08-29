import { apiSlice } from "../services/apiSlice"

interface SocialAuthArgs {
  provider: string
  state: string
  code: string
}

interface CreateUseResponse {
  success: boolean
  user: SerializedUser
}

/**
 * dynamically inject endpoints
 * */
const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    activation: builder.mutation({
      query: ({ uid, token }) => ({
        url: "/users/activation/",
        method: "POST",
        body: { uid, token },
      }),
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: "/users/reset_password/",
        method: "POST",
        body: { email },
      }),
    }),
    resetPasswordConfirm: builder.mutation({
      query: ({ uid, token, new_password, re_new_password }) => ({
        url: "/users/reset_password_confirm/",
        method: "POST",
        body: { uid, token, new_password, re_new_password },
      }),
    }),
  }),
})

export const {
  useActivationMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
} = authApiSlice
