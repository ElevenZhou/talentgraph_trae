'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Loader2, GitCompare, ThumbsUp, AlertTriangle, ThumbsDown, Target, CheckCircle, Sparkles, BookOpen, RefreshCw, Search, Building2, Briefcase, MapPin, DollarSign } from 'lucide-react'
import { TalentGraphData } from '../../../types'
import { mockProjects, Project } from '../../../data/mockProjects'

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

interface MatchingResult {
  projectId: string
  overallScore: number
  strengths: { capability: string; evidence: string; matchLevel: string }[]
  gaps: { skill: string; requiredLevel: string; currentLevel: string }[]
  risks: string[]
  recommendation: 'highly-recommended' | 'recommended' | 'consider' | 'not-recommended'
  collaborationSuggestion: string
  detailedAnalysis: string
  salaryMatch: { match: boolean; suggestion: string }
  experienceMatch: { match: boolean; suggestion: string }
}

export default function MatchingPage() {
  const { id } = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [isProcessing, setIsProcessing] = useState(false)
  const [matchingResult, setMatchingResult] = useState<MatchingResult | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('')
  const [filterJobType, setFilterJobType] = useState('')
  const [talentData, setTalentData] = useState<TalentGraphData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id === 'demo') {
      setTalentData(demoTalent)
      setLoading(false)
      return
    }

    const fetchTalentData = async () => {
      try {
        const token = searchParams?.get('token')
        const url = new URL(`/api/resumes/${id}`, window.location.origin)
        if (token) {
          url.searchParams.set('token', token)
        }
        const res = await fetch(url.toString())
        const data = await res.json()
        if (data.error) {
          console.error('获取人才数据失败:', data.error)
          setTalentData(demoTalent)
        } else {
          setTalentData(data.data)
        }
      } catch (err) {
        console.error('获取人才数据失败:', err)
        setTalentData(demoTalent)
      } finally {
        setLoading(false)
      }
    }

    fetchTalentData()
  }, [id, searchParams])

  useEffect(() => {
    let filtered = mockProjects
    
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(p => 
        p.jobTitle.toLowerCase().includes(lowerTerm) ||
        p.companyName.toLowerCase().includes(lowerTerm) ||
        p.industry.toLowerCase().includes(lowerTerm)
      )
    }
    
    if (filterIndustry) {
      filtered = filtered.filter(p => p.industry === filterIndustry)
    }
    
    if (filterJobType) {
      filtered = filtered.filter(p => p.jobType === filterJobType)
    }
    
    setProjects(filtered)
  }, [searchTerm, filterIndustry, filterJobType])

  const talent = talentData || demoTalent

  const calculateMatching = (project: Project): MatchingResult => {
    let totalScore = 0
    const strengths: MatchingResult['strengths'] = []
    const gaps: MatchingResult['gaps'] = []
    const risks: string[] = []
    
    const levelStrength: Record<string, number> = {
      expert: 4,
      strong: 3,
      moderate: 2,
      basic: 1
    }

    const levelLabels: Record<string, string> = {
      expert: '精通',
      strong: '熟练',
      moderate: '了解',
      basic: '基础'
    }

    project.requirements.forEach(req => {
      const talentCap = talent.capabilities.find(c => c.name === req.skill)
      
      if (talentCap) {
        const talentLevel = levelStrength[talentCap.level] || 0
        const reqLevel = levelStrength[req.level] || 0
        
        const skillScore = Math.min(talentLevel / reqLevel, 1) * req.weight
        totalScore += skillScore
        
        if (talentLevel >= reqLevel) {
          strengths.push({
            capability: req.skill,
            evidence: `${levelLabels[talentCap.level]} - ${talentCap.description}`,
            matchLevel: '超出要求'
          })
        } else {
          gaps.push({
            skill: req.skill,
            requiredLevel: levelLabels[req.level],
            currentLevel: levelLabels[talentCap.level]
          })
        }
      } else {
        gaps.push({
          skill: req.skill,
          requiredLevel: levelLabels[req.level],
          currentLevel: '无'
        })
      }
    })

    const experienceMatch = talent.identity.totalExperienceYears && 
      talent.identity.totalExperienceYears >= project.experienceMin && 
      talent.identity.totalExperienceYears <= project.experienceMax
    
    if (!experienceMatch && talent.identity.totalExperienceYears) {
      if (talent.identity.totalExperienceYears < project.experienceMin) {
        risks.push(`经验年限不足：要求${project.experienceMin}-${project.experienceMax}年，当前${talent.identity.totalExperienceYears}年`)
      } else {
        risks.push(`经验年限超出：要求${project.experienceMin}-${project.experienceMax}年，当前${talent.identity.totalExperienceYears}年`)
      }
    }

    const salaryMatch = talent.matching.salaryRange &&
      talent.matching.salaryRange[1] >= project.salaryMin &&
      talent.matching.salaryRange[0] <= project.salaryMax

    let recommendation: MatchingResult['recommendation'] = 'consider'
    if (totalScore >= 80) recommendation = 'highly-recommended'
    else if (totalScore >= 60) recommendation = 'recommended'
    else if (totalScore >= 40) recommendation = 'consider'
    else recommendation = 'not-recommended'

    return {
      projectId: project.id,
      overallScore: Math.round(totalScore),
      strengths: strengths.slice(0, 5),
      gaps: gaps.slice(0, 5),
      risks,
      recommendation,
      collaborationSuggestion: generateSuggestion(totalScore, gaps, risks, project),
      detailedAnalysis: generateAnalysis(totalScore, strengths, gaps, project),
      salaryMatch: {
        match: salaryMatch,
        suggestion: salaryMatch ? '薪资期望匹配' : '可能存在薪资期望差异'
      },
      experienceMatch: {
        match: experienceMatch,
        suggestion: experienceMatch ? '经验年限匹配' : '经验年限不完全匹配'
      }
    }
  }

  const generateSuggestion = (score: number, gaps: MatchingResult['gaps'], risks: string[], project: Project) => {
    const parts = []
    
    if (score >= 80) {
      parts.push(`候选人与「${project.jobTitle}」岗位高度匹配，建议优先考虑。`)
    } else if (score >= 60) {
      parts.push(`候选人与「${project.jobTitle}」岗位匹配度良好，但存在一些能力差距。`)
    } else {
      parts.push(`候选人与「${project.jobTitle}」岗位匹配度一般，建议谨慎考虑。`)
    }
    
    if (gaps.length > 0) {
      parts.push(`主要差距：${gaps.map(g => g.skill).join('、')}。建议通过培训或团队配置弥补。`)
    }
    
    if (risks.length > 0) {
      parts.push(`风险提示：${risks.join('；')}。`)
    }
    
    return parts.join(' ')
  }

  const generateAnalysis = (score: number, strengths: MatchingResult['strengths'], gaps: MatchingResult['gaps'], project: Project) => {
    const parts = []
    
    parts.push(`综合匹配度：${score}分。`)
    
    if (strengths.length > 0) {
      parts.push(`核心优势：${strengths.map(s => s.capability).join('、')}。`)
    }
    
    if (gaps.length > 0) {
      parts.push(`待提升领域：${gaps.map(g => `${g.skill}（当前${g.currentLevel}，需要${g.requiredLevel}）`).join('；')}。`)
    }
    
    parts.push(`整体来看，${score >= 70 ? '候选人非常适合该岗位要求' : '候选人需要在某些方面进行提升'}。`)
    
    return parts.join('')
  }

  const handleAnalyze = (project: Project) => {
    setSelectedProject(project)
    setIsProcessing(true)
    
    setTimeout(() => {
      const result = calculateMatching(project)
      setMatchingResult(result)
      setIsProcessing(false)
    }, 800)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 border-green-500/50'
    if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/50'
    return 'bg-red-500/20 border-red-500/50'
  }

  const getRecLabel = (rec: string) => {
    const labels: Record<string, string> = {
      'highly-recommended': '强烈推荐',
      'recommended': '推荐',
      'consider': '考虑',
      'not-recommended': '不推荐'
    }
    return labels[rec] || rec
  }

  const getRecColor = (rec: string) => {
    const colors: Record<string, string> = {
      'highly-recommended': 'bg-green-500/20 text-green-400',
      'recommended': 'bg-blue-500/20 text-blue-400',
      'consider': 'bg-yellow-500/20 text-yellow-400',
      'not-recommended': 'bg-red-500/20 text-red-400'
    }
    return colors[rec] || 'bg-slate-500/20 text-slate-400'
  }

  const industries = [...new Set(mockProjects.map(p => p.industry))]
  const jobTypes = [...new Set(mockProjects.map(p => p.jobType))]

  const jobTypeLabels: Record<string, string> = {
    'full-time': '全职',
    'part-time': '兼职',
    'contract': '合同',
    'internship': '实习'
  }

  if (loading) {
    return (
      <div className="py-16 text-center">
        <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary-500" />
        <p className="text-slate-400">正在加载...</p>
      </div>
    )
  }

  if (!session && !searchParams?.get('token') && id !== 'demo') {
    return (
      <div className="py-16 text-center">
        <div className="max-w-md mx-auto">
          <GitCompare className="w-16 h-16 mx-auto mb-4 text-slate-500" />
          <h2 className="text-xl font-bold mb-4">请先登录</h2>
          <p className="text-slate-400 mb-6">登录后才能使用智能匹配功能</p>
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">智能匹配分析</h1>
          <p className="text-slate-400">分析 {talent.identity.name} 与岗位的匹配度</p>
        </div>
        <button
          onClick={() => router.push(`/graph/${id}`)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-primary-500/50 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          查看人才图谱
        </button>
      </div>

      {/* 人才信息卡片 */}
      <div className="rounded-2xl bg-slate-800/30 border border-slate-700 p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{talent.identity.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{talent.identity.name}</h3>
            <p className="text-slate-400">{talent.identity.role} · {talent.identity.location}</p>
            {talent.identity.totalExperienceYears && (
              <p className="text-slate-500 text-sm mt-1">从业 {talent.identity.totalExperienceYears} 年</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">期望薪资</p>
            <p className="text-lg font-semibold text-primary-400">
              {talent.matching.salaryRange ? `${talent.matching.salaryRange[0].toLocaleString()}-${talent.matching.salaryRange[1].toLocaleString()}` : '面议'}
            </p>
          </div>
        </div>
      </div>

      {/* 匹配结果展示 */}
      {matchingResult && selectedProject && (
        <div className="mb-8">
          <button
            onClick={() => { setMatchingResult(null); setSelectedProject(null) }}
            className="flex items-center gap-2 mb-4 text-slate-400 hover:text-slate-200 transition-colors"
          >
            ← 返回岗位列表
          </button>
          
          <div className="rounded-2xl bg-slate-800/30 border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">{selectedProject.companyName}</h3>
                <p className="text-slate-400">{selectedProject.jobTitle}</p>
              </div>
              <div className={`px-4 py-2 rounded-xl ${getScoreBgColor(matchingResult.overallScore)}`}>
                <div className={`text-3xl font-bold ${getScoreColor(matchingResult.overallScore)}`}>
                  {matchingResult.overallScore}
                </div>
                <div className={`text-sm ${getScoreColor(matchingResult.overallScore)}`}>匹配度</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50">
                <Building2 className="w-5 h-5 text-primary-400" />
                <div>
                  <p className="text-xs text-slate-500">公司</p>
                  <p className="text-sm">{selectedProject.companyName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50">
                <MapPin className="w-5 h-5 text-accent-400" />
                <div>
                  <p className="text-xs text-slate-500">地点</p>
                  <p className="text-sm">{selectedProject.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50">
                <DollarSign className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-xs text-slate-500">薪资范围</p>
                  <p className="text-sm">{selectedProject.salaryMin.toLocaleString()}-{selectedProject.salaryMax.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm ${getRecColor(matchingResult.recommendation)}`}>
                {getRecLabel(matchingResult.recommendation)}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${matchingResult.experienceMatch.match ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {matchingResult.experienceMatch.suggestion}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${matchingResult.salaryMatch.match ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {matchingResult.salaryMatch.suggestion}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <ThumbsUp className="w-5 h-5 text-green-400" />
                  <h4 className="font-semibold text-green-400">核心优势</h4>
                </div>
                <ul className="space-y-2">
                  {matchingResult.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>{s.capability}</strong> - {s.evidence}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-yellow-400" />
                  <h4 className="font-semibold text-yellow-400">能力差距</h4>
                </div>
                <ul className="space-y-2">
                  {matchingResult.gaps.map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>{g.skill}</strong> - 当前：{g.currentLevel}，需要：{g.requiredLevel}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {matchingResult.risks.length > 0 && (
              <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <ThumbsDown className="w-5 h-5 text-red-400" />
                  <h4 className="font-semibold text-red-400">风险提示</h4>
                </div>
                <ul className="space-y-1">
                  {matchingResult.risks.map((r, i) => (
                    <li key={i} className="text-sm text-red-300">• {r}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6">
              <h4 className="font-semibold mb-2">📝 详细分析</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{matchingResult.detailedAnalysis}</p>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">🤝 协作建议</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{matchingResult.collaborationSuggestion}</p>
            </div>
          </div>
        </div>
      )}

      {/* 岗位列表 */}
      {!matchingResult && (
        <>
          {/* 搜索和筛选 */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="搜索岗位名称、公司..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none"
              />
            </div>
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-primary-500 focus:outline-none"
            >
              <option value="">全行业</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
            <select
              value={filterJobType}
              onChange={(e) => setFilterJobType(e.target.value)}
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-primary-500 focus:outline-none"
            >
              <option value="">全部类型</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>{jobTypeLabels[type]}</option>
              ))}
            </select>
          </div>

          {/* 岗位卡片列表 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => {
              const quickScore = Math.round(calculateMatching(project).overallScore)
              return (
                <button
                  key={project.id}
                  onClick={() => handleAnalyze(project)}
                  className="p-5 rounded-2xl bg-slate-800/30 border border-slate-700 hover:border-primary-500/50 hover:bg-slate-800/50 transition-all text-left group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary-400 transition-colors">{project.jobTitle}</h3>
                      <p className="text-slate-400 text-sm">{project.companyName}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-sm font-medium ${getScoreBgColor(quickScore)} ${getScoreColor(quickScore)}`}>
                      {quickScore}%
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 rounded bg-slate-700/50 text-slate-400 text-xs">{project.industry}</span>
                    <span className="px-2 py-1 rounded bg-slate-700/50 text-slate-400 text-xs">{project.location}</span>
                    <span className="px-2 py-1 rounded bg-slate-700/50 text-slate-400 text-xs">{jobTypeLabels[project.jobType]}</span>
                  </div>
                  <p className="text-slate-500 text-xs line-clamp-2 mb-3">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 text-sm font-medium">
                      {project.salaryMin.toLocaleString()}-{project.salaryMax.toLocaleString()}
                    </span>
                    <span className="text-slate-500 text-xs">{project.experienceMin}-{project.experienceMax}年经验</span>
                  </div>
                </button>
              )
            })}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-600" />
              <p className="text-slate-400">没有找到匹配的岗位</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
