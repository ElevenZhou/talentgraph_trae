import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, GitCompare, ThumbsUp, AlertTriangle, ThumbsDown, Target, CheckCircle } from 'lucide-react';
import { useTalentStore } from '../store/talentStore';

const demoTalent = {
  id: 'demo',
  identity: { name: '张小明', role: 'AI 产品经理', location: '北京' },
  capabilities: [
    { id: 'cap-1', name: '需求分析', level: 'expert', category: '产品', evidenceIds: [], description: '' },
    { id: 'cap-2', name: 'AI 产品设计', level: 'strong', category: '产品', evidenceIds: [], description: '' },
  ],
  evidence: [],
  boundaries: { strong: [], moderate: [], weak: [], collaboration: [] },
  matching: { idealProjects: [], avoidProjects: [], independenceLevel: '', riskFactors: [] },
  agentMeta: { accessToken: '', permissionScope: [], instructions: '', humanViewUrl: '', agentProfileUrl: '', structuredJsonUrl: '' },
  rawResume: '',
  createdAt: new Date()
};

export default function Matching() {
  const { id } = useParams();
  const { currentTalent, analyzeMatching, matchingResult, isProcessing, error, apiKey } = useTalentStore();
  const [projectRequirement, setProjectRequirement] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');

  const talent = id === 'demo' ? demoTalent : currentTalent;

  const handleAnalyze = () => {
    analyzeMatching(projectRequirement, apiKeyInput || apiKey);
  };

  const runDemoAnalysis = () => {
    setTimeout(() => {
      useTalentStore.getState().setMatchingResult({
        overallScore: 85,
        strengths: [
          { capability: 'AI 产品设计经验', evidence: '有 RAG 知识库和 Agent 工作流的实际设计经验' },
          { capability: '需求分析能力', evidence: '多年 B 端产品从 0 到 1 经验' },
          { capability: '跨团队协作', evidence: '具备产研团队沟通协调能力' }
        ],
        gaps: [
          '缺少 SaaS 商业化直接经验',
          '团队管理经验相对较少'
        ],
        risks: [
          '需要较强的技术团队支持',
          '大规模高并发场景经验有待验证'
        ],
        recommendation: 'highly-recommended',
        collaborationSuggestion: '建议作为产品负责人加入，配备资深研发合伙人。重点关注商业化模块的能力补足。',
        detailedAnalysis: '候选人在 AI 应用产品设计方面有明确的项目证据，特别是 RAG 知识库场景有实际落地经验。需求分析和跨团队协作是核心强项。整体匹配度高，适合作为核心产品负责人加入早期 AI 创业团队。'
      });
    }, 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRecLabel = (rec: string) => {
    const labels: Record<string, string> = {
      'highly-recommended': '强烈推荐',
      'recommended': '推荐',
      'consider': '考虑',
      'not-recommended': '不推荐'
    };
    return labels[rec] || rec;
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">智能匹配分析</h1>
          <p className="text-slate-400">输入项目需求，AI 自动评估人才匹配度</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Target className="w-4 h-4" />
          评估对象：{talent?.identity.name}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700">
            <label className="block mb-2 text-sm text-slate-400">OpenAI API Key（可选，也可以看 Demo）</label>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="输入 API Key 进行真实分析"
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700">
            <label className="block mb-3 font-medium">📋 项目需求描述</label>
            <textarea
              value={projectRequirement}
              onChange={(e) => setProjectRequirement(e.target.value)}
              placeholder="详细描述你的项目需求，例如：&#10;&#10;我们正在寻找一位 AI 产品负责人加入早期创业团队。&#10;需要：&#10;- 有 LLM 应用产品经验&#10;- 能独立负责产品线&#10;- 了解 RAG 和 Agent 相关技术&#10;- 早期团队心态"
              className="w-full h-48 px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 focus:border-primary-500 focus:outline-none resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAnalyze}
              disabled={!projectRequirement || isProcessing}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  AI 分析中...
                </>
              ) : (
                <>
                  <GitCompare className="w-5 h-5" />
                  开始匹配分析
                </>
              )}
            </button>
            <button
              onClick={runDemoAnalysis}
              disabled={isProcessing}
              className="px-6 py-3 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700/50 transition-colors"
            >
              运行 Demo
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              ❌ {error}
            </div>
          )}
        </div>

        <div>
          {matchingResult ? (
            <div className="rounded-2xl bg-slate-800/30 border border-slate-700 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1">匹配分析报告</h3>
                    <p className="text-sm text-slate-400">基于人才图谱和项目需求</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-4xl font-bold ${getScoreColor(matchingResult.overallScore)}`}>
                      {matchingResult.overallScore}
                    </div>
                    <div className="text-xs text-slate-500">整体匹配度</div>
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  {getRecLabel(matchingResult.recommendation)}
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-green-400 mb-3">
                    <ThumbsUp className="w-4 h-4" />
                    匹配优势
                  </h4>
                  <div className="space-y-2">
                    {matchingResult.strengths.map((s, i) => (
                      <div key={i} className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <p className="font-medium text-green-300">{s.capability}</p>
                        <p className="text-sm text-slate-400 mt-1">📌 {s.evidence}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-yellow-400 mb-3">
                    <AlertTriangle className="w-4 h-4" />
                    能力缺口
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchingResult.gaps.map((gap, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm">
                        {gap}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-red-400 mb-3">
                    <ThumbsDown className="w-4 h-4" />
                    风险提示
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchingResult.risks.map((risk, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                        ⚠️ {risk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-600">
                  <h4 className="font-semibold text-primary-400 mb-2">💡 合作建议</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {matchingResult.collaborationSuggestion}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-accent-500/10 border border-accent-500/20">
                  <h4 className="font-semibold text-accent-400 mb-2">📝 详细分析</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {matchingResult.detailedAnalysis}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[500px] rounded-2xl bg-slate-800/30 border border-slate-700 border-dashed flex items-center justify-center">
              <div className="text-center text-slate-500">
                <GitCompare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>匹配分析结果将在这里显示</p>
                <p className="text-sm mt-1">左侧输入项目需求后点击「开始分析」</p>
                <p className="text-sm mt-2">或点击「运行 Demo」查看示例效果</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
