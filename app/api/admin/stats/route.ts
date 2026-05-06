import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    totalUsers: 128,
    totalResumes: 256,
    todayUsers: 8,
    todayResumes: 15
  })
}
