import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { resumeDb } from '@/lib/db'
import { getDemoResumeRows } from '@/data/demoTalents'

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 })
    }

    const resumes = resumeDb.findByUserId(token.sub as string)
    if (resumes.length === 0) {
      return NextResponse.json({ resumes: getDemoResumeRows(token.sub as string), isDemoSeed: true })
    }

    return NextResponse.json({ resumes })
  } catch (error) {
    console.error('Fetch resumes error:', error)
    return NextResponse.json({ error: '获取简历列表失败' }, { status: 500 })
  }
}
