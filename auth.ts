import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcrypt-ts"

const useSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project-id.supabase.co" &&
  process.env.SUPABASE_SERVICE_ROLE_KEY &&
  process.env.SUPABASE_SERVICE_ROLE_KEY !== "your-service-role-key-here"

const testUsers: Record<string, { id: string; name: string; email: string; password: string; role: string }> = {
  "test@talentgraph.com": {
    id: "test-user-001",
    name: "张伟",
    email: "test@talentgraph.com",
    password: "test123",
    role: "user"
  },
  "admin@talentgraph.com": {
    id: "admin-user-001",
    name: "管理员",
    email: "admin@talentgraph.com",
    password: "admin123",
    role: "admin"
  },
  "user01@talentgraph.com": {
    id: "test-user-002",
    name: "李明",
    email: "user01@talentgraph.com",
    password: "123456",
    role: "user"
  },
  "user02@talentgraph.com": {
    id: "test-user-003",
    name: "王芳",
    email: "user02@talentgraph.com",
    password: "123456",
    role: "user"
  },
  "user03@talentgraph.com": {
    id: "test-user-004",
    name: "刘洋",
    email: "user03@talentgraph.com",
    password: "123456",
    role: "user"
  },
  "user04@talentgraph.com": {
    id: "test-user-005",
    name: "陈静",
    email: "user04@talentgraph.com",
    password: "123456",
    role: "user"
  },
  "user05@talentgraph.com": {
    id: "test-user-006",
    name: "杨帆",
    email: "user05@talentgraph.com",
    password: "123456",
    role: "user"
  },
  "user06@talentgraph.com": {
    id: "test-user-007",
    name: "赵磊",
    email: "user06@talentgraph.com",
    password: "123456",
    role: "user"
  },
  "user07@talentgraph.com": {
    id: "test-user-008",
    name: "周婷",
    email: "user07@talentgraph.com",
    password: "123456",
    role: "user"
  },
  "user08@talentgraph.com": {
    id: "test-user-009",
    name: "吴强",
    email: "user08@talentgraph.com",
    password: "123456",
    role: "user"
  },
  "user09@talentgraph.com": {
    id: "test-user-010",
    name: "郑琳",
    email: "user09@talentgraph.com",
    password: "123456",
    role: "user"
  },
  "user10@talentgraph.com": {
    id: "test-user-011",
    name: "孙浩",
    email: "user10@talentgraph.com",
    password: "123456",
    role: "user"
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        if (useSupabase) {
          const { createClient } = await import('@supabase/supabase-js')
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
          )
          
          const { data: user } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single()
          
          if (!user) return null
          
          const passwordHash = (user as any).password_hash
          if (!passwordHash) return null
          
          const isValid = await compare(credentials.password as string, passwordHash)
          if (!isValid) return null
          
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image
          }
        } else {
          const testUser = testUsers[credentials.email]
          if (testUser && testUser.password === credentials.password) {
            return {
              id: testUser.id,
              name: testUser.name,
              email: testUser.email,
              image: null,
              role: testUser.role
            }
          }
          return null
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.userId = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId
      }
      return session
    }
  }
})
