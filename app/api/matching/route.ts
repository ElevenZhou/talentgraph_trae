import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { analyzeMatching, AIProvider } from '@/lib/aiService'
import { logger } from '@/lib/logger'

export async function POST(req: Request) {
  try {
    logger.debug('Matching', '开始匹配分析')

    const token = await getToken({ req })
    logger.debug('Matching', 'Token 解析结果', { 
      hasToken: !!token, 
      hasSub: !!token?.sub,
      tokenKeys: token ? Object.keys(token) : []
    })

    if (!token || !token.sub) {
      logger.warn('Matching', '未授权访问')
      return NextResponse.json({ error: '请先登录' }, { status: 401 })
    }

    const { talent, projectRequirement, provider } = await req.json()
    
    if (!talent) {
      logger.warn('Matching', '缺少人才数据')
      return NextResponse.json({ error: '人才数据不能为空' }, { status: 400 })
    }

    if (!projectRequirement || projectRequirement.length < 20) {
      logger.warn('Matching', '项目需求过短')
      return NextResponse.json({ error: '项目需求描述过短，请提供更详细的信息' }, { status: 400 })
    }

    logger.info('Matching', '开始调用 AI 匹配分析', { 
      provider: provider || 'default',
      talentName: talent.identity?.name || 'unknown',
      requirementLength: projectRequirement.length
    })

    const aiResponse = await analyzeMatching(
      JSON.stringify(talent),
      projectRequirement,
      provider as AIProvider
    )

    if (!aiResponse.success) {
      logger.error('Matching', 'AI 分析失败', aiResponse.error)
      return NextResponse.json(
        { error: aiResponse.error || 'AI 匹配分析失败' },
        { status: 500 }
      )
    }

    logger.debug('Matching', 'AI 返回内容长度', { length: aiResponse.content.length })

    let result
    try {
      result = JSON.parse(aiResponse.content)
      logger.debug('Matching', 'JSON 解析成功')
    } catch (parseError) {
      logger.error('Matching', 'JSON 解析失败', parseError)
      logger.debug('Matching', 'AI 原始内容', { content: aiResponse.content.substring(0, 500) })
      return NextResponse.json({ error: 'AI 返回格式错误' }, { status: 500 })
    }

    // 验证必需字段
    const requiredFields = ['overallScore', 'strengths', 'gaps', 'risks', 'recommendation', 'collaborationSuggestion', 'detailedAnalysis']
    const missingFields = requiredFields.filter(field => !result[field])
    
    if (missingFields.length > 0) {
      logger.warn('Matching', 'AI 返回缺少必需字段', { missingFields })
      return NextResponse.json({ error: 'AI 返回数据不完整' }, { status: 500 })
    }

    logger.info('Matching', '匹配分析完成', { 
      talentName: talent.identity?.name,
      score: result.overallScore,
      recommendation: result.recommendation
    })

    return NextResponse.json({
      ...result,
      aiProvider: aiResponse.provider
    })
  } catch (error) {
    logger.error('Matching', '匹配分析失败', error)
    return NextResponse.json(
      { error: '匹配分析失败，请重试' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: '匹配分析 API',
    endpoints: {
      POST: '/api/matching - 执行人才-项目匹配分析'
    },
    requiredParams: {
      talent: '人才数据对象',
      projectRequirement: '项目需求描述（至少20字符）',
      provider: '可选：AI服务商 (openai/deepseek)'
    }
  })
}