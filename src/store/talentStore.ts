import { create } from 'zustand';
import { TalentGraphData, MatchingResult } from '../types';

interface TalentState {
  currentTalent: TalentGraphData | null;
  matchingResult: MatchingResult | null;
  isProcessing: boolean;
  apiKey: string;
  error: string | null;
  
  setApiKey: (key: string) => void;
  setCurrentTalent: (talent: TalentGraphData) => void;
  setProcessing: (processing: boolean) => void;
  setError: (error: string | null) => void;
  setMatchingResult: (result: MatchingResult | null) => void;
  processResume: (resumeText: string, apiKey?: string) => Promise<void>;
  analyzeMatching: (projectRequirement: string, apiKey?: string) => Promise<void>;
}

const processResumeWithAI = async (resumeText: string, apiKey: string): Promise<TalentGraphData> => {
  const OpenAI = (await import('openai')).default;
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `你是专业的人才图谱分析师。请将简历转换为AI可读的结构化人才图谱。
输出JSON格式，包含以下结构：
{
  "identity": {
    "name": "姓名",
    "role": "当前职位/角色定位",
    "location": "所在城市",
    "availability": "looking|open|not-looking",
    "preferences": ["求职偏好1", "偏好2"]
  },
  "capabilities": [
    {
      "id": "cap-xxx",
      "name": "能力名称",
      "level": "expert|strong|moderate|basic",
      "category": "技术|管理|业务|协作",
      "evidenceIds": ["evi-xxx"],
      "description": "具体能力描述"
    }
  ],
  "evidence": [
    {
      "id": "evi-xxx",
      "type": "company|project|education|certificate|portfolio",
      "title": "职位/项目名称",
      "organization": "公司/学校",
      "period": "时间",
      "description": "详细描述",
      "capabilities": ["能力1", "能力2"],
      "links": []
    }
  ],
  "boundaries": {
    "strong": ["核心强项"],
    "moderate": ["有经验但不精通"],
    "weak": ["缺乏经验或不擅长"],
    "collaboration": ["需要的协作条件"]
  },
  "matching": {
    "idealProjects": ["适合的项目类型"],
    "avoidProjects": ["不适合的项目类型"],
    "independenceLevel": "独立负责程度描述",
    "riskFactors": ["潜在风险点"]
  }
}

重要：每个能力必须有对应的证据。重点分析能力边界，不仅要说擅长什么，还要说不擅长什么。`
      },
      { role: 'user', content: resumeText }
    ]
  });

  const result = JSON.parse(completion.choices[0].message.content || '{}');
  
  return {
    id: 'talent-' + Date.now(),
    ...result,
    rawResume: resumeText,
    createdAt: new Date(),
    agentMeta: {
      accessToken: 'token-' + Math.random().toString(36).substr(2, 9),
      permissionScope: ['read', 'match', 'evaluate'],
      instructions: 'Evaluate fit only within authorized context. Do not expose private contact information.',
      humanViewUrl: window.location.origin + '/graph/' + 'talent-' + Date.now() + '?view=human',
      agentProfileUrl: window.location.origin + '/graph/' + 'talent-' + Date.now() + '?view=agent',
      structuredJsonUrl: window.location.origin + '/graph/' + 'talent-' + Date.now() + '?view=json'
    }
  };
};

const analyzeMatchingWithAI = async (
  talent: TalentGraphData,
  projectRequirement: string,
  apiKey: string
): Promise<MatchingResult> => {
  const OpenAI = (await import('openai')).default;
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `你是专业的项目匹配分析师。请根据人才图谱和项目需求进行精准匹配分析。
输出JSON格式：
{
  "overallScore": 0-100分数,
  "strengths": [{"capability": "匹配的能力", "evidence": "对应证据"}],
  "gaps": ["能力缺口1", "缺口2"],
  "risks": ["风险点1"],
  "recommendation": "highly-recommended|recommended|consider|not-recommended",
  "collaborationSuggestion": "建议的合作方式",
  "detailedAnalysis": "详细匹配分析文字描述"
}
要客观、有依据，每个判断都要对应简历中的实际证据。`
      },
      {
        role: 'user',
        content: `人才信息：${JSON.stringify(talent)}
项目需求：${projectRequirement}`
      }
    ]
  });

  return JSON.parse(completion.choices[0].message.content || '{}');
};

export const useTalentStore = create<TalentState>((set, get) => ({
  currentTalent: null,
  matchingResult: null,
  isProcessing: false,
  apiKey: '',
  error: null,

  setApiKey: (key) => set({ apiKey: key }),
  setCurrentTalent: (talent) => set({ currentTalent: talent }),
  setProcessing: (processing) => set({ isProcessing: processing }),
  setError: (error) => set({ error }),
  setMatchingResult: (result) => set({ matchingResult: result }),

  processResume: async (resumeText, apiKey) => {
    const key = apiKey || get().apiKey;
    if (!key) {
      set({ error: '请先配置 OpenAI API Key' });
      return;
    }

    set({ isProcessing: true, error: null });
    try {
      const talent = await processResumeWithAI(resumeText, key);
      set({ currentTalent: talent, isProcessing: false });
    } catch (err) {
      set({ error: (err as Error).message, isProcessing: false });
    }
  },

  analyzeMatching: async (projectRequirement, apiKey) => {
    const { currentTalent } = get();
    if (!currentTalent) return;

    const key = apiKey || get().apiKey;
    if (!key) {
      set({ error: '请先配置 OpenAI API Key' });
      return;
    }

    set({ isProcessing: true, error: null });
    try {
      const result = await analyzeMatchingWithAI(currentTalent, projectRequirement, key);
      set({ matchingResult: result, isProcessing: false });
    } catch (err) {
      set({ error: (err as Error).message, isProcessing: false });
    }
  }
}));
