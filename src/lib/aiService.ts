import OpenAI from 'openai'

export type AIProvider = 'openai' | 'deepseek'

export type ProgressCallback = (step: string) => void

export interface AIConfig {
  provider: AIProvider
  apiKey: string
  baseURL: string
  model: string
}

export interface AIResponse {
  success: boolean
  content: string
  provider: AIProvider
  error?: string
}

const providers: Record<AIProvider, AIConfig> = {
  openai: {
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY || '',
    baseURL: process.env.OPENAI_API_BASE_URL || 'https://api.openai.com/v1',
    model: 'gpt-4o-mini'
  },
  deepseek: {
    provider: 'deepseek',
    apiKey: process.env.DEEPSEEK_API_KEY || '',
    baseURL: process.env.DEEPSEEK_API_BASE_URL || 'https://api.deepseek.com/v1',
    model: 'deepseek-chat'
  }
}

let currentProvider: AIProvider = (process.env.DEFAULT_AI_PROVIDER as AIProvider) || 'deepseek'

export function setAIProvider(provider: AIProvider): void {
  if (providers[provider]) {
    currentProvider = provider
  }
}

export function getCurrentProvider(): AIProvider {
  return currentProvider
}

export function getAIProviders(): AIProvider[] {
  return Object.keys(providers) as AIProvider[]
}

export function getProviderConfig(provider: AIProvider): AIConfig {
  return providers[provider]
}

export async function callAI(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  provider?: AIProvider
): Promise<AIResponse> {
  const selectedProvider = provider || currentProvider
  const config = providers[selectedProvider]

  if (!config.apiKey) {
    return {
      success: false,
      content: '',
      provider: selectedProvider,
      error: `${selectedProvider} API Key 未配置`
    }
  }

  try {
    const client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL,
      timeout: 60000
    })

    console.log(`[AI Service] Calling ${selectedProvider} with model ${config.model}`)
    console.log(`[AI Service] API Key: ${config.apiKey.substring(0, 5)}...${config.apiKey.substring(-5)}`)
    console.log(`[AI Service] Base URL: ${config.baseURL}`)

    const startTime = Date.now()
    const response = await client.chat.completions.create({
      model: config.model,
      messages,
      temperature: 0.7,
      max_tokens: 4000
    })
    const endTime = Date.now()

    console.log(`[AI Service] Response received in ${endTime - startTime}ms`)

    const content = response.choices[0]?.message?.content || ''

    return {
      success: true,
      content,
      provider: selectedProvider
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '未知错误'
    console.error(`[AI Service] Error calling ${selectedProvider}:`, errorMessage)
    
    if (error instanceof Error) {
      console.error(`[AI Service] Error stack:`, error.stack)
    }
    
    return {
      success: false,
      content: '',
      provider: selectedProvider,
      error: errorMessage
    }
  }
}

export async function processResume(
  resumeText: string, 
  provider?: AIProvider,
  onProgress?: ProgressCallback
): Promise<AIResponse> {
  const steps = [
    '正在理解简历结构...',
    '提取个人信息...',
    '识别工作经历...',
    '分析技术能力...',
    '整理项目经验...',
    '计算能力强度...',
    '生成人才图谱...'
  ]
  
  let currentStep = 0
  const progressInterval = setInterval(() => {
    if (currentStep < steps.length - 1) {
      currentStep++
      onProgress?.(steps[currentStep])
    }
  }, 7000)
  
  onProgress?.(steps[0])
  
  const prompt = `你是一个严格的JSON生成器。
输入的简历内容：
${resumeText}

你必须输出一个符合以下格式的纯JSON对象，不要输出任何其他内容：

{"identity":{"name":"姓名","role":"职位","location":"城市","availability":"open","preferences":["远程"],"totalExperienceYears":5},"capabilities":[{"id":"cap-1","name":"技能名","level":"expert","category":"技术能力","evidenceIds":["evi-1"],"description":"描述","strength":80,"years":5,"projectCount":3,"qualityScore":7}],"evidence":[{"id":"evi-1","type":"company","title":"职位","organization":"公司","period":"2020-01 ~ 2023-06","description":"工作描述","capabilities":["技能名"],"durationYears":3,"impactScore":8}],"boundaries":{"strong":["优势1"],"moderate":["中等"],"weak":["待提升"],"collaboration":["协作条件"]},"matching":{"idealProjects":["项目类型"],"avoidProjects":[],"independenceLevel":"独立","riskFactors":[]}}

重要规则：
1. 所有字符串必须用双引号
2. 数组最后一个元素后不能有逗号
3. 所有字段必须填写，不能为空
4. 直接输出JSON，不要任何markdown代码块标记
5. 数组内不要嵌套数组
  `.trim()

  try {
    const result = await callAI([
      { role: 'system', content: '你是一位专业的人才分析师，严格按照给定的JSON Schema和规则将简历转换为结构化数据，特别注意计算每个能力的强度值(strength)、年限(years)、项目数(projectCount)和质量评分(qualityScore)。输出必须是纯JSON。' },
      { role: 'user', content: prompt }
    ], provider)
    
    clearInterval(progressInterval)
    onProgress?.('解析完成！')
    
    return result
  } catch (error) {
    clearInterval(progressInterval)
    throw error
  }
}

export async function analyzeMatching(
  talentData: string,
  projectRequirement: string,
  provider?: AIProvider
): Promise<AIResponse> {
  const prompt = `
你是一位专业的人才匹配分析师。请根据以下人才数据和项目需求，进行匹配分析。

人才数据：
${talentData}

项目需求：
${projectRequirement}

请输出严格的 JSON 格式分析报告：
{
  "overallScore": 85,
  "strengths": [
    { "capability": "能力名称", "evidence": "证据说明" }
  ],
  "gaps": ["缺口1", "缺口2"],
  "risks": ["风险1", "风险2"],
  "recommendation": "highly-recommended|recommended|consider|not-recommended",
  "collaborationSuggestion": "合作建议",
  "detailedAnalysis": "详细分析"
}

评分标准：
- 80分以上：强烈推荐
- 60-79分：推荐
- 40-59分：考虑
- 40分以下：不推荐

输出必须是纯 JSON，不要包含其他文字。
  `.trim()

  return callAI([
    { role: 'system', content: '你是一位专业的人才匹配分析师，擅长评估人才与项目的匹配度。' },
    { role: 'user', content: prompt }
  ], provider)
}
