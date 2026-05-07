import { NextResponse } from 'next/server'
import { userDb } from '@/lib/db'
import { randomUUID } from 'crypto'

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()
    
    if (!email || !password || !name) {
      return NextResponse.json({ error: '请填写完整信息' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: '密码至少6位' }, { status: 400 })
    }

    const existingUser = userDb.findByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: '该邮箱已注册' }, { status: 409 })
    }

    const { getDb } = await import('@/lib/db')
    const db = getDb()
    
    const stmt = db.prepare(
      'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)'
    )
    stmt.run(randomUUID(), name, email, password, 'user')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: '注册失败，请重试' },
      { status: 500 }
    )
  }
}
