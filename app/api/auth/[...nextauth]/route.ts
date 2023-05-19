import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import { cert } from "firebase-admin/app"
//import { db } from "../../../lib/firebase/firebase_server"
//import AppleProvider from "next-auth/providers/apple"
//import EmailProvider from 'next-auth/providers/email'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // OAuth authentication providers...
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    /* AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
    }), */
    /* EmailProvider({
      server: process.env.MAIL_SERVER,
      from: 'NextAuth.js <no-reply@example.com>'
    }), */
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_CONFIG_project_id,
      clientEmail: process.env.FIREBASE_ADMIN_CONFIG_client_email,
      privateKey: process.env.FIREBASE_ADMIN_CONFIG_private_key,
    }),
    namingStrategy: "snake_case",
  }),
  pages: {
    /* signIn: "auth", */
    /* signOut: "/auth/signout",
     * error: "/auth/error", // Error code passed in query string as ?error=,
     * verifyRequest: "/auth/verify-request", // (used for check email message),
     * newUser:
     * "/welcome", // If set, new users will be directed here on first sign in,
     */
  },
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user) {
        ;(session.user as any).id = user.id
      }
      return session
    },
  },
  // A database is optional, but required to persist accounts in a database
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
