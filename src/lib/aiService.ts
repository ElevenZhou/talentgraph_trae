import OpenAI from 'openai'

export type AIProvider = 'openai' | 'deepseek'

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
    model: 'deepseek-v4-flash'
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
      baseURL: config.baseURL
    })

    const response = await client.chat.completions.create({
      model: config.model,
      messages,
      temperature: 0.7,
      max_tokens: 4000
    })

    const content = response.choices[0]?.message?.content || ''

    return {
      success: true,
      content,
      provider: selectedProvider
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '未知错误'
    return {
      success: false,
      content: '',
      provider: selectedProvider,
      error: errorMessage
    }
  }
}

export async function processResume(resumeText: string, provider?: AIProvider): Promise<AIResponse> {
  const prompt = `
你是一位专业的人才分析师，请将以下简历内容转换为结构化的人才图谱数据。

简历内容：
${resumeText}

请输出严格的 JSON 格式，包含以下字段：
{
  "identity": {
    "name": "姓名",
    "role": "职位",
    "location": "城市",
    "availability": "looking|open|not-looking",
    "preferences": ["偏好1", "偏好2"]
  },
  "capabilities": [
    {
      "id": "cap-xxx",
      "name": "能力名称",
      "level": "expert|strong|moderate|basic",
      "category": "分类",
      "evidenceIds": ["evi-xxx"],
      "description": "描述"
    }
  ],
  "evidence": [
    {
      "id": "evi-xxx",
      "type": "company|project|education|certificate|portfolio",
      "title": "标题",
      "organization": "组织",
      "period": "时间",
      "description": "描述",
      "capabilities": ["相关能力名称"]
    }
  ],
  "boundaries": {
    "strong": ["强项1", "强项2"],
    "moderate": ["中等1", "中等2"],
    "weak": ["弱项1", "弱项2"],
    "collaboration": ["协作条件"]
  },
  "matching": {
    "idealProjects": ["理想项目1"],
    "avoidProjects": ["避免项目1"],
    "independenceLevel": "独立程度描述",
    "riskFactors": ["风险1"]
  }
}

注意：
1. 所有字段都必须填写，不能为空
2. 能力等级：expert（精通）、strong（熟练）、moderate（一般）、basic（基础）
3. availability：looking（积极求职）、open（开放机会）、not-looking（暂不考虑）
4. 输出必须是纯 JSON，不要包含其他文字
  `.trim()

  return callAI([
    { role: 'system', content: '你是一位专业的人才分析师，擅长将简历转换为结构化数据。' },
    { role: 'user', content: prompt }
  ], provider)
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
