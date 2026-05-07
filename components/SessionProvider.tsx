'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider
      session={null}
      baseUrl={process.env.NEXTAUTH_URL}
    >
      {children}
    </NextAuthSessionProvider>
  )
}
