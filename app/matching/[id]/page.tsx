'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Loader2, GitCompare, ThumbsUp, AlertTriangle, ThumbsDown, Target, CheckCircle, Sparkles, BookOpen, RefreshCw, Search, Building2, Briefcase, MapPin, DollarSign } from 'lucide-react'
import { TalentGraphData } from '../../../types'
import { mockProjects, Project } from '../../../data/mockProjects'
import { findDemoTalent } from '../../../data/demoTalents'

const demoTalent: TalentGraphData = {
  id: 'demo',
  identity: {
    name: '张小明',
    role: '全栈开发工程师',
    location: '北京',
    availability: 'open',
    preferences: ['远程优先', 'AI 应用方向', '早期创业团队'],
    totalExperienceYears: 4
  },
  capabilities: [
    { id: 'cap-1', name: 'React', level: 'expert', category: '技术', evidenceIds: ['evi-1'], description: '3年React开发经验，精通Hooks和性能优化', strength: 85, years: 3, projectCount: 8, qualityScore: 9 },
    { id: 'cap-2', name: 'Vue', level: 'strong', category: '技术', evidenceIds: ['evi-1'], description: '2年Vue开发经验，熟悉Vue3组合式API', strength: 72, years: 2, projectCount: 5, qualityScore: 8 },
    { id: 'cap-3', name: 'TypeScript', level: 'expert', category: '技术', evidenceIds: ['evi-1', 'evi-2'], description: '3年TypeScript开发经验，类型安全实践', strength: 82, years: 3, projectCount: 6, qualityScore: 9 },
    { id: 'cap-4', name: 'Node.js', level: 'strong', category: '技术', evidenceIds: ['evi-2'], description: '2年Node.js后端开发经验', strength: 68, years: 2, projectCount: 4, qualityScore: 7 },
    { id: 'cap-5', name: 'Python', level: 'moderate', category: '技术', evidenceIds: ['evi-3'], description: 'Python数据分析和脚本开发', strength: 45, years: 1, projectCount: 3, qualityScore: 6 },
    { id: 'cap-6', name: 'MySQL', level: 'strong', category: '技术', evidenceIds: ['evi-1', 'evi-2'], description: '关系型数据库设计和优化', strength: 65, years: 3, projectCount: 7, qualityScore: 7 },
    { id: 'cap-7', name: '性能优化', level: 'strong', category: '技术', evidenceIds: ['evi-1'], description: '前端性能优化经验，首屏加载优化', strength: 58, years: 2, projectCount: 4, qualityScore: 7 },
    { id: 'cap-8', name: 'Git', level: 'expert', category: '工具', evidenceIds: ['evi-1', 'evi-2', 'evi-3'], description: '熟练使用Git版本控制，代码审查经验', strength: 88, years: 4, projectCount: 12, qualityScore: 9 },
    { id: 'cap-9', name: 'Docker', level: 'moderate', category: '工具', evidenceIds: ['evi-2'], description: 'Docker容器化部署经验', strength: 42, years: 1, projectCount: 3, qualityScore: 6 },
    { id: 'cap-10', name: 'Java', level: 'basic', category: '技术', evidenceIds: [], description: '基础Java开发能力', strength: 25, years: 1, projectCount: 2, qualityScore: 5 }
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

const INITIAL_VISIBLE_PROJECTS = 6
const PROJECTS_PER_PAGE = 12

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
  const [isProcessing, setIsProcessing] = useState(false)
  const [matchingResult, setMatchingResult] = useState<MatchingResult | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('')
  const [filterJobType, setFilterJobType] = useState('')
  const [talentData, setTalentData] = useState<TalentGraphData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [visibleProjectCount, setVisibleProjectCount] = useState(INITIAL_VISIBLE_PROJECTS)
  const talentId = Array.isArray(id) ? id[0] : id

  useEffect(() => {
    const demo = findDemoTalent(String(talentId))
    if (id === 'demo' || demo) {
      setTalentData(demo || demoTalent)
      setLoading(false)
      return
    }

    const fetchTalentData = async () => {
      try {
        const token = searchParams?.get('token')
        const url = new URL(`/api/resumes/${talentId}`, window.location.origin)
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
  }, [id, talentId, searchParams])

  useEffect(() => {
    setCurrentPage(1)
    setVisibleProjectCount(INITIAL_VISIBLE_PROJECTS)
  }, [searchTerm, filterIndustry, filterJobType, talentData])

  const talent = talentData || demoTalent

  const skillSynonyms: Record<string, string[]> = {
    'React/Vue': ['React', 'Vue', 'React.js', 'Vue.js', '前端框架'],
    'TypeScript': ['TypeScript', 'TS', '类型安全', '类型系统'],
    'JavaScript': ['JavaScript', 'JS', 'ES6', 'ECMAScript'],
    'Node.js': ['Node.js', 'Node', '服务端', '后端'],
    'Java': ['Java', 'JVM', '后端开发', '企业级开发'],
    'Python': ['Python', '数据分析', '机器学习', 'AI开发'],
    'SQL': ['SQL', '数据库', 'MySQL', 'PostgreSQL', 'Oracle'],
    'MySQL': ['MySQL', '数据库', 'SQL', '关系型数据库'],
    '性能优化': ['性能优化', '性能调优', '前端性能', '后端性能'],
    'Git': ['Git', '版本控制', '代码管理'],
    'Docker': ['Docker', '容器', '容器化', 'K8s', 'Kubernetes'],
    'Linux': ['Linux', '服务器', '运维'],
    'Kubernetes': ['Kubernetes', 'K8s', '容器编排', '云原生'],
    'CI/CD': ['CI/CD', '持续集成', '持续部署', '自动化部署'],
    '风控': ['风控', '风险控制', '风险管理', '金融风控'],
    '合规': ['合规', '合规管理', '监管合规', '反洗钱'],
    '清结算': ['清结算', '清算', '结算', '支付'],
    '跨境支付': ['跨境支付', '国际支付', '外汇', '跨境'],
    '量化交易': ['量化交易', '量化策略', '算法交易', '程序化交易'],
    '交易系统': ['交易系统', '交易所', '撮合系统'],
    '保证金': ['保证金', '资金管理', '风控'],
    '数据可视化': ['数据可视化', '图表', 'BI', '数据分析'],
    'API设计': ['API设计', '接口设计', 'RESTful', '微服务'],
    '策略回测': ['策略回测', '回测', '量化回测'],
    '反洗钱': ['反洗钱', 'AML', '合规'],
    '金融知识': ['金融知识', '金融基础', '金融业务'],
    '金融工程': ['金融工程', '衍生品', '定价'],
    '数学建模': ['数学建模', '量化模型', '统计分析'],
    '数据分析': ['数据分析', '数据挖掘', 'BI'],
    '游戏引擎': ['游戏引擎', 'Unity', 'Unreal', '游戏开发'],
    'Unreal Engine': ['Unreal', 'Unreal Engine', '虚幻引擎'],
    'C++': ['C++', '游戏开发', '高性能'],
    'Lua': ['Lua', '脚本语言', '游戏脚本'],
    '内容运营': ['内容运营', '新媒体', '社交媒体'],
    '热点追踪': ['热点追踪', '热点运营', '舆情'],
    '文案写作': ['文案写作', '内容创作', '写作'],
    '行政管理': ['行政管理', '办公管理', '行政'],
    '办公管理': ['办公管理', '行政管理', '办公室'],
    '活动组织': ['活动组织', '活动策划', '团建'],
    '沟通协调': ['沟通协调', '协调', '跨部门'],
    '招聘管理': ['招聘管理', 'HR', '人才招聘'],
    '员工关系': ['员工关系', 'HR', '员工管理'],
    '绩效评估': ['绩效评估', '绩效考核', 'KPI'],
    'HR战略': ['HR战略', '人力资源战略'],
    '监控告警': ['监控告警', '运维监控', '告警'],
    '前端': ['前端', 'Web开发', 'UI开发'],
    '后端': ['后端', '服务端', 'API'],
    '全栈': ['全栈', 'Full Stack', '前后端'],
    '移动开发': ['移动开发', 'iOS', 'Android', 'React Native'],
    '人工智能': ['人工智能', 'AI', '机器学习', '深度学习'],
    '机器学习': ['机器学习', 'ML', 'AI', '深度学习'],
    '深度学习': ['深度学习', 'DL', '神经网络', 'AI'],
    '自然语言处理': ['自然语言处理', 'NLP', '文本处理'],
    '计算机视觉': ['计算机视觉', 'CV', '图像识别'],
    '产品设计': ['产品设计', '产品', '产品经理'],
    '需求分析': ['需求分析', '产品需求', '需求'],
    '项目管理': ['项目管理', 'PM', '敏捷', 'Scrum'],
    '团队协作': ['团队协作', '协作', '沟通'],
    '用户研究': ['用户研究', 'UX', '用户体验'],
    '测试': ['测试', 'QA', '自动化测试'],
    '安全': ['安全', '信息安全', '渗透测试'],
    '网络安全': ['网络安全', '安全', '渗透测试']
  }

  const calculateMatching = (project: Project): MatchingResult => {
    let skillScore = 0
    let experienceScore = 0
    let familyScore = 40

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

    const findMatchingCapability = (reqSkill: string): typeof talent.capabilities[0] | null => {
      if (!talent.capabilities || talent.capabilities.length === 0) {
        return null
      }

      if (reqSkill.includes('/')) {
        const subSkills = reqSkill.split('/')
        for (const subSkill of subSkills) {
          const trimmed = subSkill.trim()
          const cap = findMatchingCapability(trimmed)
          if (cap) return cap
        }
        return null
      }

      const directMatch = talent.capabilities.find(c => c.name === reqSkill)
      if (directMatch) return directMatch

      const containsMatch = talent.capabilities.find(c =>
        c.name.includes(reqSkill) || reqSkill.includes(c.name)
      )
      if (containsMatch) return containsMatch

      const synonyms = skillSynonyms[reqSkill] || []
      for (const synonym of synonyms) {
        const synMatch = talent.capabilities.find(c =>
          c.name === synonym || c.name.includes(synonym) || synonym.includes(c.name)
        )
        if (synMatch) return synMatch
      }

      const categoryMatch = talent.capabilities.find(c =>
        c.category === getProjectFamily(project)
      )
      if (categoryMatch) return categoryMatch

      const broadCategoryMatch = talent.capabilities.find(c =>
        c.category === '技术' || c.category === '工具' || c.category === '产品' || c.category === '协作'
      )
      return broadCategoryMatch || null
    }

    const getProjectFamily = (targetProject: Project) => {
      const text = `${targetProject.jobTitle} ${targetProject.description} ${targetProject.requirements.map(r => r.skill).join(' ')}`
      if (/产品|需求|用户|增长|策划|运营|设计/.test(text)) return '产品'
      if (/协作|沟通|项目管理|团队|管理/.test(text)) return '协作'
      if (/数据|分析|BI|量化|金融|风控|合规/.test(text)) return '分析'
      if (/Git|Docker|Kubernetes|Linux|CI\/CD|运维/.test(text)) return '工具'
      return '技术'
    }

    const getMatchConfidence = (reqSkill: string, capability: typeof talent.capabilities[0]) => {
      if (capability.name === reqSkill || capability.name.includes(reqSkill) || reqSkill.includes(capability.name)) {
        return 1
      }

      const synonyms = skillSynonyms[reqSkill] || []
      if (synonyms.some(s => capability.name === s || capability.name.includes(s) || s.includes(capability.name))) {
        return 0.95
      }

      return capability.category === getProjectFamily(project) ? 0.72 : 0.42
    }

    const calculateFamilyScore = () => {
      const family = getProjectFamily(project)
      const talentRole = talent.identity.role || ''
      const talentText = [
        talentRole,
        ...(talent.identity.preferences || []),
        ...(talent.matching?.idealProjects || []),
        ...talent.capabilities.map(c => `${c.name} ${c.category}`)
      ].join(' ')

      if (talent.capabilities.some(c => c.category === family)) return 90
      if (family === '产品' && /产品|需求|用户|增长|策划|运营|设计|PM/i.test(talentText)) return 88
      if (family === '技术' && /工程师|开发|前端|后端|全栈|技术|React|Java|Python|Node/i.test(talentText)) return 88
      if (family === '分析' && /数据|分析|金融|量化|风控|合规/i.test(talentText)) return 82
      if (family === '协作' && /协作|沟通|管理|项目/i.test(talentText)) return 78
      if (family === '工具' && /Git|Docker|Linux|运维|DevOps|部署/i.test(talentText)) return 78

      return 45
    }

    familyScore = calculateFamilyScore()

    let matchedSkills = 0
    let strongMatchedSkills = 0
    const totalWeight = project.requirements.reduce((sum, req) => sum + req.weight, 0) || 100

    project.requirements.forEach(req => {
      const matchedCap = findMatchingCapability(req.skill)

      if (matchedCap) {
        matchedSkills++
        const talentLevel = levelStrength[matchedCap.level] || 0
        const reqLevel = levelStrength[req.level] || 0

        const matchConfidence = getMatchConfidence(req.skill, matchedCap)
        if (matchConfidence >= 0.9) {
          strongMatchedSkills++
        }

        // 评分用于推荐排序，不做硬性招聘筛人；相关能力给足基础分，再用强度和年限微调。
        const levelScore = talentLevel >= reqLevel ? 1 : Math.max(0.68, talentLevel / reqLevel)
        const strengthBonus = matchedCap.strength ? 0.78 + (matchedCap.strength / 100) * 0.22 : 0.86
        const yearsBonus = matchedCap.years ? Math.min(0.82 + (matchedCap.years / 5) * 0.18, 1) : 0.88

        const score = levelScore * strengthBonus * yearsBonus * matchConfidence * req.weight
        skillScore += score

        if (talentLevel >= reqLevel) {
          strengths.push({
            capability: req.skill,
            evidence: `${levelLabels[matchedCap.level]} - ${matchedCap.description}`,
            matchLevel: talentLevel > reqLevel ? '超出要求' : '完全匹配'
          })
        } else {
          gaps.push({
            skill: req.skill,
            requiredLevel: levelLabels[req.level],
            currentLevel: levelLabels[matchedCap.level]
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

    if (talent.identity.totalExperienceYears !== undefined && talent.identity.totalExperienceYears !== null) {
      const expYears = talent.identity.totalExperienceYears
      const expMin = project.experienceMin
      const expMax = project.experienceMax

      if (expYears >= expMin && expYears <= expMax) {
        experienceScore = 100
      } else if (expYears < expMin) {
        const ratio = expYears / expMin
        experienceScore = Math.max(20, Math.round(ratio * 80) + 10)
        risks.push(`经验年限略低：要求${expMin}-${expMax}年，当前${expYears}年`)
      } else {
        const exceedRatio = expYears / expMax
        if (exceedRatio <= 1.5) {
          experienceScore = 95
        } else if (exceedRatio <= 2) {
          experienceScore = 85
        } else if (exceedRatio <= 3) {
          experienceScore = 75
        } else {
          experienceScore = 65
        }
        if (exceedRatio > 2) {
          risks.push(`经验年限超出较多：要求${expMin}-${expMax}年，当前${expYears}年`)
        }
      }
    } else {
      experienceScore = 50
    }

    const weightedSkillScore = Math.min(100, (skillScore / totalWeight) * 100)
    const strongCoverage = project.requirements.length > 0
      ? (strongMatchedSkills / project.requirements.length) * 100
      : 0
    const skillFitScore = Math.round(weightedSkillScore * 0.78 + strongCoverage * 0.22)

    const salaryMatch = !!talent.matching?.salaryRange &&
      talent.matching.salaryRange[1] >= project.salaryMin &&
      talent.matching.salaryRange[0] <= project.salaryMax
    const salaryScore = salaryMatch ? 100 : 72

    const rawScore = Math.round(
      skillFitScore * 0.52 +
      familyScore * 0.23 +
      experienceScore * 0.17 +
      salaryScore * 0.08
    )
    const overallScore = Math.min(96, Math.max(32, rawScore))

    let recommendation: MatchingResult['recommendation'] = 'consider'
    if (overallScore >= 82) recommendation = 'highly-recommended'
    else if (overallScore >= 66) recommendation = 'recommended'
    else if (overallScore >= 48) recommendation = 'consider'
    else recommendation = 'not-recommended'

    return {
      projectId: project.id,
      overallScore: Math.max(5, overallScore),
      strengths: strengths.slice(0, 5),
      gaps: gaps.slice(0, 5),
      risks,
      recommendation,
      collaborationSuggestion: generateSuggestion(overallScore, gaps, risks, project),
      detailedAnalysis: generateAnalysis(overallScore, strengths, gaps, project),
      salaryMatch: {
        match: salaryMatch,
        suggestion: salaryMatch ? '薪资期望匹配' : '可能存在薪资期望差异'
      },
      experienceMatch: {
        match: experienceScore >= 80,
        suggestion: experienceScore >= 80 ? '经验年限匹配' : experienceScore >= 60 ? '经验年限基本匹配' : '经验年限有差距'
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

  const MatchingSkeleton = () => (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-3">
          <div className="h-8 w-44 rounded-lg skeleton-shimmer" />
          <div className="h-5 w-64 rounded-lg skeleton-shimmer" />
        </div>
        <div className="h-10 w-36 rounded-lg skeleton-shimmer" />
      </div>

      <div className="rounded-2xl bg-slate-800/30 border border-slate-700 p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl skeleton-shimmer" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-36 rounded-lg skeleton-shimmer" />
            <div className="h-4 w-52 rounded-lg skeleton-shimmer" />
            <div className="h-4 w-28 rounded-lg skeleton-shimmer" />
          </div>
          <div className="hidden sm:block space-y-2">
            <div className="h-4 w-20 rounded-lg skeleton-shimmer" />
            <div className="h-6 w-32 rounded-lg skeleton-shimmer" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="h-10 flex-1 min-w-[220px] rounded-lg skeleton-shimmer" />
        <div className="h-10 w-32 rounded-lg skeleton-shimmer" />
        <div className="h-10 w-32 rounded-lg skeleton-shimmer" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="stagger-item p-5 rounded-2xl bg-slate-800/30 border border-slate-700"
            style={{ animationDelay: `${index * 55}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-3">
                <div className="h-6 w-36 rounded-lg skeleton-shimmer" />
                <div className="h-4 w-28 rounded-lg skeleton-shimmer" />
              </div>
              <div className="h-8 w-16 rounded-lg skeleton-shimmer" />
            </div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-14 rounded skeleton-shimmer" />
              <div className="h-6 w-16 rounded skeleton-shimmer" />
              <div className="h-6 w-12 rounded skeleton-shimmer" />
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 w-full rounded skeleton-shimmer" />
              <div className="h-3 w-4/5 rounded skeleton-shimmer" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-24 rounded skeleton-shimmer" />
              <div className="h-4 w-20 rounded skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const rankedProjects = (() => {
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

    return filtered
      .map(project => ({
        project,
        matching: calculateMatching(project)
      }))
      .sort((a, b) => {
        const scoreDiff = b.matching.overallScore - a.matching.overallScore
        if (scoreDiff !== 0) return scoreDiff
        return a.project.jobTitle.localeCompare(b.project.jobTitle, 'zh-CN')
      })
  })()

  const totalPages = Math.max(1, Math.ceil(rankedProjects.length / PROJECTS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const pageStart = (safeCurrentPage - 1) * PROJECTS_PER_PAGE
  const currentPageProjects = rankedProjects.slice(pageStart, pageStart + PROJECTS_PER_PAGE)
  const visibleProjects = currentPageProjects.slice(0, visibleProjectCount)
  const canShowMore = visibleProjectCount < currentPageProjects.length
  const displayedStart = rankedProjects.length === 0 ? 0 : pageStart + 1
  const displayedEnd = pageStart + visibleProjects.length

  const changeProjectPage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages)
    setCurrentPage(nextPage)
    setVisibleProjectCount(INITIAL_VISIBLE_PROJECTS)
  }

  if (loading) {
    return <MatchingSkeleton />
  }

  if (!session && !searchParams?.get('token') && id !== 'demo' && !findDemoTalent(String(talentId))) {
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

          {rankedProjects.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 rounded-2xl bg-slate-800/20 border border-slate-700/60 px-4 py-3">
              <div>
                <p className="text-sm text-slate-300">
                  已按匹配度排序 · 当前显示第 {displayedStart}-{displayedEnd} 个
                </p>
                <p className="text-xs text-slate-500">
                  共 {rankedProjects.length} 个岗位，每页最多 {PROJECTS_PER_PAGE} 个，先展开 {INITIAL_VISIBLE_PROJECTS} 个
                </p>
              </div>
              <div className="text-sm text-slate-400">
                第 <span className="text-primary-400 font-medium">{safeCurrentPage}</span> / {totalPages} 页
              </div>
            </div>
          )}

          {/* 岗位卡片列表 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleProjects.map(({ project, matching }, index) => {
              const quickScore = Math.round(matching.overallScore)
              return (
                <button
                  key={project.id}
                  onClick={() => handleAnalyze(project)}
                  className="stagger-item p-5 rounded-2xl bg-slate-800/30 border border-slate-700 hover:border-primary-500/50 hover:bg-slate-800/50 transition-all text-left group"
                  style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
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

          {rankedProjects.length > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-slate-800/20 border border-slate-700/60 p-4">
              <div className="text-sm text-slate-400">
                {canShowMore
                  ? `本页还有 ${currentPageProjects.length - visibleProjects.length} 个岗位可展开`
                  : '本页岗位已全部展开'}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {canShowMore && (
                  <button
                    onClick={() => setVisibleProjectCount(PROJECTS_PER_PAGE)}
                    className="px-4 py-2 rounded-lg bg-primary-500/20 text-primary-400 hover:bg-primary-500/30 transition-colors text-sm font-medium"
                  >
                    查看更多本页岗位
                  </button>
                )}
                <button
                  onClick={() => changeProjectPage(safeCurrentPage - 1)}
                  disabled={safeCurrentPage <= 1}
                  className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  上一页
                </button>
                {Array.from({ length: totalPages }).slice(0, 7).map((_, index) => {
                  const page = index + 1
                  return (
                    <button
                      key={page}
                      onClick={() => changeProjectPage(page)}
                      className={`w-9 h-9 rounded-lg text-sm transition-colors ${
                        safeCurrentPage === page
                          ? 'bg-primary-500 text-white'
                          : 'border border-slate-600 text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
                {totalPages > 7 && (
                  <span className="px-2 text-slate-500">...</span>
                )}
                <button
                  onClick={() => changeProjectPage(safeCurrentPage + 1)}
                  disabled={safeCurrentPage >= totalPages}
                  className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  下一页
                </button>
              </div>
            </div>
          )}

          {rankedProjects.length === 0 && (
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
