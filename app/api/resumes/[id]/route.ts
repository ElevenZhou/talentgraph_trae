import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { resumeDb } from '@/lib/db'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    
    // 首先尝试通过 NextAuth 获取用户 token（正常登录情况）
    const authToken = await getToken({ req })
    
    // 如果没有登录，检查 URL 中的 token 参数（分享链接情况）
    const url = new URL(req.url)
    const shareToken = url.searchParams.get('token')
    
    // 必须有其中一种认证方式
    if (!authToken && !shareToken) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 })
    }

    const resume = resumeDb.findById(id)
    
    if (!resume) {
      return NextResponse.json({ error: '简历不存在' }, { status: 404 })
    }

    // 如果是分享链接方式，验证 token 是否匹配
    if (shareToken && resume.talent_data.agentMeta.accessToken !== shareToken) {
      return NextResponse.json({ error: '无效的访问令牌' }, { status: 401 })
    }

    return NextResponse.json({ data: resume.talent_data })
  } catch (error) {
    console.error('Fetch resume error:', error)
    return NextResponse.json({ error: '获取简历失败' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const token = await getToken({ req })
    if (!token) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 })
    }

    const { id } = params
    const success = resumeDb.deleteById(id)
    
    if (!success) {
      return NextResponse.json({ error: '删除失败' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete resume error:', error)
    return NextResponse.json({ error: '删除失败' }, { status: 500 })
  }
}