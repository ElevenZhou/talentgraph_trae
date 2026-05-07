import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { userDb } from "@/lib/db"
import { logger } from "@/lib/logger"

export default NextAuth({
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials) {
        logger.debug('Auth', `登录尝试: ${credentials?.email}`)

        if (!credentials?.email || !credentials?.password) {
          logger.warn('Auth', '缺少凭证')
          return null
        }

        const user = userDb.findByEmail(credentials.email)
        if (!user) {
          logger.warn('Auth', `用户不存在: ${credentials.email}`)
          return null
        }

        if (user.password === credentials.password) {
          logger.info('Auth', `用户登录成功: ${user.email}`, { userId: user.id, role: user.role })
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        }

        logger.warn('Auth', `密码错误: ${credentials.email}`)
        return null
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.sub = user.id
        ;(token as any).role = (user as any).role
        logger.debug('Auth', `JWT token created for user: ${user.id}`)
      }
      return token
    },
    async session(session, token) {
      if (session.user) {
        (session.user as any).id = token.sub
        (session.user as any).role = (token as any).role
        logger.debug('Auth', `Session updated`, { userId: token.sub, hasRole: !!(token as any).role })
      }
      return session
    }
  }
})
