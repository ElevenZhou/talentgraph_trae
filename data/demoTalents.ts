import { TalentGraphData } from '../types'

export const demoTalents: TalentGraphData[] = [
  {
    id: 'demo-product',
    identity: {
      name: '林予安',
      role: 'AI 产品经理',
      location: '北京',
      availability: 'open',
      preferences: ['AI 应用方向', 'B 端工具', '0-1 产品'],
      totalExperienceYears: 5
    },
    capabilities: [
      { id: 'product-cap-1', name: '需求分析', level: 'expert', category: '产品', evidenceIds: ['product-evi-1'], description: '负责多个 B 端系统从调研到需求拆解，能把模糊场景转成可落地 PRD', strength: 88, years: 5, projectCount: 9, qualityScore: 9 },
      { id: 'product-cap-2', name: 'AI 产品设计', level: 'strong', category: '产品', evidenceIds: ['product-evi-2'], description: '设计过 RAG 知识库、智能客服和 Agent 工作流', strength: 82, years: 3, projectCount: 5, qualityScore: 8 },
      { id: 'product-cap-3', name: '数据分析', level: 'strong', category: '分析', evidenceIds: ['product-evi-1'], description: '建立过转化、留存、效率类指标体系，能用数据判断迭代优先级', strength: 76, years: 4, projectCount: 6, qualityScore: 8 },
      { id: 'product-cap-4', name: '用户研究', level: 'strong', category: '产品', evidenceIds: ['product-evi-3'], description: '常态化访谈业务用户，输出用户旅程和痛点地图', strength: 74, years: 4, projectCount: 7, qualityScore: 8 },
      { id: 'product-cap-5', name: '跨团队协作', level: 'expert', category: '协作', evidenceIds: ['product-evi-1', 'product-evi-2'], description: '能协调算法、研发、运营和销售团队推动版本落地', strength: 90, years: 5, projectCount: 11, qualityScore: 9 },
      { id: 'product-cap-6', name: 'Prompt工程', level: 'moderate', category: '技术', evidenceIds: ['product-evi-2'], description: '能编写结构化提示词并做基础效果评测', strength: 62, years: 2, projectCount: 3, qualityScore: 7 }
    ],
    evidence: [
      { id: 'product-evi-1', type: 'company', title: '高级产品经理', organization: '某企业服务公司', period: '2021-至今', description: '负责企业知识库和流程自动化产品，帮助客户把人工查询时间降低 40%', capabilities: ['需求分析', '数据分析', '跨团队协作'], links: [], durationYears: 3.5, impactScore: 9 },
      { id: 'product-evi-2', type: 'project', title: 'AI 客服助手', organization: '内部创新项目', period: '2023', description: '从 0 到 1 设计基于 LLM 的客服助手，完成意图识别、知识召回和人工转接闭环', capabilities: ['AI 产品设计', 'Prompt工程', '跨团队协作'], links: [], durationYears: 0.8, impactScore: 8 },
      { id: 'product-evi-3', type: 'company', title: '产品经理', organization: '某 SaaS 公司', period: '2019-2021', description: '负责权限、审批和数据看板模块，核心客户续费率提升', capabilities: ['用户研究', '需求分析'], links: [], durationYears: 2, impactScore: 7 }
    ],
    boundaries: {
      strong: ['AI 应用产品', 'B 端业务抽象', '跨团队推动'],
      moderate: ['增长实验', '基础数据分析', 'Prompt 调优'],
      weak: ['底层模型训练', '纯算法研究', '硬件产品'],
      collaboration: ['需要明确业务负责人', '适合两周一个迭代节奏', '需要算法或工程同伴配合']
    },
    matching: {
      idealProjects: ['AI 产品经理', '产品经理', '企业服务', '知识库/客服系统', '增长产品'],
      avoidProjects: ['底层大模型训练', '纯硬件研发', '重度游戏数值策划'],
      independenceLevel: '可独立负责 0-1 产品线，并组织多角色协作',
      riskFactors: ['深度算法实现经验有限', '超大规模 C 端商业化经验较少'],
      salaryRange: [30000, 48000]
    },
    agentMeta: {
      accessToken: 'demo-product-token',
      permissionScope: ['read', 'match', 'evaluate'],
      instructions: 'Evaluate fit only within authorized demo context. Do not expose private contact information.',
      humanViewUrl: '/graph/demo-product?view=human',
      agentProfileUrl: '/graph/demo-product?view=agent',
      structuredJsonUrl: '/graph/demo-product?view=json'
    },
    rawResume: 'Demo profile: AI 产品经理，适合 AI 应用、B 端产品和项目匹配体验。',
    createdAt: new Date('2026-05-07T09:00:00+08:00')
  },
  {
    id: 'demo-dev',
    identity: {
      name: '陈亦航',
      role: '全栈开发工程师',
      location: '上海',
      availability: 'open',
      preferences: ['前端平台', '全栈开发', 'AI 工具工程化'],
      totalExperienceYears: 4
    },
    capabilities: [
      { id: 'dev-cap-1', name: 'React', level: 'expert', category: '技术', evidenceIds: ['dev-evi-1'], description: '熟悉 React 组件架构、Hooks、状态管理和性能优化', strength: 90, years: 4, projectCount: 10, qualityScore: 9 },
      { id: 'dev-cap-2', name: 'TypeScript', level: 'expert', category: '技术', evidenceIds: ['dev-evi-1'], description: '长期使用 TypeScript 构建复杂前端和 Node 服务', strength: 86, years: 4, projectCount: 9, qualityScore: 9 },
      { id: 'dev-cap-3', name: 'Node.js', level: 'strong', category: '技术', evidenceIds: ['dev-evi-2'], description: '能设计 REST API、任务队列和基础权限逻辑', strength: 76, years: 3, projectCount: 5, qualityScore: 8 },
      { id: 'dev-cap-4', name: '性能优化', level: 'strong', category: '技术', evidenceIds: ['dev-evi-1'], description: '做过首屏加载、包体拆分、渲染性能和接口缓存优化', strength: 78, years: 3, projectCount: 4, qualityScore: 8 },
      { id: 'dev-cap-5', name: 'Git', level: 'expert', category: '工具', evidenceIds: ['dev-evi-1', 'dev-evi-2'], description: '熟悉分支协作、代码审查和发布回滚流程', strength: 88, years: 5, projectCount: 12, qualityScore: 9 },
      { id: 'dev-cap-6', name: 'Docker', level: 'moderate', category: '工具', evidenceIds: ['dev-evi-2'], description: '能编写 Dockerfile 并完成基础部署', strength: 60, years: 2, projectCount: 3, qualityScore: 7 }
    ],
    evidence: [
      { id: 'dev-evi-1', type: 'company', title: '前端工程师', organization: '某互联网公司', period: '2020-2023', description: '负责商家后台和运营平台，重构后页面加载速度提升 35%', capabilities: ['React', 'TypeScript', '性能优化', 'Git'], links: [], durationYears: 3, impactScore: 8 },
      { id: 'dev-evi-2', type: 'project', title: 'AI 工具控制台', organization: '创业项目', period: '2023-至今', description: '独立完成前端、Node API 和部署脚本，支持团队快速配置模型和任务', capabilities: ['Node.js', 'TypeScript', 'Docker'], links: [], durationYears: 1, impactScore: 8 }
    ],
    boundaries: {
      strong: ['React 前端工程化', 'TypeScript 全栈开发', '后台系统体验优化'],
      moderate: ['Node.js 服务', 'Docker 部署', '技术方案评审'],
      weak: ['底层算法研究', '大规模 DevOps 平台', '纯移动端原生开发'],
      collaboration: ['适合与产品经理快速迭代', '需要明确 API 边界', '可承担中小型模块 Owner']
    },
    matching: {
      idealProjects: ['高级前端工程师', '全栈工程师', 'AI 工具控制台', '前端平台'],
      avoidProjects: ['纯算法工程师', '行政人事岗位', '重度 C++ 游戏引擎'],
      independenceLevel: '可独立负责前端到轻后端闭环，中大型后端需要架构支持',
      riskFactors: ['大规模分布式后端经验有限', '原生移动端经验较少'],
      salaryRange: [28000, 45000]
    },
    agentMeta: {
      accessToken: 'demo-dev-token',
      permissionScope: ['read', 'match', 'evaluate'],
      instructions: 'Evaluate engineering fit within demo context. Highlight frontend and full-stack strengths.',
      humanViewUrl: '/graph/demo-dev?view=human',
      agentProfileUrl: '/graph/demo-dev?view=agent',
      structuredJsonUrl: '/graph/demo-dev?view=json'
    },
    rawResume: 'Demo profile: 全栈开发工程师，适合前端、全栈和工程化岗位体验。',
    createdAt: new Date('2026-05-07T09:10:00+08:00')
  },
  {
    id: 'demo-student',
    identity: {
      name: '周晴',
      role: '产品/数据实习生',
      location: '杭州',
      availability: 'looking',
      preferences: ['产品实习', '数据分析', 'AI 应用学习'],
      totalExperienceYears: 1
    },
    capabilities: [
      { id: 'student-cap-1', name: '需求分析', level: 'moderate', category: '产品', evidenceIds: ['student-evi-1'], description: '能根据访谈和竞品资料整理基础需求文档', strength: 66, years: 1, projectCount: 3, qualityScore: 7 },
      { id: 'student-cap-2', name: '数据分析', level: 'moderate', category: '分析', evidenceIds: ['student-evi-2'], description: '熟悉 Excel、SQL 基础查询和可视化分析', strength: 68, years: 1, projectCount: 4, qualityScore: 7 },
      { id: 'student-cap-3', name: '文档撰写', level: 'strong', category: '产品', evidenceIds: ['student-evi-1'], description: '能输出结构清晰的 PRD、调研纪要和复盘文档', strength: 76, years: 1, projectCount: 5, qualityScore: 8 },
      { id: 'student-cap-4', name: '沟通能力', level: 'strong', category: '协作', evidenceIds: ['student-evi-3'], description: '社团和课程项目中负责跨成员沟通和进度推进', strength: 74, years: 2, projectCount: 4, qualityScore: 8 },
      { id: 'student-cap-5', name: 'Python', level: 'basic', category: '技术', evidenceIds: ['student-evi-2'], description: '可用 Python 做基础数据清洗和脚本处理', strength: 52, years: 1, projectCount: 2, qualityScore: 6 }
    ],
    evidence: [
      { id: 'student-evi-1', type: 'project', title: '校园二手交易产品原型', organization: '课程项目', period: '2025', description: '完成用户调研、功能规划和 Figma 原型', capabilities: ['需求分析', '文档撰写'], links: [], durationYears: 0.3, impactScore: 7 },
      { id: 'student-evi-2', type: 'project', title: '消费数据分析报告', organization: '数据分析课程', period: '2025', description: '使用 SQL 和 Python 清洗数据并输出可视化结论', capabilities: ['数据分析', 'Python'], links: [], durationYears: 0.2, impactScore: 7 },
      { id: 'student-evi-3', type: 'education', title: '信息管理本科', organization: '浙江某高校', period: '2022-2026', description: '参与学生组织和多项课程项目，偏产品与数据方向', capabilities: ['沟通能力'], links: [], durationYears: 4, impactScore: 6 }
    ],
    boundaries: {
      strong: ['学习速度', '文档整理', '基础数据分析'],
      moderate: ['产品原型', '用户调研', '简单脚本处理'],
      weak: ['独立负责商业产品线', '复杂后端开发', '深度算法建模'],
      collaboration: ['适合导师带教', '需要明确任务拆分', '适合实习和初级岗位']
    },
    matching: {
      idealProjects: ['产品经理实习生', '数据分析师实习生', '内容运营实习生', '应届生'],
      avoidProjects: ['架构师', '高级算法工程师', '资深管理岗位'],
      independenceLevel: '适合在导师指导下承担明确模块，学习和执行意愿强',
      riskFactors: ['商业实战经验较少', '复杂技术深度不足'],
      salaryRange: [8000, 22000]
    },
    agentMeta: {
      accessToken: 'demo-student-token',
      permissionScope: ['read', 'match', 'evaluate'],
      instructions: 'Evaluate junior and internship fit. Emphasize learning potential and supervision needs.',
      humanViewUrl: '/graph/demo-student?view=human',
      agentProfileUrl: '/graph/demo-student?view=agent',
      structuredJsonUrl: '/graph/demo-student?view=json'
    },
    rawResume: 'Demo profile: 产品/数据实习生，适合应届生和实习岗位体验。',
    createdAt: new Date('2026-05-07T09:20:00+08:00')
  }
]

export const defaultDemoTalent = demoTalents[0]

export function findDemoTalent(id: string) {
  return demoTalents.find(talent => talent.id === id) || null
}

export function getDemoResumeRows(userId = 'demo-user') {
  return demoTalents.map((talent, index) => ({
    id: talent.id,
    user_id: userId,
    title: `${talent.identity.name} ${new Date(Date.now() - index * 60_000).toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/\//g, '-')}`,
    talent_data: JSON.stringify(talent),
    status: 'demo',
    created_at: new Date(Date.now() - index * 60_000).toISOString(),
    updated_at: new Date(Date.now() - index * 60_000).toISOString()
  }))
}
