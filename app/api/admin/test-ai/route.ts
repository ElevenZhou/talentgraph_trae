import { NextResponse } from 'next/server'
import { callAI, AIProvider } from '@/lib/aiService'

export async function POST(req: Request) {
  try {
    const { provider } = await req.json()
    
    const response = await callAI(
      [{ role: 'user', content: 'Hello, test connection' }],
      provider as AIProvider
    )

    if (response.success) {
      return NextResponse.json({ success: true, message: '连接成功' })
    } else {
      return NextResponse.json({ success: false, message: response.error })
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: '测试失败' })
  }
}
