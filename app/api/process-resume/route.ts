import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { processResume, AIProvider } from '@/lib/aiService'

export async function POST(req: Request) {
  try {
    const token = await getToken({ req })
    if (!token) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 })
    }

    const { resumeText, provider } = await req.json()
    if (!resumeText || resumeText.length < 100) {
      return NextResponse.json({ error: '简历内容过短，请输入更详细的信息' }, { status: 400 })
    }

    const aiResponse = await processResume(resumeText, provider as AIProvider)
    
    if (!aiResponse.success) {
      return NextResponse.json(
        { error: aiResponse.error || 'AI 处理失败' },
        { status: 500 }
      )
    }

    let result
    try {
      result = JSON.parse(aiResponse.content)
    } catch {
      return NextResponse.json({ error: 'AI 返回格式错误' }, { status: 500 })
    }

    const talentId = 'talent-' + Date.now()
    
    const talentData = {
      id: talentId,
      userId: token.sub,
      ...result,
      rawResume: resumeText,
      createdAt: new Date().toISOString(),
      agentMeta: {
        accessToken: 'token-' + Math.random().toString(36).substr(2, 9),
        permissionScope: ['read', 'match', 'evaluate'],
        instructions: 'Evaluate fit only within authorized context. Do not expose private contact information.',
        humanViewUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/graph/${talentId}?view=human`,
        agentProfileUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/graph/${talentId}?view=agent`,
        structuredJsonUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/graph/${talentId}?view=json`
      },
      aiProvider: aiResponse.provider
    }

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
      await supabase.from('resumes').insert({
        user_id: token.sub,
        talent_data: talentData
      })
    }

    return NextResponse.json(talentData)
  } catch (error) {
    console.error('Process error:', error)
    return NextResponse.json(
      { error: '处理失败，请重试' },
      { status: 500 }
    )
  }
}
