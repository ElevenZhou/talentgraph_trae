import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { processResume, AIProvider } from '@/lib/aiService'
import { resumeDb } from '@/lib/db'
import { logger } from '@/lib/logger'

export async function POST(req: Request) {
  try {
    logger.debug('ProcessResume', '开始处理简历')

    const token = await getToken({ req })
    logger.debug('ProcessResume', 'Token 解析结果', { 
      hasToken: !!token, 
      hasSub: !!token?.sub,
      tokenKeys: token ? Object.keys(token) : []
    })

    if (!token || !token.sub) {
      logger.warn('ProcessResume', '未授权访问')
      return NextResponse.json({ error: '请先登录' }, { status: 401 })
    }

    const { resumeText, provider } = await req.json()
    logger.debug('ProcessResume', `收到简历文本，长度: ${resumeText?.length || 0}`)

    if (!resumeText || resumeText.length < 100) {
      logger.warn('ProcessResume', '简历内容过短')
      return NextResponse.json({ error: '简历内容过短，请输入更详细的信息' }, { status: 400 })
    }

    logger.info('ProcessResume', '开始调用 AI 服务', { provider: provider || 'default' })
    const aiResponse = await processResume(resumeText, provider as AIProvider)

    if (!aiResponse.success) {
      logger.error('ProcessResume', 'AI 处理失败', aiResponse.error)
      return NextResponse.json(
        { error: aiResponse.error || 'AI 处理失败' },
        { status: 500 }
      )
    }

    logger.debug('ProcessResume', 'AI 返回内容长度', { length: aiResponse.content.length })

    let result
    try {
      result = JSON.parse(aiResponse.content)
      logger.debug('ProcessResume', 'JSON 解析成功')
    } catch (parseError) {
      logger.error('ProcessResume', 'JSON 解析失败', parseError)
      logger.debug('ProcessResume', 'AI 原始内容', { content: aiResponse.content.substring(0, 500) })
      return NextResponse.json({ error: 'AI 返回格式错误' }, { status: 500 })
    }

    const talentId = 'talent-' + Date.now()
    logger.info('ProcessResume', `创建人才数据 ID: ${talentId}`)

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

    const talentDataJson = JSON.stringify(talentData)
    logger.debug('ProcessResume', '开始保存到数据库', { talentId, userId: token.sub })

    try {
      resumeDb.create({
        id: talentId,
        user_id: token.sub,
        talent_data: talentDataJson,
        status: 'approved'
      })
      logger.info('ProcessResume', '简历处理完成', { talentId, userId: token.sub })
    } catch (dbError) {
      logger.error('ProcessResume', '数据库保存失败', dbError)
      return NextResponse.json({ error: '数据保存失败' }, { status: 500 })
    }

    return NextResponse.json(talentData)
  } catch (error) {
    logger.error('ProcessResume', '处理失败', error)
    return NextResponse.json(
      { error: '处理失败，请重试' },
      { status: 500 }
    )
  }
}
