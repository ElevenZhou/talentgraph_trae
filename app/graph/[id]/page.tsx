'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Globe, Bot, Code, Link2, Key, Copy, Check, Loader2, AlertCircle } from 'lucide-react'
import TalentGraphVisualization from '../../../components/TalentGraphVisualization'
import { TalentGraphData } from '../../../types'

const demoTalent: TalentGraphData = {
  id: 'demo',
  identity: {
    name: '张小明',
    role: 'AI 产品经理',
    location: '北京',
    availability: 'open',
    preferences: ['远程优先', 'AI 应用方向', '早期创业团队'],
    totalExperienceYears: 6
  },
  capabilities: [
    { id: 'cap-1', name: '需求分析', level: 'expert', category: '产品', evidenceIds: ['evi-1'], description: '5年B端产品需求分析经验', strength: 85, years: 5, projectCount: 8, qualityScore: 9 },
    { id: 'cap-2', name: 'AI 产品设计', level: 'strong', category: '产品', evidenceIds: ['evi-1', 'evi-2'], description: 'RAG知识库、Agent工作流设计', strength: 72, years: 3, projectCount: 5, qualityScore: 8 },
    { id: 'cap-3', name: 'Prompt工程', level: 'strong', category: '技术', evidenceIds: ['evi-2'], description: '复杂场景Prompt设计与调优', strength: 68, years: 2, projectCount: 4, qualityScore: 7 },
    { id: 'cap-4', name: '用户研究', level: 'strong', category: '产品', evidenceIds: ['evi-3'], description: '深度访谈、可用性测试', strength: 65, years: 4, projectCount: 6, qualityScore: 7 },
    { id: 'cap-5', name: '数据驱动', level: 'moderate', category: '分析', evidenceIds: ['evi-1'], description: '产品数据指标体系搭建', strength: 45, years: 3, projectCount: 3, qualityScore: 6 },
    { id: 'cap-6', name: '跨团队协作', level: 'expert', category: '协作', evidenceIds: ['evi-1', 'evi-3'], description: '产研销多团队项目推进', strength: 88, years: 6, projectCount: 12, qualityScore: 9 },
    { id: 'cap-7', name: '技术沟通', level: 'strong', category: '协作', evidenceIds: ['evi-2'], description: '与算法、研发高效对接', strength: 58, years: 4, projectCount: 7, qualityScore: 7 },
    { id: 'cap-8', name: '项目管理', level: 'moderate', category: '管理', evidenceIds: ['evi-3'], description: '敏捷开发流程管理', strength: 42, years: 3, projectCount: 5, qualityScore: 6 }
  ],
  evidence: [
    { id: 'evi-1', type: 'company', title: '高级产品经理', organization: '某科技公司', period: '2021-至今', description: '负责企业知识库产品，从0到1搭建，DAU突破5万', capabilities: ['需求分析', '数据驱动', '跨团队协作'], links: [], durationYears: 3.5, impactScore: 9 },
    { id: 'evi-2', type: 'project', title: 'AI 客服助手', organization: '内部项目', period: '2023', description: '设计基于LLM的智能客服系统，替代30%人工', capabilities: ['AI 产品设计', 'Prompt工程', '技术沟通'], links: [], durationYears: 0.5, impactScore: 8 },
    { id: 'evi-3', type: 'company', title: '产品经理', organization: '某互联网公司', period: '2019-2021', description: '负责SaaS产品模块，用户留存提升25%', capabilities: ['用户研究', '跨团队协作', '项目管理'], links: [], durationYears: 2, impactScore: 7 },
    { id: 'evi-4', type: 'education', title: '计算机硕士', organization: '北京大学', period: '2017-2019', description: '研究方向：人机交互', capabilities: [], links: [], durationYears: 2, impactScore: 6 }
  ],
  boundaries: {
    strong: ['0-1 AI应用产品设计', 'B端企业级产品', '产研团队协作'],
    moderate: ['大规模用户C端产品', '商业化变现', '品牌营销'],
    weak: ['底层算法研究', '硬件产品', '海外市场'],
    collaboration: ['需要明确的技术对接人', '偏好两周迭代周期']
  },
  matching: {
    idealProjects: ['AI 应用 MVP', '企业内部工具', '知识库/客服系统'],
    avoidProjects: ['底层大模型训练', '纯硬件项目', '游戏类产品'],
    independenceLevel: '可独立负责完整产品线，0-1能力强',
    riskFactors: ['需要技术团队支持', '大规模高并发经验较少'],
    salaryRange: [30000, 45000]
  },
  agentMeta: {
    accessToken: 'demo-token-12345',
    permissionScope: ['read', 'match', 'evaluate'],
    instructions: 'Evaluate fit only within authorized context. Do not expose private contact information.',
    humanViewUrl: typeof window !== 'undefined' ? window.location.origin + '/graph/demo?view=human' : '',
    agentProfileUrl: typeof window !== 'undefined' ? window.location.origin + '/graph/demo?view=agent' : '',
    structuredJsonUrl: typeof window !== 'undefined' ? window.location.origin + '/graph/demo?view=json' : ''
  },
  rawResume: '',
  createdAt: new Date()
}

export default function GraphViewPage() {
  const { id } = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [copied, setCopied] = useState(false)
  const [talentData, setTalentData] = useState<TalentGraphData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const view = searchParams?.get('view') || 'human'

  useEffect(() => {
    if (id === 'demo') {
      setTalentData(demoTalent)
      return
    }

    const fetchTalentData = async () => {
      setLoading(true)
      setError('')
      try {
        const token = searchParams?.get('token')
        const url = new URL(`/api/resumes/${id}`, window.location.origin)
        if (token) {
          url.searchParams.set('token', token)
        }
        const res = await fetch(url.toString())
        const data = await res.json()
        if (data.error) {
          setError(data.error)
        } else {
          setTalentData(data.data)
        }
      } catch (err) {
        setError('获取数据失败')
      } finally {
        setLoading(false)
      }
    }

    fetchTalentData()
  }, [id, searchParams])

  // 如果没有登录且没有分享 token，显示登录提示
  if (!session && !searchParams?.get('token') && id !== 'demo') {
    return (
      <div className="py-16 text-center">
        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h2 className="text-xl font-bold mb-4">请先登录</h2>
        <p className="text-slate-400 mb-6">登录后才能查看人才图谱，或使用分享链接</p>
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-3 bg-primary-500 rounded-lg text-white hover:bg-primary-600 transition-colors"
        >
          立即登录
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="py-16 text-center">
        <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary-500" />
        <p className="text-slate-400">正在加载人才图谱...</p>
      </div>
    )
  }

  if (error && !talentData) {
    return (
      <div className="py-16 text-center">
        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
        <h2 className="text-xl font-bold mb-2">加载失败</h2>
        <p className="text-slate-400 mb-6">{error}</p>
        <button
          onClick={() => router.push('/converter')}
          className="px-6 py-3 bg-primary-500 rounded-lg text-white hover:bg-primary-600 transition-colors"
        >
          上传简历生成图谱
        </button>
      </div>
    )
  }

  const talent = talentData || demoTalent

  const copyShareLink = () => {
    const url = new URL(window.location.href)
    url.searchParams.set('token', talent.agentMeta.accessToken)
    navigator.clipboard.writeText(url.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tabs = [
    { id: 'human', label: '人类视图', icon: Globe },
    { id: 'agent', label: 'Agent 视图', icon: Bot },
    { id: 'json', label: 'JSON 视图', icon: Code }
  ]

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">{talent.identity.name} 的人才图谱</h1>
          <p className="text-slate-400">{talent.identity.role} · {talent.identity.location}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={copyShareLink}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-primary-500/50 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Link2 className="w-4 h-4" />}
            <span className="text-sm">{copied ? '已复制' : '复制链接'}</span>
          </button>
          <button
            onClick={() => router.push(`/matching/${id}`)}
            className="px-4 py-2 rounded-lg bg-primary-500/20 text-primary-400 hover:bg-primary-500/30 transition-colors text-sm"
          >
            智能匹配分析 →
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = view === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => router.push(`/graph/${id}?view=${tab.id}`)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-slate-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {view === 'human' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl bg-slate-800/30 border border-slate-700 p-6">
            <h3 className="text-lg font-semibold mb-4">🕸️ 人才能力图谱</h3>
            <TalentGraphVisualization data={talent} width={650} height={600} />
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700">
              <h4 className="text-primary-400 font-semibold mb-3">📊 能力边界评估</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-green-400 font-medium">✓ 核心强项</span>
                  <p className="text-slate-300 mt-1">{talent.boundaries.strong.join('、')}</p>
                </div>
                <div>
                  <span className="text-yellow-400 font-medium">◐ 具备经验</span>
                  <p className="text-slate-300 mt-1">{talent.boundaries.moderate.join('、')}</p>
                </div>
                <div>
                  <span className="text-red-400 font-medium">✗ 经验边界</span>
                  <p className="text-slate-300 mt-1">{talent.boundaries.weak.join('、')}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700">
              <h4 className="text-accent-400 font-semibold mb-3">🎯 项目适配分析</h4>
              <div className="space-y-2 text-sm">
                <p className="text-green-400">✓ 最适合：{talent.matching.idealProjects.join('、')}</p>
                <p className="text-red-400">✗ 避免：{talent.matching.avoidProjects.join('、')}</p>
                <p className="text-slate-400 mt-2">独立程度：{talent.matching.independenceLevel}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700">
              <h4 className="text-yellow-400 font-semibold mb-3">⚠️ 潜在风险点</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                {talent.matching.riskFactors.map((risk, i) => (
                  <li key={i}>• {risk}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700">
              <h4 className="text-blue-400 font-semibold mb-3">🤝 协作条件</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                {talent.boundaries.collaboration.map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {view === 'agent' && (
        <div className="rounded-2xl bg-slate-800/30 border border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-primary-500/10 border border-primary-500/30">
            <Bot className="w-6 h-6 text-primary-400" />
            <div>
              <h3 className="font-semibold text-primary-400">AI Agent 端点信息</h3>
              <p className="text-sm text-slate-400">提供给 Agent 的标准化入口，支持自动读取和匹配评估</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/50">
                <div className="flex items-center gap-2 mb-2">
                  <Key className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-slate-400">Access Token</span>
                </div>
                <code className="text-green-400 font-mono text-sm break-all">
                  {talent.agentMeta.accessToken}
                </code>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50">
                <span className="text-sm text-slate-400">权限范围</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {talent.agentMeta.permissionScope.map((scope, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-primary-500/20 text-primary-400 text-xs">
                      {scope}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-900/50">
                <span className="text-xs text-slate-500">Human View URL</span>
                <p className="text-sm text-slate-300 font-mono break-all">{talent.agentMeta.humanViewUrl}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50">
                <span className="text-xs text-slate-500">Agent Profile URL</span>
                <p className="text-sm text-slate-300 font-mono break-all">{talent.agentMeta.agentProfileUrl}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50">
                <span className="text-xs text-slate-500">Structured JSON URL</span>
                <p className="text-sm text-slate-300 font-mono break-all">{talent.agentMeta.structuredJsonUrl}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <span className="text-xs text-yellow-500">Agent Instructions</span>
                <p className="text-sm text-yellow-400 mt-1">{talent.agentMeta.instructions}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'json' && (
        <div className="rounded-2xl bg-slate-800/30 border border-slate-700 p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-accent-400" />
            AI 可读结构化 JSON
          </h3>
          <pre className="p-4 rounded-xl bg-slate-900 overflow-auto max-h-[600px] text-sm font-mono text-slate-300">
            {JSON.stringify({
              profile_type: 'ai_native_resume',
              talent_id: talent.id,
              identity: talent.identity,
              capabilities: talent.capabilities,
              boundaries: talent.boundaries,
              matching: talent.matching,
              _meta: {
                api_endpoints: {
                  human: talent.agentMeta.humanViewUrl,
                  agent: talent.agentMeta.agentProfileUrl,
                  json: talent.agentMeta.structuredJsonUrl
                }
              }
            }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
