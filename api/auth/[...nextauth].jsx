import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma";

export default async function Auth(req, res) {
  const providers = [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your Email" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:4000/api/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()
  
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ];
  return NextAuth(req, res, {
    //On n'a pas besoin du Session
    session: {
        strategy: "jwt",
        maxAge: 60*60*24,
        updateAge: 60*60
    },
    adapter: PrismaAdapter(prisma),
    providers,
    /*callbacks: {
      async session({ session, user, token }) {
        if (token?.accessToken) {
          session.accessToken = token.accessToken;
        }
        if (token?.profile) {
          session.profile = token.profile;
        }
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (account?.type === "credentials") {
          token.accessToken = user.token;
        } else {
          if (account) {
            token.accessToken = account.access_token;
          }
          if (profile) {
            token.profile = profile;
          }
        }
        return token;
      },
    },*/
  })
}