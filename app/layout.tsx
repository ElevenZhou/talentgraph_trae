import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Layout from '../components/Layout'
import { SessionProvider } from '../components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '人才引力场 | TalentGraph - AI 原生人才图谱平台',
  description: '把传统简历转化为 AI 可读的人才能力图谱，让项目自动找到真正匹配的人',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <SessionProvider>
          <Layout>{children}</Layout>
        </SessionProvider>
      </body>
    </html>
  )
}
