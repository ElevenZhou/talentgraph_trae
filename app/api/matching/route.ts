import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { analyzeMatching, AIProvider } from '@/lib/aiService'

export async function POST(req: Request) {
  try {
    const token = await getToken({ req })
    if (!token) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 })
    }

    const { talent, projectRequirement, provider } = await req.json()
    if (!talent || !projectRequirement) {
      return NextResponse.json({ error: '参数不完整' }, { status: 400 })
    }

    const aiResponse = await analyzeMatching(
      JSON.stringify(talent),
      projectRequirement,
      provider as AIProvider
    )

    if (!aiResponse.success) {
      return NextResponse.json(
        { error: aiResponse.error || 'AI 匹配分析失败' },
        { status: 500 }
      )
    }

    let result
    try {
      result = JSON.parse(aiResponse.content)
    } catch {
      return NextResponse.json({ error: 'AI 返回格式错误' }, { status: 500 })
    }

    return NextResponse.json({
      ...result,
      aiProvider: aiResponse.provider
    })
  } catch (error) {
    console.error('Matching error:', error)
    return NextResponse.json(
      { error: '匹配分析失败，请重试' },
      { status: 500 }
    )
  }
}
