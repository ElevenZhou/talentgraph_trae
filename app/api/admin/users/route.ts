import { NextResponse } from 'next/server'
import { userDb, resumeDb } from '@/lib/db'

export async function GET() {
  try {
    const users = userDb.findAll()
    const resumes = resumeDb.findAll()
    
    const usersWithResumeCount = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: 'active' as const,
      createdAt: user.created_at,
      resumeCount: resumes.filter(r => r.user_id === user.id).length
    }))

    return NextResponse.json({ users: usersWithResumeCount })
  } catch (error) {
    console.error('Fetch users error:', error)
    return NextResponse.json({ error: '获取用户列表失败' }, { status: 500 })
  }
}
