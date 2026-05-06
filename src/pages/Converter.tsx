import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Loader2, Key, Eye } from 'lucide-react';
import { useTalentStore } from '../store/talentStore';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs`;

export default function Converter() {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const { processResume, isProcessing, error, setApiKey, apiKey, currentTalent } = useTalentStore();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map((item: any) => item.str).join(' ') + '\n';
      }
      setResumeText(fullText);
    } else {
      const text = await file.text();
      setResumeText(text);
    }
  };

  const handleProcess = async () => {
    if (apiKeyInput) {
      setApiKey(apiKeyInput);
    }
    await processResume(resumeText, apiKeyInput || apiKey);
  };

  const handleViewGraph = () => {
    if (currentTalent) {
      navigate(`/graph/${currentTalent.id}`);
    }
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">简历转换器</h1>
        <p className="text-slate-400">把传统简历转化为 AI 可读的人才能力图谱</p>
      </div>

      <div className="mb-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
        <div className="flex items-center gap-3 mb-3">
          <Key className="w-5 h-5 text-primary-400" />
          <span className="font-medium">OpenAI API Key 配置</span>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="输入你的 OpenAI API Key，处理时会使用..."
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 focus:border-primary-500 focus:outline-none pr-12"
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          🔒 Key 仅在浏览器本地使用，不会发送到任何第三方服务器（除了 OpenAI 官方 API）
        </p>
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
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="在这里粘贴你的简历内容，或者上传 PDF 文件..."
            className="w-full h-96 px-4 py-4 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-primary-500 focus:outline-none resize-none font-mono text-sm leading-relaxed"
          />

          <button
            onClick={handleProcess}
            disabled={!resumeText.trim() || isProcessing}
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

          {currentTalent ? (
            <div className="h-96 overflow-auto rounded-xl bg-slate-800/50 border border-slate-700 p-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-600">
                  <h3 className="text-primary-400 font-semibold mb-2">👤 身份核心</h3>
                  <p className="text-xl font-bold">{currentTalent.identity.name}</p>
                  <p className="text-slate-400">{currentTalent.identity.role}</p>
                  <p className="text-slate-500 text-sm">{currentTalent.identity.location}</p>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-600">
                  <h3 className="text-accent-400 font-semibold mb-2">⚡ 核心能力 ({currentTalent.capabilities.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentTalent.capabilities.slice(0, 8).map((cap) => (
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
                    <p><span className="text-green-400">✓ 擅长：</span>{currentTalent.boundaries.strong.slice(0, 2).join('、')}</p>
                    <p><span className="text-yellow-400">◐ 一般：</span>{currentTalent.boundaries.moderate.slice(0, 2).join('、')}</p>
                    <p><span className="text-red-400">✗ 不适合：</span>{currentTalent.boundaries.weak.slice(0, 2).join('、')}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-96 rounded-xl bg-slate-800/50 border border-slate-700 border-dashed flex items-center justify-center">
              <div className="text-center text-slate-500">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>解析结果将在这里显示</p>
                <p className="text-sm mt-1">左侧粘贴简历后点击「开始解析」</p>
              </div>
            </div>
          )}

          {currentTalent && (
            <button
              onClick={handleViewGraph}
              className="w-full mt-4 py-3 rounded-xl border border-primary-500/50 text-primary-400 font-semibold hover:bg-primary-500/10 transition-all flex items-center justify-center gap-2"
            >
              🕸️ 查看人才图谱可视化 →
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 p-6 rounded-xl bg-slate-800/30 border border-slate-700">
        <h3 className="font-semibold mb-3 text-lg">💡 解析示例（无需 API Key 也可以看效果）</h3>
        <p className="text-slate-400 text-sm mb-4">
          你可以直接查看预置的人才图谱示例，了解最终效果。
        </p>
        <button
          onClick={() => navigate('/graph/demo')}
          className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
        >
          查看 Demo 图谱
        </button>
      </div>
    </div>
  );
}
