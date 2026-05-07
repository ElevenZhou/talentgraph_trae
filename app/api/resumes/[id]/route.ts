import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { resumeDb } from '@/lib/db'
import { findDemoTalent } from '@/data/demoTalents'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
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

    const demoTalent = findDemoTalent(id)
    if (demoTalent) {
      if (shareToken && demoTalent.agentMeta.accessToken !== shareToken) {
        return NextResponse.json({ error: '无效的访问令牌' }, { status: 401 })
      }
      return NextResponse.json({ data: demoTalent, isDemo: true })
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = await getToken({ req })
    if (!token) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 })
    }

    const { id } = params
    if (findDemoTalent(id)) {
      return NextResponse.json({ success: true, isDemo: true })
    }

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

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const token = await getToken({ req })
    if (!token?.sub) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 })
    }

    const { id } = params
    if (findDemoTalent(id)) {
      return NextResponse.json({ error: '演示简历暂不支持改名' }, { status: 400 })
    }

    const body = await req.json()
    const title = String(body.title || '').trim()

    if (!title) {
      return NextResponse.json({ error: '简历名称不能为空' }, { status: 400 })
    }

    if (title.length > 80) {
      return NextResponse.json({ error: '简历名称不能超过 80 个字符' }, { status: 400 })
    }

    const success = resumeDb.updateTitle(id, token.sub, title)
    if (!success) {
      return NextResponse.json({ error: '简历不存在或无权修改' }, { status: 404 })
    }

    return NextResponse.json({ success: true, title })
  } catch (error) {
    console.error('Update resume title error:', error)
    return NextResponse.json({ error: '修改简历名称失败' }, { status: 500 })
  }
}
