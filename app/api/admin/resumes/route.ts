import { NextResponse } from 'next/server'
import { resumeDb, userDb } from '@/lib/db'

export async function GET() {
  try {
    const resumes = resumeDb.findAll()
    
    const resumesWithUser = resumes.map(resume => {
      const user = userDb.findById(resume.user_id)
      return {
        id: resume.id,
        userId: resume.user_id,
        userName: user?.name || '未知',
        userEmail: user?.email || '未知',
        status: resume.status,
        createdAt: resume.created_at,
        talentData: resume.talent_data
      }
    })

    return NextResponse.json({ resumes: resumesWithUser })
  } catch (error) {
    console.error('Fetch resumes error:', error)
    return NextResponse.json({ error: '获取简历列表失败' }, { status: 500 })
  }
}
