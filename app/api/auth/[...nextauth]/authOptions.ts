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
        let statusCode = 0
        let data = null
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/me/`, {
            credentials: "include",
            headers: {Cookie: `access=${credentials.access}; refresh=${credentials.refresh}`},
            method: "GET",
            mode: "cors",
          })
          statusCode = response.status
          if (!response.ok) {
            throw new Error(
              `Network response was not ok with status ${statusCode} - ${response.statusText}`
            )
          }
          const as_json = await response.json()
          data = as_json
        } catch (error) {
          console.error(error)
        }
        if (data) {
          return data as DefaultUser & SerializedUser
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt(args) {
      const { user, token, account } = args
      /* console.log("JWT JWT JWT")
      console.log(args) */
      if (user) {
        // Note that this if condition is needed
        token.user = { ...user }
      }
      return token
    },
    async session(args) {
      const { session, token, user } = args
      /* console.log("session session session")
      console.log(args) */
      if (token?.user) {
        // Note that this if condition is needed
        session.user = token.user
      }
      return session
    },
  },
}
