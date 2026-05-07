import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { processResume, AIProvider, ProgressCallback } from '@/lib/aiService'
import { resumeDb } from '@/lib/db'
import { logger } from '@/lib/logger'

export async function POST(req: NextRequest) {
  const encoder = new TextEncoder()
  
  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      const sendProgress: ProgressCallback = (step: string) => {
        sendEvent({ type: 'progress', step })
      }

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
          sendEvent({ type: 'error', error: '请先登录' })
          controller.close()
          return
        }

        const { resumeText, provider } = await req.json()
        logger.debug('ProcessResume', `收到简历文本，长度: ${resumeText?.length || 0}`)

        if (!resumeText || resumeText.length < 100) {
          logger.warn('ProcessResume', '简历内容过短')
          sendEvent({ type: 'error', error: '简历内容过短，请输入更详细的信息' })
          controller.close()
          return
        }

        logger.info('ProcessResume', '开始调用 AI 服务', { provider: provider || 'default' })
        sendProgress('正在连接 AI 服务...')
        
        const aiResponse = await processResume(resumeText, provider as AIProvider, sendProgress)

        if (!aiResponse.success) {
          logger.error('ProcessResume', 'AI 处理失败', aiResponse.error)
          sendEvent({ type: 'error', error: aiResponse.error || 'AI 处理失败' })
          controller.close()
          return
        }

        logger.debug('ProcessResume', 'AI 返回内容长度', { length: aiResponse.content.length })
        sendProgress('正在解析 AI 返回...')

        let result
        const cleanJson = (raw: string): string => {
          let s = raw.trim()
          s = s.replace(/^[\s\S]*?(\{[\s\S]*)/, '$1')
          s = s.replace(/([\s\S]*\})[\s\S]*$/, '$1')
          s = s.replace(/```json\s*/g, '')
          s = s.replace(/```\s*/g, '')
          s = s.replace(/'/g, '"')
          s = s.replace(/([a-zA-Z_\-]+)\s*:/g, '"$1":')
          s = s.replace(/,\s*([\]\}])/g, '$1')
          s = s.replace(/([\]\}])\s*([\[{])/g, '$1,$2')
          return s
        }

        try {
          const jsonContent = cleanJson(aiResponse.content)
          result = JSON.parse(jsonContent)
          logger.debug('ProcessResume', 'JSON 解析成功')
        } catch (parseError) {
          logger.error('ProcessResume', 'JSON 解析失败，尝试二次清理')

          try {
            let s = aiResponse.content.trim()
            s = s.replace(/```json|```/g, '')

            const lines = s.split('\n')
            const cleanedLines = lines.map(line => {
              line = line.replace(/'/g, '"')
              line = line.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_\-]*)\s*:/g, '$1"$2":')
              line = line.replace(/:\s*'([^']*)'/g, ': "$1"')
              line = line.replace(/,(\s*[\]\}])/g, '$1')
              return line
            })

            s = cleanedLines.join('\n')

            const objMatch = s.match(/\{[\s\S]*\}/)
            if (objMatch) {
              s = objMatch[0]
            }

            s = s.replace(/,\s*([}\]])/g, '$1')
            result = JSON.parse(s)
            logger.debug('ProcessResume', '二次清理成功')
          } catch (secondError) {
            logger.error('ProcessResume', '二次清理失败', secondError)
            sendEvent({ type: 'error', error: 'AI 返回格式错误，请重试' })
            controller.close()
            return
          }
        }

        const talentId = 'talent-' + Date.now()
        logger.info('ProcessResume', `创建人才数据 ID: ${talentId}`)
        sendProgress('正在保存数据...')
        const importedAt = new Date()
        const importedAtLabel = importedAt.toLocaleString('zh-CN', {
          timeZone: 'Asia/Shanghai',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).replace(/\//g, '-')
        const resumeTitle = `${result.identity?.name || '未命名人才'} ${importedAtLabel}`

        const talentData = {
          id: talentId,
          userId: token.sub,
          ...result,
          rawResume: resumeText,
          createdAt: importedAt.toISOString(),
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
            title: resumeTitle,
            talent_data: talentDataJson,
            status: 'approved'
          })
          logger.info('ProcessResume', '简历处理完成', { talentId, userId: token.sub })
          sendProgress('处理完成！')
          sendEvent({ type: 'success', data: talentData })
        } catch (dbError) {
          logger.error('ProcessResume', '数据库保存失败', dbError)
          sendEvent({ type: 'error', error: '数据保存失败' })
        }
      } catch (error) {
        logger.error('ProcessResume', '处理失败', error)
        sendEvent({ type: 'error', error: '处理失败，请重试' })
      }
      
      controller.close()
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
