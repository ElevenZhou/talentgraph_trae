export interface JobRequirement {
  id: string
  skill: string
  level: 'expert' | 'strong' | 'moderate' | 'basic'
  weight: number
}

export interface Project {
  id: string
  companyName: string
  companyLogo?: string
  industry: string
  companySize: string
  location: string
  jobTitle: string
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship'
  experienceMin: number
  experienceMax: number
  salaryMin: number
  salaryMax: number
  requirements: JobRequirement[]
  description: string
  responsibilities: string[]
  benefits: string[]
}

export const mockProjects: Project[] = [
  // 技术类岗位 (15个)
  {
    id: 'proj-001',
    companyName: '字节跳动',
    industry: '互联网',
    companySize: '10000+',
    location: '北京',
    jobTitle: '高级前端工程师',
    jobType: 'full-time',
    experienceMin: 3,
    experienceMax: 6,
    salaryMin: 35000,
    salaryMax: 55000,
    requirements: [
      { id: 'req-1', skill: 'React/Vue', level: 'expert', weight: 40 },
      { id: 'req-2', skill: 'TypeScript', level: 'strong', weight: 25 },
      { id: 'req-3', skill: 'Node.js', level: 'moderate', weight: 15 },
      { id: 'req-4', skill: '性能优化', level: 'strong', weight: 20 }
    ],
    description: '负责抖音核心产品的前端架构设计与开发',
    responsibilities: [
      '负责前端架构设计与技术选型',
      '优化产品性能和用户体验',
      '带领团队完成核心功能开发'
    ],
    benefits: ['六险一金', '免费三餐', '年度体检', '团建活动']
  },
  {
    id: 'proj-002',
    companyName: '阿里巴巴',
    industry: '电子商务',
    companySize: '10000+',
    location: '杭州',
    jobTitle: '后端开发工程师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 30000,
    salaryMax: 50000,
    requirements: [
      { id: 'req-1', skill: 'Java', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '分布式系统', level: 'strong', weight: 30 },
      { id: 'req-3', skill: 'MySQL', level: 'strong', weight: 20 },
      { id: 'req-4', skill: 'Redis', level: 'moderate', weight: 15 }
    ],
    description: '负责淘宝交易系统的后端开发',
    responsibilities: [
      '参与核心交易系统开发',
      '优化系统性能和稳定性',
      '参与技术方案评审'
    ],
    benefits: ['五险一金', '住房补贴', '餐补', '股票期权']
  },
  {
    id: 'proj-003',
    companyName: '腾讯',
    industry: '互联网',
    companySize: '10000+',
    location: '深圳',
    jobTitle: '全栈工程师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 4,
    salaryMin: 28000,
    salaryMax: 45000,
    requirements: [
      { id: 'req-1', skill: 'React', level: 'strong', weight: 25 },
      { id: 'req-2', skill: 'Node.js', level: 'strong', weight: 25 },
      { id: 'req-3', skill: 'MongoDB', level: 'moderate', weight: 20 },
      { id: 'req-4', skill: 'AWS', level: 'basic', weight: 15 },
      { id: 'req-5', skill: 'Git', level: 'strong', weight: 15 }
    ],
    description: '负责微信小程序生态的全栈开发',
    responsibilities: [
      '独立完成小程序开发',
      '与产品团队紧密协作',
      '保障代码质量'
    ],
    benefits: ['六险一金', '免费班车', '年度旅游', '员工俱乐部']
  },
  {
    id: 'proj-004',
    companyName: '百度',
    industry: '人工智能',
    companySize: '10000+',
    location: '北京',
    jobTitle: '算法工程师',
    jobType: 'full-time',
    experienceMin: 3,
    experienceMax: 6,
    salaryMin: 40000,
    salaryMax: 65000,
    requirements: [
      { id: 'req-1', skill: '机器学习', level: 'expert', weight: 35 },
      { id: 'req-2', skill: 'Python', level: 'expert', weight: 25 },
      { id: 'req-3', skill: 'NLP', level: 'strong', weight: 25 },
      { id: 'req-4', skill: 'TensorFlow/PyTorch', level: 'strong', weight: 15 }
    ],
    description: '负责搜索算法优化和推荐系统开发',
    responsibilities: [
      '开发和优化搜索算法',
      '构建推荐系统模型',
      '参与AI前沿技术研究'
    ],
    benefits: ['六险一金', '租房补贴', '餐补', '年度体检']
  },
  {
    id: 'proj-005',
    companyName: '美团',
    industry: '本地生活',
    companySize: '10000+',
    location: '北京',
    jobTitle: '数据工程师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 28000,
    salaryMax: 48000,
    requirements: [
      { id: 'req-1', skill: 'Spark', level: 'strong', weight: 30 },
      { id: 'req-2', skill: 'Hadoop', level: 'moderate', weight: 20 },
      { id: 'req-3', skill: 'SQL', level: 'expert', weight: 25 },
      { id: 'req-4', skill: 'Python', level: 'strong', weight: 25 }
    ],
    description: '负责美团大数据平台的数据处理和分析',
    responsibilities: [
      '构建数据仓库',
      '开发数据ETL流程',
      '优化数据处理性能'
    ],
    benefits: ['五险一金', '餐补', '年度体检', '团建活动']
  },
  {
    id: 'proj-006',
    companyName: '京东',
    industry: '电子商务',
    companySize: '10000+',
    location: '北京',
    jobTitle: 'Go工程师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 32000,
    salaryMax: 52000,
    requirements: [
      { id: 'req-1', skill: 'Go', level: 'expert', weight: 40 },
      { id: 'req-2', skill: '微服务', level: 'strong', weight: 30 },
      { id: 'req-3', skill: 'gRPC', level: 'moderate', weight: 15 },
      { id: 'req-4', skill: 'Docker', level: 'basic', weight: 15 }
    ],
    description: '负责京东物流系统的后端开发',
    responsibilities: [
      '开发高可用微服务',
      '优化系统性能',
      '参与架构设计'
    ],
    benefits: ['六险一金', '住房补贴', '餐补', '股票']
  },
  {
    id: 'proj-007',
    companyName: '网易',
    industry: '游戏',
    companySize: '10000+',
    location: '杭州',
    jobTitle: '游戏开发工程师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 30000,
    salaryMax: 50000,
    requirements: [
      { id: 'req-1', skill: 'C++', level: 'expert', weight: 40 },
      { id: 'req-2', skill: 'Unity/Unreal', level: 'strong', weight: 30 },
      { id: 'req-3', skill: '游戏引擎', level: 'strong', weight: 20 },
      { id: 'req-4', skill: 'Lua', level: 'moderate', weight: 10 }
    ],
    description: '负责网易游戏核心玩法开发',
    responsibilities: [
      '开发游戏核心玩法',
      '优化游戏性能',
      '与策划团队协作'
    ],
    benefits: ['五险一金', '餐补', '游戏福利', '年度旅游']
  },
  {
    id: 'proj-008',
    companyName: '滴滴',
    industry: '出行',
    companySize: '1000-9999',
    location: '北京',
    jobTitle: '架构师',
    jobType: 'full-time',
    experienceMin: 5,
    experienceMax: 10,
    salaryMin: 50000,
    salaryMax: 80000,
    requirements: [
      { id: 'req-1', skill: '系统架构', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '分布式系统', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '高并发', level: 'expert', weight: 20 },
      { id: 'req-4', skill: '技术管理', level: 'strong', weight: 15 }
    ],
    description: '负责滴滴核心系统架构设计',
    responsibilities: [
      '设计系统架构',
      '技术选型决策',
      '带领技术团队'
    ],
    benefits: ['六险一金', '住房补贴', '车补', '年度体检']
  },
  {
    id: 'proj-009',
    companyName: '快手',
    industry: '短视频',
    companySize: '1000-9999',
    location: '北京',
    jobTitle: '移动端开发工程师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 28000,
    salaryMax: 48000,
    requirements: [
      { id: 'req-1', skill: 'Android/iOS', level: 'expert', weight: 40 },
      { id: 'req-2', skill: 'Flutter', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '性能优化', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '网络协议', level: 'moderate', weight: 15 }
    ],
    description: '负责快手App的移动端开发',
    responsibilities: [
      '开发移动端功能',
      '优化App性能',
      '保障用户体验'
    ],
    benefits: ['六险一金', '免费三餐', '租房补贴', '年度旅游']
  },
  {
    id: 'proj-010',
    companyName: '小红书',
    industry: '社交电商',
    companySize: '1000-9999',
    location: '上海',
    jobTitle: '前端技术leader',
    jobType: 'full-time',
    experienceMin: 4,
    experienceMax: 8,
    salaryMin: 45000,
    salaryMax: 70000,
    requirements: [
      { id: 'req-1', skill: 'React/Vue', level: 'expert', weight: 25 },
      { id: 'req-2', skill: '前端架构', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '团队管理', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '性能优化', level: 'strong', weight: 20 }
    ],
    description: '负责小红书前端团队管理和技术架构',
    responsibilities: [
      '带领前端团队',
      '设计技术架构',
      '推动技术创新'
    ],
    benefits: ['五险一金', '餐补', '年度体检', '员工活动']
  },
  {
    id: 'proj-011',
    companyName: '携程',
    industry: '旅游',
    companySize: '1000-9999',
    location: '上海',
    jobTitle: '测试工程师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 20000,
    salaryMax: 35000,
    requirements: [
      { id: 'req-1', skill: '自动化测试', level: 'strong', weight: 30 },
      { id: 'req-2', skill: 'Python', level: 'moderate', weight: 25 },
      { id: 'req-3', skill: '测试框架', level: 'strong', weight: 25 },
      { id: 'req-4', skill: 'CI/CD', level: 'basic', weight: 20 }
    ],
    description: '负责携程旅游平台的质量保障',
    responsibilities: [
      '编写测试用例',
      '开发自动化测试',
      '保障产品质量'
    ],
    benefits: ['五险一金', '旅游补贴', '年度体检', '团建']
  },
  {
    id: 'proj-012',
    companyName: '饿了么',
    industry: '本地生活',
    companySize: '1000-9999',
    location: '上海',
    jobTitle: 'DevOps工程师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 26000,
    salaryMax: 45000,
    requirements: [
      { id: 'req-1', skill: 'Kubernetes', level: 'strong', weight: 30 },
      { id: 'req-2', skill: 'Docker', level: 'expert', weight: 25 },
      { id: 'req-3', skill: 'CI/CD', level: 'strong', weight: 25 },
      { id: 'req-4', skill: 'Linux', level: 'strong', weight: 20 }
    ],
    description: '负责饿了么基础设施和运维工作',
    responsibilities: [
      '维护基础设施',
      '优化运维流程',
      '保障系统稳定'
    ],
    benefits: ['六险一金', '餐补', '年度体检', '团建']
  },
  {
    id: 'proj-013',
    companyName: '蚂蚁集团',
    industry: '金融科技',
    companySize: '10000+',
    location: '杭州',
    jobTitle: '安全工程师',
    jobType: 'full-time',
    experienceMin: 3,
    experienceMax: 6,
    salaryMin: 35000,
    salaryMax: 55000,
    requirements: [
      { id: 'req-1', skill: '网络安全', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '渗透测试', level: 'strong', weight: 30 },
      { id: 'req-3', skill: '安全审计', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '代码审计', level: 'moderate', weight: 15 }
    ],
    description: '负责蚂蚁集团金融系统的安全保障',
    responsibilities: [
      '进行安全测试',
      '发现安全漏洞',
      '制定安全策略'
    ],
    benefits: ['六险一金', '住房补贴', '餐补', '股票期权']
  },
  {
    id: 'proj-014',
    companyName: '小米',
    industry: '智能硬件',
    companySize: '10000+',
    location: '北京',
    jobTitle: '嵌入式工程师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 26000,
    salaryMax: 45000,
    requirements: [
      { id: 'req-1', skill: 'C/C++', level: 'expert', weight: 35 },
      { id: 'req-2', skill: 'Linux内核', level: 'strong', weight: 30 },
      { id: 'req-3', skill: '驱动开发', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '硬件知识', level: 'moderate', weight: 15 }
    ],
    description: '负责小米智能硬件的嵌入式开发',
    responsibilities: [
      '开发嵌入式软件',
      '调试硬件驱动',
      '优化设备性能'
    ],
    benefits: ['五险一金', '产品折扣', '年度体检', '团建']
  },
  {
    id: 'proj-015',
    companyName: '华为',
    industry: '通信',
    companySize: '10000+',
    location: '深圳',
    jobTitle: '5G研发工程师',
    jobType: 'full-time',
    experienceMin: 3,
    experienceMax: 6,
    salaryMin: 38000,
    salaryMax: 60000,
    requirements: [
      { id: 'req-1', skill: '5G协议', level: 'expert', weight: 35 },
      { id: 'req-2', skill: 'C/C++', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '通信原理', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '协议测试', level: 'moderate', weight: 15 }
    ],
    description: '负责华为5G核心技术研发',
    responsibilities: [
      '开发5G协议栈',
      '参与标准制定',
      '优化通信性能'
    ],
    benefits: ['六险一金', '住房补贴', '年终奖', '股票']
  },
  // 产品类岗位 (10个)
  {
    id: 'proj-016',
    companyName: '字节跳动',
    industry: '互联网',
    companySize: '10000+',
    location: '北京',
    jobTitle: '产品经理',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 28000,
    salaryMax: 48000,
    requirements: [
      { id: 'req-1', skill: '需求分析', level: 'expert', weight: 30 },
      { id: 'req-2', skill: '产品设计', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '数据分析', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '跨团队协作', level: 'strong', weight: 20 }
    ],
    description: '负责抖音产品功能规划和迭代',
    responsibilities: [
      '收集用户需求',
      '设计产品功能',
      '推动项目落地'
    ],
    benefits: ['六险一金', '免费三餐', '年度体检', '团建']
  },
  {
    id: 'proj-017',
    companyName: '百度',
    industry: '人工智能',
    companySize: '10000+',
    location: '北京',
    jobTitle: 'AI产品经理',
    jobType: 'full-time',
    experienceMin: 3,
    experienceMax: 6,
    salaryMin: 35000,
    salaryMax: 55000,
    requirements: [
      { id: 'req-1', skill: 'AI技术理解', level: 'strong', weight: 30 },
      { id: 'req-2', skill: '产品设计', level: 'expert', weight: 25 },
      { id: 'req-3', skill: 'Prompt工程', level: 'moderate', weight: 20 },
      { id: 'req-4', skill: '数据分析', level: 'strong', weight: 25 }
    ],
    description: '负责百度AI产品的规划和设计',
    responsibilities: [
      '设计AI产品功能',
      '与算法团队协作',
      '推动AI落地'
    ],
    benefits: ['六险一金', '租房补贴', '餐补', '年度体检']
  },
  {
    id: 'proj-018',
    companyName: '美团',
    industry: '本地生活',
    companySize: '10000+',
    location: '北京',
    jobTitle: '增长产品经理',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 30000,
    salaryMax: 50000,
    requirements: [
      { id: 'req-1', skill: '用户增长', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '数据分析', level: 'expert', weight: 30 },
      { id: 'req-3', skill: 'A/B测试', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '营销知识', level: 'moderate', weight: 15 }
    ],
    description: '负责美团用户增长策略制定',
    responsibilities: [
      '制定增长策略',
      '设计增长实验',
      '分析数据优化'
    ],
    benefits: ['五险一金', '餐补', '年度体检', '团建']
  },
  {
    id: 'proj-019',
    companyName: '京东',
    industry: '电子商务',
    companySize: '10000+',
    location: '北京',
    jobTitle: '电商产品经理',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 28000,
    salaryMax: 48000,
    requirements: [
      { id: 'req-1', skill: '电商业务', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '产品设计', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '数据分析', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '供应链', level: 'moderate', weight: 15 }
    ],
    description: '负责京东商城产品功能设计',
    responsibilities: [
      '设计电商功能',
      '优化购物体验',
      '推动业务增长'
    ],
    benefits: ['六险一金', '住房补贴', '餐补', '股票']
  },
  {
    id: 'proj-020',
    companyName: '腾讯',
    industry: '互联网',
    companySize: '10000+',
    location: '深圳',
    jobTitle: '社交产品经理',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 30000,
    salaryMax: 50000,
    requirements: [
      { id: 'req-1', skill: '社交产品', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '用户研究', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '产品设计', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '数据分析', level: 'moderate', weight: 15 }
    ],
    description: '负责微信社交功能的产品设计',
    responsibilities: [
      '设计社交功能',
      '理解用户需求',
      '优化用户体验'
    ],
    benefits: ['六险一金', '免费班车', '年度旅游', '员工俱乐部']
  },
  {
    id: 'proj-021',
    companyName: '网易',
    industry: '游戏',
    companySize: '10000+',
    location: '杭州',
    jobTitle: '游戏策划',
    jobType: 'full-time',
    experienceMin: 1,
    experienceMax: 4,
    salaryMin: 22000,
    salaryMax: 40000,
    requirements: [
      { id: 'req-1', skill: '游戏设计', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '数值平衡', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '剧情设计', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '数据分析', level: 'moderate', weight: 15 }
    ],
    description: '负责网易游戏玩法策划和设计',
    responsibilities: [
      '设计游戏玩法',
      '平衡游戏数值',
      '编写游戏剧情'
    ],
    benefits: ['五险一金', '餐补', '游戏福利', '年度旅游']
  },
  {
    id: 'proj-022',
    companyName: '小红书',
    industry: '社交电商',
    companySize: '1000-9999',
    location: '上海',
    jobTitle: '内容产品经理',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 4,
    salaryMin: 26000,
    salaryMax: 42000,
    requirements: [
      { id: 'req-1', skill: '内容生态', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '产品设计', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '创作者运营', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '数据分析', level: 'moderate', weight: 15 }
    ],
    description: '负责小红书内容产品的规划',
    responsibilities: [
      '设计内容功能',
      '优化内容推荐',
      '维护创作者生态'
    ],
    benefits: ['五险一金', '餐补', '年度体检', '员工活动']
  },
  {
    id: 'proj-023',
    companyName: '携程',
    industry: '旅游',
    companySize: '1000-9999',
    location: '上海',
    jobTitle: '旅游产品经理',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 26000,
    salaryMax: 45000,
    requirements: [
      { id: 'req-1', skill: '旅游行业', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '产品设计', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '供应链管理', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '数据分析', level: 'moderate', weight: 15 }
    ],
    description: '负责携程旅游产品的设计和优化',
    responsibilities: [
      '设计旅游产品',
      '优化用户体验',
      '与供应商协作'
    ],
    benefits: ['五险一金', '旅游补贴', '年度体检', '团建']
  },
  {
    id: 'proj-024',
    companyName: '蚂蚁集团',
    industry: '金融科技',
    companySize: '10000+',
    location: '杭州',
    jobTitle: '金融产品经理',
    jobType: 'full-time',
    experienceMin: 3,
    experienceMax: 6,
    salaryMin: 35000,
    salaryMax: 55000,
    requirements: [
      { id: 'req-1', skill: '金融知识', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '产品设计', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '风险控制', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '数据分析', level: 'strong', weight: 15 }
    ],
    description: '负责蚂蚁集团金融产品设计',
    responsibilities: [
      '设计金融产品',
      '控制金融风险',
      '合规性把控'
    ],
    benefits: ['六险一金', '住房补贴', '餐补', '股票期权']
  },
  {
    id: 'proj-025',
    companyName: '滴滴',
    industry: '出行',
    companySize: '1000-9999',
    location: '北京',
    jobTitle: '策略产品经理',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 30000,
    salaryMax: 50000,
    requirements: [
      { id: 'req-1', skill: '策略设计', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '数据分析', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '数学建模', level: 'moderate', weight: 20 },
      { id: 'req-4', skill: '业务理解', level: 'strong', weight: 15 }
    ],
    description: '负责滴滴出行策略产品设计',
    responsibilities: [
      '设计定价策略',
      '优化派单算法',
      '分析运营数据'
    ],
    benefits: ['六险一金', '住房补贴', '车补', '年度体检']
  },
  // 设计类岗位 (5个)
  {
    id: 'proj-026',
    companyName: '字节跳动',
    industry: '互联网',
    companySize: '10000+',
    location: '北京',
    jobTitle: 'UI设计师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 22000,
    salaryMax: 40000,
    requirements: [
      { id: 'req-1', skill: 'UI设计', level: 'expert', weight: 40 },
      { id: 'req-2', skill: 'Figma/Sketch', level: 'expert', weight: 25 },
      { id: 'req-3', skill: '设计规范', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '动效设计', level: 'moderate', weight: 15 }
    ],
    description: '负责抖音产品的UI设计',
    responsibilities: [
      '设计产品界面',
      '制定设计规范',
      '优化视觉体验'
    ],
    benefits: ['六险一金', '免费三餐', '年度体检', '团建']
  },
  {
    id: 'proj-027',
    companyName: '腾讯',
    industry: '互联网',
    companySize: '10000+',
    location: '深圳',
    jobTitle: 'UX设计师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 26000,
    salaryMax: 45000,
    requirements: [
      { id: 'req-1', skill: '用户研究', level: 'expert', weight: 35 },
      { id: 'req-2', skill: 'UX设计', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '原型设计', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '可用性测试', level: 'moderate', weight: 15 }
    ],
    description: '负责微信产品的用户体验设计',
    responsibilities: [
      '进行用户研究',
      '设计交互流程',
      '优化用户体验'
    ],
    benefits: ['六险一金', '免费班车', '年度旅游', '员工俱乐部']
  },
  {
    id: 'proj-028',
    companyName: '美团',
    industry: '本地生活',
    companySize: '10000+',
    location: '北京',
    jobTitle: '交互设计师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 4,
    salaryMin: 24000,
    salaryMax: 42000,
    requirements: [
      { id: 'req-1', skill: '交互设计', level: 'expert', weight: 40 },
      { id: 'req-2', skill: '原型设计', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '用户体验', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '协作沟通', level: 'moderate', weight: 10 }
    ],
    description: '负责美团App的交互设计',
    responsibilities: [
      '设计交互流程',
      '制作产品原型',
      '与产品团队协作'
    ],
    benefits: ['五险一金', '餐补', '年度体检', '团建']
  },
  {
    id: 'proj-029',
    companyName: '小红书',
    industry: '社交电商',
    companySize: '1000-9999',
    location: '上海',
    jobTitle: '品牌设计师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 24000,
    salaryMax: 42000,
    requirements: [
      { id: 'req-1', skill: '品牌设计', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '视觉设计', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '创意设计', level: 'strong', weight: 20 },
      { id: 'req-4', skill: 'Adobe全家桶', level: 'strong', weight: 15 }
    ],
    description: '负责小红书品牌视觉设计',
    responsibilities: [
      '设计品牌视觉',
      '制作营销素材',
      '维护品牌调性'
    ],
    benefits: ['五险一金', '餐补', '年度体检', '员工活动']
  },
  {
    id: 'proj-030',
    companyName: '网易',
    industry: '游戏',
    companySize: '10000+',
    location: '杭州',
    jobTitle: '游戏美术设计师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 26000,
    salaryMax: 45000,
    requirements: [
      { id: 'req-1', skill: '游戏美术', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '3D建模', level: 'strong', weight: 30 },
      { id: 'req-3', skill: '原画设计', level: 'strong', weight: 20 },
      { id: 'req-4', skill: 'Unity', level: 'moderate', weight: 15 }
    ],
    description: '负责网易游戏的美术设计',
    responsibilities: [
      '设计游戏角色',
      '创建游戏场景',
      '制作游戏特效'
    ],
    benefits: ['五险一金', '餐补', '游戏福利', '年度旅游']
  },
  // 运营类岗位 (10个)
  {
    id: 'proj-031',
    companyName: '抖音',
    industry: '短视频',
    companySize: '10000+',
    location: '北京',
    jobTitle: '内容运营',
    jobType: 'full-time',
    experienceMin: 1,
    experienceMax: 3,
    salaryMin: 18000,
    salaryMax: 30000,
    requirements: [
      { id: 'req-1', skill: '内容策划', level: 'strong', weight: 30 },
      { id: 'req-2', skill: '文案写作', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '数据分析', level: 'moderate', weight: 25 },
      { id: 'req-4', skill: '热点追踪', level: 'strong', weight: 20 }
    ],
    description: '负责抖音平台内容运营',
    responsibilities: [
      '策划内容选题',
      '撰写内容文案',
      '分析数据优化'
    ],
    benefits: ['六险一金', '免费三餐', '年度体检', '团建']
  },
  {
    id: 'proj-032',
    companyName: '微博',
    industry: '社交媒体',
    companySize: '1000-9999',
    location: '北京',
    jobTitle: '用户运营',
    jobType: 'full-time',
    experienceMin: 1,
    experienceMax: 3,
    salaryMin: 16000,
    salaryMax: 28000,
    requirements: [
      { id: 'req-1', skill: '用户运营', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '社群管理', level: 'strong', weight: 30 },
      { id: 'req-3', skill: '活动策划', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '沟通能力', level: 'strong', weight: 15 }
    ],
    description: '负责微博用户运营和社群管理',
    responsibilities: [
      '维护用户社群',
      '策划用户活动',
      '处理用户反馈'
    ],
    benefits: ['五险一金', '餐补', '年度体检', '团建']
  },
  {
    id: 'proj-033',
    companyName: '快手',
    industry: '短视频',
    companySize: '1000-9999',
    location: '北京',
    jobTitle: '增长运营',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 4,
    salaryMin: 22000,
    salaryMax: 38000,
    requirements: [
      { id: 'req-1', skill: '用户增长', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '数据分析', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '活动运营', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '渠道推广', level: 'moderate', weight: 15 }
    ],
    description: '负责快手用户增长运营',
    responsibilities: [
      '制定增长策略',
      '策划拉新活动',
      '分析增长数据'
    ],
    benefits: ['六险一金', '免费三餐', '租房补贴', '年度旅游']
  },
  {
    id: 'proj-034',
    companyName: '淘宝',
    industry: '电子商务',
    companySize: '10000+',
    location: '杭州',
    jobTitle: '商家运营',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 4,
    salaryMin: 20000,
    salaryMax: 35000,
    requirements: [
      { id: 'req-1', skill: '商家管理', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '沟通协调', level: 'expert', weight: 25 },
      { id: 'req-3', skill: '数据分析', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '电商知识', level: 'moderate', weight: 15 }
    ],
    description: '负责淘宝商家运营和管理',
    responsibilities: [
      '维护商家关系',
      '解决商家问题',
      '推动商家成长'
    ],
    benefits: ['五险一金', '住房补贴', '餐补', '股票期权']
  },
  {
    id: 'proj-035',
    companyName: 'B站',
    industry: '视频',
    companySize: '1000-9999',
    location: '上海',
    jobTitle: '社区运营',
    jobType: 'full-time',
    experienceMin: 1,
    experienceMax: 3,
    salaryMin: 18000,
    salaryMax: 30000,
    requirements: [
      { id: 'req-1', skill: '社区管理', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '内容审核', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '用户沟通', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '社区氛围', level: 'moderate', weight: 15 }
    ],
    description: '负责B站社区运营和氛围维护',
    responsibilities: [
      '管理社区秩序',
      '审核社区内容',
      '维护社区氛围'
    ],
    benefits: ['五险一金', '餐补', '年度体检', '二次元福利']
  },
  {
    id: 'proj-036',
    companyName: '小红书',
    industry: '社交电商',
    companySize: '1000-9999',
    location: '上海',
    jobTitle: '电商运营',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 4,
    salaryMin: 22000,
    salaryMax: 38000,
    requirements: [
      { id: 'req-1', skill: '电商运营', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '数据分析', level: 'strong', weight: 30 },
      { id: 'req-3', skill: '活动策划', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '商品管理', level: 'moderate', weight: 15 }
    ],
    description: '负责小红书电商业务运营',
    responsibilities: [
      '运营电商活动',
      '管理商品上架',
      '优化销售数据'
    ],
    benefits: ['五险一金', '餐补', '年度体检', '员工活动']
  },
  {
    id: 'proj-037',
    companyName: '知乎',
    industry: '问答社区',
    companySize: '500-999',
    location: '北京',
    jobTitle: '知识运营',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 4,
    salaryMin: 20000,
    salaryMax: 35000,
    requirements: [
      { id: 'req-1', skill: '内容运营', level: 'expert', weight: 30 },
      { id: 'req-2', skill: '知识领域', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '作者运营', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '数据分析', level: 'moderate', weight: 20 }
    ],
    description: '负责知乎知识内容运营',
    responsibilities: [
      '挖掘优质内容',
      '维护作者关系',
      '优化知识生态'
    ],
    benefits: ['五险一金', '餐补', '年度体检', '团建']
  },
  {
    id: 'proj-038',
    companyName: '抖音',
    industry: '短视频',
    companySize: '10000+',
    location: '北京',
    jobTitle: '直播运营',
    jobType: 'full-time',
    experienceMin: 1,
    experienceMax: 3,
    salaryMin: 20000,
    salaryMax: 35000,
    requirements: [
      { id: 'req-1', skill: '直播运营', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '活动策划', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '数据分析', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '沟通能力', level: 'moderate', weight: 15 }
    ],
    description: '负责抖音直播业务运营',
    responsibilities: [
      '策划直播活动',
      '管理直播流程',
      '分析直播数据'
    ],
    benefits: ['六险一金', '免费三餐', '年度体检', '团建']
  },
  {
    id: 'proj-039',
    companyName: '美团',
    industry: '本地生活',
    companySize: '10000+',
    location: '北京',
    jobTitle: '商家拓展',
    jobType: 'full-time',
    experienceMin: 1,
    experienceMax: 3,
    salaryMin: 18000,
    salaryMax: 32000,
    requirements: [
      { id: 'req-1', skill: '商务谈判', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '客户开发', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '销售能力', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '市场分析', level: 'moderate', weight: 15 }
    ],
    description: '负责美团商家拓展和签约',
    responsibilities: [
      '开发新商家',
      '商务谈判签约',
      '维护商家关系'
    ],
    benefits: ['五险一金', '餐补', '年度体检', '团建']
  },
  {
    id: 'proj-040',
    companyName: '携程',
    industry: '旅游',
    companySize: '1000-9999',
    location: '上海',
    jobTitle: '产品运营',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 4,
    salaryMin: 20000,
    salaryMax: 35000,
    requirements: [
      { id: 'req-1', skill: '产品运营', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '数据分析', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '功能迭代', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '用户反馈', level: 'moderate', weight: 15 }
    ],
    description: '负责携程产品运营和优化',
    responsibilities: [
      '推动产品迭代',
      '分析用户数据',
      '收集用户反馈'
    ],
    benefits: ['五险一金', '旅游补贴', '年度体检', '团建']
  },
  // 职能类岗位 (10个)
  {
    id: 'proj-041',
    companyName: '字节跳动',
    industry: '互联网',
    companySize: '10000+',
    location: '北京',
    jobTitle: '人力资源专员',
    jobType: 'full-time',
    experienceMin: 1,
    experienceMax: 3,
    salaryMin: 16000,
    salaryMax: 28000,
    requirements: [
      { id: 'req-1', skill: '招聘', level: 'expert', weight: 35 },
      { id: 'req-2', skill: 'HR知识', level: 'strong', weight: 30 },
      { id: 'req-3', skill: '沟通能力', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '办公软件', level: 'moderate', weight: 15 }
    ],
    description: '负责人力资源招聘和日常管理',
    responsibilities: [
      '招聘人才',
      '员工入职管理',
      'HR日常工作'
    ],
    benefits: ['六险一金', '免费三餐', '年度体检', '团建']
  },
  {
    id: 'proj-042',
    companyName: '阿里巴巴',
    industry: '电子商务',
    companySize: '10000+',
    location: '杭州',
    jobTitle: '财务分析',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 25000,
    salaryMax: 45000,
    requirements: [
      { id: 'req-1', skill: '财务分析', level: 'expert', weight: 35 },
      { id: 'req-2', skill: 'Excel', level: 'expert', weight: 25 },
      { id: 'req-3', skill: '财务知识', level: 'expert', weight: 25 },
      { id: 'req-4', skill: '数据分析', level: 'moderate', weight: 15 }
    ],
    description: '负责财务数据分析和报告',
    responsibilities: [
      '财务数据分析',
      '编制财务报告',
      '预算管理'
    ],
    benefits: ['五险一金', '住房补贴', '餐补', '股票期权']
  },
  {
    id: 'proj-043',
    companyName: '腾讯',
    industry: '互联网',
    companySize: '10000+',
    location: '深圳',
    jobTitle: '法务专员',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 4,
    salaryMin: 25000,
    salaryMax: 42000,
    requirements: [
      { id: 'req-1', skill: '法律知识', level: 'expert', weight: 40 },
      { id: 'req-2', skill: '合同审查', level: 'strong', weight: 30 },
      { id: 'req-3', skill: '合规管理', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '沟通能力', level: 'moderate', weight: 10 }
    ],
    description: '负责公司法律事务和合规管理',
    responsibilities: [
      '审查合同',
      '处理法律事务',
      '合规管理'
    ],
    benefits: ['六险一金', '免费班车', '年度旅游', '员工俱乐部']
  },
  {
    id: 'proj-044',
    companyName: '美团',
    industry: '本地生活',
    companySize: '10000+',
    location: '北京',
    jobTitle: '市场专员',
    jobType: 'full-time',
    experienceMin: 1,
    experienceMax: 3,
    salaryMin: 18000,
    salaryMax: 30000,
    requirements: [
      { id: 'req-1', skill: '市场推广', level: 'strong', weight: 35 },
      { id: 'req-2', skill: '活动策划', level: 'strong', weight: 30 },
      { id: 'req-3', skill: '文案写作', level: 'moderate', weight: 20 },
      { id: 'req-4', skill: '数据分析', level: 'moderate', weight: 15 }
    ],
    description: '负责市场推广和品牌活动',
    responsibilities: [
      '策划市场活动',
      '执行推广计划',
      '分析市场数据'
    ],
    benefits: ['五险一金', '餐补', '年度体检', '团建']
  },
  {
    id: 'proj-045',
    companyName: '京东',
    industry: '电子商务',
    companySize: '10000+',
    location: '北京',
    jobTitle: '行政专员',
    jobType: 'full-time',
    experienceMin: 1,
    experienceMax: 3,
    salaryMin: 15000,
    salaryMax: 25000,
    requirements: [
      { id: 'req-1', skill: '行政管理', level: 'strong', weight: 35 },
      { id: 'req-2', skill: '办公软件', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '沟通协调', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '活动组织', level: 'moderate', weight: 15 }
    ],
    description: '负责公司行政事务和办公管理',
    responsibilities: [
      '日常行政工作',
      '办公环境管理',
      '组织公司活动'
    ],
    benefits: ['六险一金', '住房补贴', '餐补', '股票']
  },
  {
    id: 'proj-046',
    companyName: '网易',
    industry: '游戏',
    companySize: '10000+',
    location: '杭州',
    jobTitle: '品牌经理',
    jobType: 'full-time',
    experienceMin: 3,
    experienceMax: 6,
    salaryMin: 30000,
    salaryMax: 50000,
    requirements: [
      { id: 'req-1', skill: '品牌管理', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '市场营销', level: 'strong', weight: 30 },
      { id: 'req-3', skill: '创意策划', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '数据分析', level: 'moderate', weight: 15 }
    ],
    description: '负责网易游戏品牌管理和营销',
    responsibilities: [
      '制定品牌策略',
      '策划营销活动',
      '维护品牌形象'
    ],
    benefits: ['五险一金', '餐补', '游戏福利', '年度旅游']
  },
  {
    id: 'proj-047',
    companyName: '滴滴',
    industry: '出行',
    companySize: '1000-9999',
    location: '北京',
    jobTitle: '公共关系',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 25000,
    salaryMax: 45000,
    requirements: [
      { id: 'req-1', skill: '媒体关系', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '危机公关', level: 'strong', weight: 30 },
      { id: 'req-3', skill: '文案写作', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '沟通能力', level: 'strong', weight: 15 }
    ],
    description: '负责公司公共关系和媒体沟通',
    responsibilities: [
      '维护媒体关系',
      '处理危机公关',
      '发布新闻稿'
    ],
    benefits: ['六险一金', '住房补贴', '车补', '年度体检']
  },
  {
    id: 'proj-048',
    companyName: '蚂蚁集团',
    industry: '金融科技',
    companySize: '10000+',
    location: '杭州',
    jobTitle: '风控专员',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 4,
    salaryMin: 25000,
    salaryMax: 42000,
    requirements: [
      { id: 'req-1', skill: '风险控制', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '数据分析', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '金融知识', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '合规管理', level: 'moderate', weight: 15 }
    ],
    description: '负责金融风险控制和合规管理',
    responsibilities: [
      '风险识别评估',
      '制定风控策略',
      '合规检查'
    ],
    benefits: ['六险一金', '住房补贴', '餐补', '股票期权']
  },
  {
    id: 'proj-049',
    companyName: '小米',
    industry: '智能硬件',
    companySize: '10000+',
    location: '北京',
    jobTitle: '采购专员',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 4,
    salaryMin: 20000,
    salaryMax: 35000,
    requirements: [
      { id: 'req-1', skill: '采购管理', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '供应商管理', level: 'strong', weight: 30 },
      { id: 'req-3', skill: '谈判能力', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '成本控制', level: 'moderate', weight: 15 }
    ],
    description: '负责公司采购和供应商管理',
    responsibilities: [
      '采购物资',
      '管理供应商',
      '控制采购成本'
    ],
    benefits: ['五险一金', '产品折扣', '年度体检', '团建']
  },
  {
    id: 'proj-050',
    companyName: '华为',
    industry: '通信',
    companySize: '10000+',
    location: '深圳',
    jobTitle: '项目经理',
    jobType: 'full-time',
    experienceMin: 3,
    experienceMax: 6,
    salaryMin: 35000,
    salaryMax: 60000,
    requirements: [
      { id: 'req-1', skill: '项目管理', level: 'expert', weight: 35 },
      { id: 'req-2', skill: 'PMP', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '团队管理', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '风险控制', level: 'moderate', weight: 15 }
    ],
    description: '负责华为通信项目的管理和交付',
    responsibilities: [
      '项目计划制定',
      '团队协调管理',
      '项目交付把控'
    ],
    benefits: ['六险一金', '住房补贴', '年终奖', '股票']
  },
  // 应届生/实习生岗位 (10个)
  {
    id: 'proj-051',
    companyName: '字节跳动',
    industry: '互联网',
    companySize: '10000+',
    location: '北京',
    jobTitle: '前端开发实习生',
    jobType: 'internship',
    experienceMin: 0,
    experienceMax: 1,
    salaryMin: 15000,
    salaryMax: 25000,
    requirements: [
      { id: 'req-1', skill: 'HTML/CSS', level: 'strong', weight: 30 },
      { id: 'req-2', skill: 'JavaScript', level: 'strong', weight: 30 },
      { id: 'req-3', skill: 'React/Vue', level: 'moderate', weight: 25 },
      { id: 'req-4', skill: '学习能力', level: 'strong', weight: 15 }
    ],
    description: '参与抖音前端项目开发，学习大厂技术栈',
    responsibilities: [
      '协助开发前端功能',
      '参与代码审查',
      '学习前沿技术'
    ],
    benefits: ['实习证明', '餐补', '导师带教', '转正机会']
  },
  {
    id: 'proj-052',
    companyName: '阿里巴巴',
    industry: '电子商务',
    companySize: '10000+',
    location: '杭州',
    jobTitle: '后端开发应届生',
    jobType: 'full-time',
    experienceMin: 0,
    experienceMax: 1,
    salaryMin: 20000,
    salaryMax: 35000,
    requirements: [
      { id: 'req-1', skill: 'Java/Python', level: 'strong', weight: 35 },
      { id: 'req-2', skill: 'SQL', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '计算机基础', level: 'expert', weight: 25 },
      { id: 'req-4', skill: '英语能力', level: 'moderate', weight: 15 }
    ],
    description: '加入淘宝技术团队，参与核心系统开发',
    responsibilities: [
      '参与系统开发',
      '编写技术文档',
      '学习业务知识'
    ],
    benefits: ['六险一金', '住房补贴', '导师计划', '股票期权']
  },
  {
    id: 'proj-053',
    companyName: '腾讯',
    industry: '互联网',
    companySize: '10000+',
    location: '深圳',
    jobTitle: '产品经理实习生',
    jobType: 'internship',
    experienceMin: 0,
    experienceMax: 1,
    salaryMin: 12000,
    salaryMax: 20000,
    requirements: [
      { id: 'req-1', skill: '需求分析', level: 'moderate', weight: 30 },
      { id: 'req-2', skill: '文档撰写', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '数据分析', level: 'basic', weight: 25 },
      { id: 'req-4', skill: '沟通能力', level: 'strong', weight: 20 }
    ],
    description: '参与微信产品设计，学习产品方法论',
    responsibilities: [
      '协助需求收集',
      '制作产品原型',
      '参与用户研究'
    ],
    benefits: ['实习证明', '免费班车', '导师指导', '转正机会']
  },
  {
    id: 'proj-054',
    companyName: '百度',
    industry: '人工智能',
    companySize: '10000+',
    location: '北京',
    jobTitle: '算法工程师应届生',
    jobType: 'full-time',
    experienceMin: 0,
    experienceMax: 1,
    salaryMin: 28000,
    salaryMax: 45000,
    requirements: [
      { id: 'req-1', skill: '机器学习', level: 'strong', weight: 35 },
      { id: 'req-2', skill: 'Python', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '数学基础', level: 'expert', weight: 25 },
      { id: 'req-4', skill: '英语阅读', level: 'strong', weight: 10 }
    ],
    description: '加入百度AI团队，从事算法研发',
    responsibilities: [
      '参与算法研发',
      '论文研读复现',
      '模型调优迭代'
    ],
    benefits: ['六险一金', '租房补贴', '年度体检', '培训机会']
  },
  {
    id: 'proj-055',
    companyName: '美团',
    industry: '本地生活',
    companySize: '10000+',
    location: '北京',
    jobTitle: '数据分析师实习生',
    jobType: 'internship',
    experienceMin: 0,
    experienceMax: 1,
    salaryMin: 12000,
    salaryMax: 20000,
    requirements: [
      { id: 'req-1', skill: 'SQL', level: 'strong', weight: 35 },
      { id: 'req-2', skill: 'Python', level: 'moderate', weight: 25 },
      { id: 'req-3', skill: 'Excel', level: 'expert', weight: 25 },
      { id: 'req-4', skill: '统计学', level: 'moderate', weight: 15 }
    ],
    description: '参与美团大数据分析，掌握数据分析技能',
    responsibilities: [
      '数据清洗整理',
      '报表制作',
      '参与数据分析项目'
    ],
    benefits: ['实习证明', '餐补', '导师带教', '转正机会']
  },
  {
    id: 'proj-056',
    companyName: '京东',
    industry: '电子商务',
    companySize: '10000+',
    location: '北京',
    jobTitle: '测试工程师应届生',
    jobType: 'full-time',
    experienceMin: 0,
    experienceMax: 1,
    salaryMin: 18000,
    salaryMax: 30000,
    requirements: [
      { id: 'req-1', skill: '测试理论', level: 'strong', weight: 30 },
      { id: 'req-2', skill: '测试用例设计', level: 'strong', weight: 25 },
      { id: 'req-3', skill: 'Python/Java', level: 'moderate', weight: 25 },
      { id: 'req-4', skill: '缺陷管理', level: 'moderate', weight: 20 }
    ],
    description: '加入京东质量保障团队，学习测试技术',
    responsibilities: [
      '编写测试用例',
      '执行测试任务',
      '提交缺陷报告'
    ],
    benefits: ['六险一金', '住房补贴', '餐补', '股票']
  },
  {
    id: 'proj-057',
    companyName: '网易',
    industry: '游戏',
    companySize: '10000+',
    location: '杭州',
    jobTitle: '游戏策划实习生',
    jobType: 'internship',
    experienceMin: 0,
    experienceMax: 1,
    salaryMin: 10000,
    salaryMax: 18000,
    requirements: [
      { id: 'req-1', skill: '游戏理解', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '文案写作', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '数值分析', level: 'moderate', weight: 25 },
      { id: 'req-4', skill: '沟通协作', level: 'moderate', weight: 15 }
    ],
    description: '参与网易热门游戏策划，学习游戏设计',
    responsibilities: [
      '协助玩法设计',
      '编写策划文档',
      '参与游戏测试'
    ],
    benefits: ['实习证明', '餐补', '游戏福利', '转正机会']
  },
  {
    id: 'proj-058',
    companyName: '小红书',
    industry: '社交电商',
    companySize: '1000-9999',
    location: '上海',
    jobTitle: 'UI设计应届生',
    jobType: 'full-time',
    experienceMin: 0,
    experienceMax: 1,
    salaryMin: 18000,
    salaryMax: 30000,
    requirements: [
      { id: 'req-1', skill: 'UI设计', level: 'strong', weight: 35 },
      { id: 'req-2', skill: 'Figma/Sketch', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '设计理论', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '审美能力', level: 'strong', weight: 15 }
    ],
    description: '加入小红书设计团队，参与产品设计',
    responsibilities: [
      '设计产品界面',
      '制作设计稿',
      '参与设计评审'
    ],
    benefits: ['五险一金', '餐补', '年度体检', '员工活动']
  },
  {
    id: 'proj-059',
    companyName: '快手',
    industry: '短视频',
    companySize: '1000-9999',
    location: '北京',
    jobTitle: '内容运营实习生',
    jobType: 'internship',
    experienceMin: 0,
    experienceMax: 1,
    salaryMin: 8000,
    salaryMax: 15000,
    requirements: [
      { id: 'req-1', skill: '文案写作', level: 'strong', weight: 30 },
      { id: 'req-2', skill: '热点追踪', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '数据分析', level: 'basic', weight: 25 },
      { id: 'req-4', skill: '沟通能力', level: 'strong', weight: 20 }
    ],
    description: '参与快手内容运营，学习短视频运营技巧',
    responsibilities: [
      '策划内容选题',
      '撰写文案',
      '分析数据'
    ],
    benefits: ['实习证明', '免费三餐', '租房补贴', '转正机会']
  },
  {
    id: 'proj-060',
    companyName: '蚂蚁集团',
    industry: '金融科技',
    companySize: '10000+',
    location: '杭州',
    jobTitle: '安全工程师应届生',
    jobType: 'full-time',
    experienceMin: 0,
    experienceMax: 1,
    salaryMin: 22000,
    salaryMax: 38000,
    requirements: [
      { id: 'req-1', skill: '网络安全', level: 'strong', weight: 35 },
      { id: 'req-2', skill: '操作系统', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '编程能力', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '学习能力', level: 'strong', weight: 15 }
    ],
    description: '加入蚂蚁安全团队，学习金融安全技术',
    responsibilities: [
      '参与安全测试',
      '学习安全技术',
      '协助安全审计'
    ],
    benefits: ['六险一金', '住房补贴', '餐补', '股票期权']
  },
  // 金融、量化交易、游戏开发、社交媒体运营、行政、人事、运维岗位 (7个)
  {
    id: 'proj-061',
    companyName: '招商证券',
    industry: '金融',
    companySize: '10000+',
    location: '深圳',
    jobTitle: '金融科技开发工程师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 30000,
    salaryMax: 50000,
    requirements: [
      { id: 'req-1', skill: 'Java', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '金融知识', level: 'strong', weight: 30 },
      { id: 'req-3', skill: 'SQL', level: 'expert', weight: 20 },
      { id: 'req-4', skill: '风控系统', level: 'moderate', weight: 15 }
    ],
    description: '负责证券交易系统的开发和维护',
    responsibilities: [
      '开发金融交易系统',
      '维护系统稳定性',
      '参与需求评审'
    ],
    benefits: ['六险一金', '年终奖金', '培训机会', '职业发展']
  },
  {
    id: 'proj-062',
    companyName: '量化私募',
    industry: '金融',
    companySize: '50-200',
    location: '上海',
    jobTitle: '量化交易研究员',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 40000,
    salaryMax: 80000,
    requirements: [
      { id: 'req-1', skill: 'Python', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '数学建模', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '金融工程', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '数据分析', level: 'strong', weight: 15 }
    ],
    description: '开发和优化量化交易策略',
    responsibilities: [
      '开发量化策略',
      '回测策略效果',
      '优化交易算法'
    ],
    benefits: ['六险一金', '绩效奖金', '期权激励', '弹性工作']
  },
  {
    id: 'proj-063',
    companyName: '腾讯游戏',
    industry: '游戏',
    companySize: '10000+',
    location: '深圳',
    jobTitle: '游戏开发工程师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 35000,
    salaryMax: 60000,
    requirements: [
      { id: 'req-1', skill: 'C++', level: 'expert', weight: 40 },
      { id: 'req-2', skill: '游戏引擎', level: 'strong', weight: 30 },
      { id: 'req-3', skill: 'Unreal Engine', level: 'strong', weight: 20 },
      { id: 'req-4', skill: 'Lua', level: 'moderate', weight: 10 }
    ],
    description: '负责腾讯游戏核心玩法开发',
    responsibilities: [
      '开发游戏核心功能',
      '优化游戏性能',
      '与策划团队协作'
    ],
    benefits: ['六险一金', '游戏福利', '年度旅游', '免费班车']
  },
  {
    id: 'proj-064',
    companyName: '微博',
    industry: '社交媒体',
    companySize: '1000-9999',
    location: '北京',
    jobTitle: '社交媒体运营',
    jobType: 'full-time',
    experienceMin: 1,
    experienceMax: 3,
    salaryMin: 20000,
    salaryMax: 35000,
    requirements: [
      { id: 'req-1', skill: '内容运营', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '热点追踪', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '数据分析', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '文案写作', level: 'strong', weight: 15 }
    ],
    description: '负责微博平台热点内容运营',
    responsibilities: [
      '策划热点内容',
      '运营官方账号',
      '分析运营数据'
    ],
    benefits: ['五险一金', '餐补', '年度体检', '团建活动']
  },
  {
    id: 'proj-065',
    companyName: '字节跳动',
    industry: '互联网',
    companySize: '10000+',
    location: '北京',
    jobTitle: '行政主管',
    jobType: 'full-time',
    experienceMin: 3,
    experienceMax: 6,
    salaryMin: 25000,
    salaryMax: 40000,
    requirements: [
      { id: 'req-1', skill: '行政管理', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '办公管理', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '活动组织', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '沟通协调', level: 'strong', weight: 15 }
    ],
    description: '负责公司行政事务管理',
    responsibilities: [
      '管理办公环境',
      '组织公司活动',
      '协调行政事务'
    ],
    benefits: ['六险一金', '免费三餐', '年度体检', '团建']
  },
  {
    id: 'proj-066',
    companyName: '阿里巴巴',
    industry: '电子商务',
    companySize: '10000+',
    location: '杭州',
    jobTitle: '人力资源经理',
    jobType: 'full-time',
    experienceMin: 3,
    experienceMax: 6,
    salaryMin: 30000,
    salaryMax: 50000,
    requirements: [
      { id: 'req-1', skill: '招聘管理', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '员工关系', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '绩效评估', level: 'strong', weight: 25 },
      { id: 'req-4', skill: 'HR战略', level: 'moderate', weight: 15 }
    ],
    description: '负责人力资源管理和团队建设',
    responsibilities: [
      '招聘优秀人才',
      '管理员工绩效',
      '推动企业文化'
    ],
    benefits: ['六险一金', '住房补贴', '餐补', '股票期权']
  },
  {
    id: 'proj-067',
    companyName: '美团',
    industry: '本地生活',
    companySize: '10000+',
    location: '北京',
    jobTitle: 'DevOps运维工程师',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 28000,
    salaryMax: 48000,
    requirements: [
      { id: 'req-1', skill: 'Linux', level: 'expert', weight: 30 },
      { id: 'req-2', skill: 'Kubernetes', level: 'strong', weight: 25 },
      { id: 'req-3', skill: 'CI/CD', level: 'strong', weight: 25 },
      { id: 'req-4', skill: '监控告警', level: 'strong', weight: 20 }
    ],
    description: '负责美团基础设施运维和自动化',
    responsibilities: [
      '维护基础设施',
      '优化运维流程',
      '保障系统稳定'
    ],
    benefits: ['五险一金', '餐补', '年度体检', '团建']
  },
  // 金融领域岗位 (4个)
  {
    id: 'proj-068',
    companyName: '沪深交易所',
    industry: '金融',
    companySize: '1000-9999',
    location: '上海',
    jobTitle: '交易所交易系统产品经理',
    jobType: 'full-time',
    experienceMin: 3,
    experienceMax: 6,
    salaryMin: 35000,
    salaryMax: 60000,
    requirements: [
      { id: 'req-1', skill: '交易系统', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '保证金', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '风控', level: 'expert', weight: 25 },
      { id: 'req-4', skill: '金融衍生品', level: 'strong', weight: 15 }
    ],
    description: '负责交易所核心交易系统产品设计，涵盖保证金管理、合约交易、风控体系',
    responsibilities: [
      '设计交易系统功能',
      '优化保证金机制',
      '完善风控规则'
    ],
    benefits: ['六险一金', '年终奖金', '培训机会', '职业发展']
  },
  {
    id: 'proj-069',
    companyName: '量化科技公司',
    industry: '金融',
    companySize: '200-500',
    location: '杭州',
    jobTitle: '量化交易平台产品经理',
    jobType: 'full-time',
    experienceMin: 2,
    experienceMax: 5,
    salaryMin: 30000,
    salaryMax: 55000,
    requirements: [
      { id: 'req-1', skill: '量化交易', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '策略回测', level: 'strong', weight: 25 },
      { id: 'req-3', skill: '数据可视化', level: 'strong', weight: 20 },
      { id: 'req-4', skill: 'API设计', level: 'moderate', weight: 20 }
    ],
    description: '负责量化交易平台和工具产品设计，支持策略开发和实盘交易',
    responsibilities: [
      '设计量化工具',
      '优化回测系统',
      '对接交易接口'
    ],
    benefits: ['六险一金', '绩效奖金', '期权激励', '弹性工作']
  },
  {
    id: 'proj-070',
    companyName: '跨境支付公司',
    industry: '金融',
    companySize: '500-1000',
    location: '深圳',
    jobTitle: '跨境清结算产品经理',
    jobType: 'full-time',
    experienceMin: 3,
    experienceMax: 6,
    salaryMin: 32000,
    salaryMax: 58000,
    requirements: [
      { id: 'req-1', skill: '清结算', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '跨境支付', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '外汇管理', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '合规', level: 'strong', weight: 15 }
    ],
    description: '负责跨境支付和清结算系统产品设计，支持多币种多通道',
    responsibilities: [
      '设计清结算流程',
      '对接海外支付通道',
      '优化资金调度'
    ],
    benefits: ['六险一金', '年终奖金', '海外出差', '职业发展']
  },
  {
    id: 'proj-071',
    companyName: '金融科技公司',
    industry: '金融',
    companySize: '1000-9999',
    location: '北京',
    jobTitle: '金融风控合规产品经理',
    jobType: 'full-time',
    experienceMin: 3,
    experienceMax: 6,
    salaryMin: 30000,
    salaryMax: 55000,
    requirements: [
      { id: 'req-1', skill: '风控系统', level: 'expert', weight: 35 },
      { id: 'req-2', skill: '合规', level: 'expert', weight: 30 },
      { id: 'req-3', skill: '反洗钱', level: 'strong', weight: 20 },
      { id: 'req-4', skill: '数据分析', level: 'strong', weight: 15 }
    ],
    description: '负责金融风控与合规系统设计，满足监管要求和风险控制',
    responsibilities: [
      '设计风控规则',
      '完善合规体系',
      '优化反洗钱系统'
    ],
    benefits: ['六险一金', '年终奖金', '培训机会', '健康体检']
  }
]

export const getProjectsByIndustry = (industry: string): Project[] => {
  return mockProjects.filter(p => p.industry === industry)
}

export const getProjectsByJobType = (jobType: string): Project[] => {
  return mockProjects.filter(p => p.jobType === jobType)
}

export const searchProjects = (keyword: string): Project[] => {
  const lowerKeyword = keyword.toLowerCase()
  return mockProjects.filter(p => 
    p.jobTitle.toLowerCase().includes(lowerKeyword) ||
    p.companyName.toLowerCase().includes(lowerKeyword) ||
    p.industry.toLowerCase().includes(lowerKeyword) ||
    p.requirements.some(r => r.skill.toLowerCase().includes(lowerKeyword))
  )
}
