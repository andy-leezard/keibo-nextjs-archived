import { getUser } from "@/utils/common/auth"
import type { DefaultUser, NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    // a little bit less than a week
    maxAge: Math.round(60 * 60 * 24 * 6.5),
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Keibo",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        access: {
          label: "Access token",
          type: "text",
        },
        refresh: { label: "Refresh token", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.access || !credentials?.refresh) return null
        const user = await getUser(
          `access=${credentials.access}; refresh=${credentials.refresh}`
        )
        if (user.data) {
          // Any object returned will be saved in `user` property of the JWT
          return user.data as DefaultUser & SerializedUser
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt(args) {
      const { user, token, account } = args
      console.log("JWT JWT JWT")
      console.log(args)
      if (user) {
        // Note that this if condition is needed
        token.user = { ...user }
      }
      return token
    },
    async session(args) {
      const { session, token, user } = args
      console.log("session session session")
      console.log(args)
      if (token?.user) {
        // Note that this if condition is needed
        session.user = token.user
      }
      return session
    },
  },
}
