import { NextResponse } from 'next/server'
import { userDb, resumeDb } from '@/lib/db'

export async function GET() {
  const totalUsers = userDb.count()
  const totalResumes = resumeDb.count()
  const today = new Date().toISOString().split('T')[0]
  
  const allResumes = resumeDb.findAll()
  const todayResumes = allResumes.filter(r => r.created_at.startsWith(today)).length
  
  const allUsers = userDb.findAll()
  const todayUsers = allUsers.filter(u => u.created_at.startsWith(today)).length

  return NextResponse.json({
    totalUsers,
    totalResumes,
    todayUsers,
    todayResumes
  })
}
