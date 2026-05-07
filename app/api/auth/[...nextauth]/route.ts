import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { userDb } from "@/lib/db"

// @ts-expect-error - NextAuth 类型扩展
const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = userDb.findByEmail(credentials.email)
        if (!user) {
          return null
        }

        if (user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        }

        return null
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-expect-error - 扩展 session.user 属性
        session.user.id = token.userId
        // @ts-expect-error - 扩展 session.user 属性
        session.user.role = token.role
      }
      return session
    }
  }
})

export { handler as GET, handler as POST }
