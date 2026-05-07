'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Upload, FileText, Loader2, ArrowRight, Sparkles, Brain, Network, Target, CheckCircle2, Circle } from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'

if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`
}

interface TalentGraphData {
  id: string
  identity: {
    name: string
    role: string
    location: string
    availability: string
    preferences: string[]
  }
  capabilities: {
    id: string
    name: string
    level: string
    category: string
    evidenceIds: string[]
    description: string
  }[]
  evidence: {
    id: string
    type: string
    title: string
    organization: string
    period: string
    description: string
    capabilities: string[]
    links?: string[]
  }[]
  boundaries: {
    strong: string[]
    moderate: string[]
    weak: string[]
    collaboration: string[]
  }
  matching: {
    idealProjects: string[]
    avoidProjects: string[]
    independenceLevel: string
    riskFactors: string[]
    salaryRange?: [number, number]
  }
  agentMeta: {
    accessToken: string
    permissionScope: string[]
    instructions: string
    humanViewUrl: string
    agentProfileUrl: string
    structuredJsonUrl: string
  }
  rawResume: string
  createdAt: string
}

const MAX_RESUME_LENGTH = 5000

const PROCESS_STEPS = [
  { id: 'parse', name: '理解简历结构', icon: FileText, description: '正在阅读和解析简历内容' },
  { id: 'extract', name: '提取关键信息', icon: Brain, description: '识别个人信息、教育背景、工作经历' },
  { id: 'capability', name: '构建能力图谱', icon: Network, description: '分析技能树和能力关系' },
  { id: 'evaluate', name: '评估能力边界', icon: Target, description: '判断擅长领域和待发展领域' },
  { id: 'match', name: '生成匹配建议', icon: Sparkles, description: '分析项目匹配度和合作建议' },
  { id: 'complete', name: '解析完成', icon: CheckCircle2, description: '人才图谱构建成功' },
]

const STEP_MAP: Record<string, number> = {
  '正在连接 AI 服务...': 0,
  '正在理解简历结构...': 0,
  '提取个人信息...': 1,
  '识别工作经历...': 1,
  '分析技术能力...': 2,
  '整理项目经验...': 2,
  '计算能力强度...': 3,
  '生成人才图谱...': 4,
  '正在解析 AI 返回...': 4,
  '正在保存数据...': 4,
  '解析完成！': 5,
  '处理完成！': 5,
}

const getStepIndex = (stepText: string): number => {
  for (const [key, index] of Object.entries(STEP_MAP)) {
    if (stepText.includes(key.replace('...', ''))) {
      return index
    }
  }
  return 0
}

export default function ConverterPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [resumeText, setResumeText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [talentData, setTalentData] = useState<TalentGraphData | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  
  const isOverLimit = resumeText.length > MAX_RESUME_LENGTH

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let fullText = ''
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        fullText += content.items.map((item: any) => item.str).join(' ') + '\n'
      }
      setResumeText(fullText.slice(0, MAX_RESUME_LENGTH))
    } else {
      const text = await file.text()
      setResumeText(text.slice(0, MAX_RESUME_LENGTH))
    }
  }

  useEffect(() => {
    if (!isProcessing) {
      setCurrentStep(0)
    }
  }, [isProcessing])

  const handleProcess = async () => {
    if (!session) {
      router.push('/login')
      return
    }

    setIsProcessing(true)
    setError('')
    setCurrentStep(0)

    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      const response = await fetch('/api/process-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      if (!reader) {
        throw new Error('无法读取响应流')
      }

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) {
          break
        }

        buffer += decoder.decode(value, { stream: true })
        
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            
            if (data === '[DONE]') {
              continue
            }

            try {
              const parsed = JSON.parse(data)
              
              if (parsed.error) {
                setError(parsed.error)
                setIsProcessing(false)
                return
              }

              if (parsed.step !== undefined) {
                setCurrentStep(getStepIndex(parsed.step))
              }

              if (parsed.type === 'success' && parsed.data) {
                setTalentData(parsed.data)
                setCurrentStep(5)
                setTimeout(() => {
                  setIsProcessing(false)
                }, 800)
              }
            } catch (e) {
              console.error('解析 SSE 数据失败:', e)
            }
          }
        }
      }

      if (buffer.startsWith('data: ')) {
        const data = buffer.slice(6)
        try {
          const parsed = JSON.parse(data)
          if (parsed.data) {
            setTalentData(parsed.data)
            setCurrentStep(5)
            setTimeout(() => {
              setIsProcessing(false)
            }, 800)
          }
        } catch (e) {
          console.error('解析最终数据失败:', e)
        }
      }
    } catch (err) {
      setError('处理失败，请重试')
      setIsProcessing(false)
    }
  }

  const handleViewGraph = () => {
    if (talentData) {
      router.push(`/graph/${talentData.id}`)
    }
  }

  if (!session) {
    return (
      <div className="py-16 text-center">
        <div className="max-w-md mx-auto">
          <FileText className="w-16 h-16 mx-auto mb-4 text-slate-500" />
          <h2 className="text-xl font-bold mb-4">请先登录</h2>
          <p className="text-slate-400 mb-6">登录后才能使用简历转换功能</p>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-primary-500 rounded-lg text-white hover:bg-primary-600 transition-colors"
          >
            立即登录
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">简历转换器</h1>
        <p className="text-slate-400">把传统简历转化为 AI 可读的人才能力图谱</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-slate-300 font-medium">
              <FileText className="w-4 h-4" />
              原始简历
            </label>
            <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-500/10 text-primary-400 text-sm cursor-pointer hover:bg-primary-500/20 transition-colors">
              <Upload className="w-4 h-4" />
              上传 PDF/Word
              <input
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value.slice(0, MAX_RESUME_LENGTH))}
            placeholder="在这里粘贴你的简历内容，或者上传 PDF 文件..."
            className={`w-full h-96 px-4 py-4 rounded-xl bg-slate-800/50 border-2 focus:border-primary-500 focus:outline-none resize-none font-mono text-sm leading-relaxed transition-colors ${
              isOverLimit ? 'border-red-500 bg-red-500/5' : resumeText.length > MAX_RESUME_LENGTH * 0.8 ? 'border-yellow-500/50' : 'border-slate-700'
            }`}
          />
          {isOverLimit && (
            <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2 animate-pulse">
              <span className="text-lg">⚠️</span>
              <span><strong>内容超出限制！</strong> 请精简简历内容后再提交，当前超出 <strong>{resumeText.length - MAX_RESUME_LENGTH}</strong> 字</span>
            </div>
          )}
          <div className={`mt-2 text-sm flex items-center justify-between ${
            isOverLimit ? 'text-red-400' : resumeText.length > MAX_RESUME_LENGTH * 0.8 ? 'text-yellow-400' : 'text-slate-500'
          }`}>
            <span>
              {isOverLimit ? (
                <span className="flex items-center gap-1">
                  <span className="text-red-400">⚠️</span>
                  内容超出限制，请精简简历内容
                </span>
              ) : resumeText.length > MAX_RESUME_LENGTH * 0.8 ? (
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">⚡</span>
                  即将达到字数上限
                </span>
              ) : (
                '建议简历内容控制在 2000-3000 字以内'
              )}
            </span>
            <span>
              {resumeText.length} / {MAX_RESUME_LENGTH} 字
            </span>
          </div>

          <button
            onClick={handleProcess}
            disabled={!resumeText.trim() || isProcessing || resumeText.length > MAX_RESUME_LENGTH}
            className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                AI 正在解析简历并构建能力图谱...
              </>
            ) : (
              <>✨ 开始 AI 解析并生成人才图谱</>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              ❌ {error}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-3 text-slate-300 font-medium">
            🧠 AI 结构化结果
          </label>

          {isProcessing && (
            <div className="h-96 rounded-xl bg-slate-800/50 border border-slate-700 p-6 overflow-hidden">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">AI 解析进度</span>
                  <span className="text-sm text-primary-400">
                    {Math.round(((currentStep + 1) / PROCESS_STEPS.length) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep + 1) / PROCESS_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                {PROCESS_STEPS.map((step, index) => {
                  const Icon = step.icon
                  const isActive = index === currentStep
                  const isCompleted = index < currentStep
                  const isPending = index > currentStep

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary-500/10 border border-primary-500/30 scale-[1.02]' 
                          : isCompleted 
                          ? 'bg-green-500/5 border border-green-500/20' 
                          : 'bg-slate-800/30 border border-slate-700/50'
                      }`}
                    >
                      <div className={`relative ${
                        isActive 
                          ? 'text-primary-400' 
                          : isCompleted 
                          ? 'text-green-400' 
                          : 'text-slate-500'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : isActive ? (
                          <div className="relative">
                            <Icon className="w-6 h-6 animate-pulse" />
                            <div className="absolute inset-0 animate-ping opacity-30">
                              <Icon className="w-6 h-6" />
                            </div>
                          </div>
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          isActive 
                            ? 'text-primary-400' 
                            : isCompleted 
                            ? 'text-green-400' 
                            : 'text-slate-500'
                        }`}>
                          {step.name}
                        </div>
                        <div className={`text-sm ${
                          isActive ? 'text-slate-300 animate-pulse' : 'text-slate-500'
                        }`}>
                          {isActive ? step.description : isCompleted ? '已完成 ✓' : '等待中...'}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Brain className="w-4 h-4 animate-pulse text-primary-400" />
                  <span>AI 正在深度理解你的简历内容，构建个性化能力图谱...</span>
                </div>
              </div>
            </div>
          )}

          {talentData && !isProcessing ? (
            <div className="h-96 overflow-auto rounded-xl bg-slate-800/50 border border-slate-700 p-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-600">
                  <h3 className="text-primary-400 font-semibold mb-2">👤 身份核心</h3>
                  <p className="text-xl font-bold">{talentData.identity.name}</p>
                  <p className="text-slate-400">{talentData.identity.role}</p>
                  <p className="text-slate-500 text-sm">{talentData.identity.location}</p>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-600">
                  <h3 className="text-accent-400 font-semibold mb-2">⚡ 核心能力 ({talentData.capabilities.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {talentData.capabilities.slice(0, 8).map((cap) => (
                      <span
                        key={cap.id}
                        className={`px-2 py-1 rounded text-xs ${
                          cap.level === 'expert'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : cap.level === 'strong'
                            ? 'bg-green-500/20 text-green-400'
                            : cap.level === 'moderate'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-slate-500/20 text-slate-400'
                        }`}
                      >
                        {cap.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-600">
                  <h3 className="text-green-400 font-semibold mb-2">📊 能力边界评估</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-green-400">✓ 擅长：</span>{talentData.boundaries.strong.slice(0, 2).join('、')}</p>
                    <p><span className="text-yellow-400">◐ 一般：</span>{talentData.boundaries.moderate.slice(0, 2).join('、')}</p>
                    <p><span className="text-red-400">✗ 不适合：</span>{talentData.boundaries.weak.slice(0, 2).join('、')}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {!talentData && !isProcessing && (
            <div className="h-96 rounded-xl bg-slate-800/50 border border-slate-700 border-dashed flex items-center justify-center">
              <div className="text-center text-slate-500">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>解析结果将在这里显示</p>
                <p className="text-sm mt-1">左侧粘贴简历后点击「开始解析」</p>
              </div>
            </div>
          )}

          {talentData && (
            <button
              onClick={handleViewGraph}
              className="w-full mt-4 py-3 rounded-xl border border-primary-500/50 text-primary-400 font-semibold hover:bg-primary-500/10 transition-all flex items-center justify-center gap-2"
            >
              🕸️ 查看人才图谱可视化 <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 p-6 rounded-xl bg-slate-800/30 border border-slate-700">
        <h3 className="font-semibold mb-3 text-lg">💡 解析示例（无需登录也可以看效果）</h3>
        <p className="text-slate-400 text-sm mb-4">
          你可以直接查看预置的人才图谱示例，了解最终效果。
        </p>
        <button
          onClick={() => router.push('/graph/demo')}
          className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
        >
          查看 Demo 图谱
        </button>
      </div>
    </div>
  )
}
