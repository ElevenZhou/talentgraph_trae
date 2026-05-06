import { useNavigate } from 'react-router-dom';
import { ArrowRight, Upload, Network, GitBranch, Shield } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Upload,
      title: 'AI 简历转换',
      description: '一键上传传统简历，AI 自动解析并转换为结构化的人才能力图谱'
    },
    {
      icon: Network,
      title: '能力可视化',
      description: '三层放射状图谱展示：身份核心 → 能力圈 → 项目证据圈 → 边界评估'
    },
    {
      icon: GitBranch,
      title: 'AI 自动匹配',
      description: '项目 Agent 自动读取人才图谱，根据项目需求完成初步匹配评估'
    },
    {
      icon: Shield,
      title: '隐私优先',
      description: '默认隐藏联系方式，匹配完成后才授权交换。AI 访问全程可追溯'
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
          <span className="text-primary-400 text-sm font-medium">面向 AI Agent 时代的人才市场</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
            职场引力场
          </span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-slate-300 mb-4 font-light">
          TalentGraph · AI 原生人才图谱与项目匹配平台
        </p>

        <p className="text-xl text-primary-400 mb-12 font-medium">
          让人才不再投递，让项目主动靠近
        </p>

        <button
          onClick={() => navigate('/converter')}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl text-white font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 glow"
        >
          开始体验
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-primary-500/30 transition-all hover:bg-slate-800/50 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          );
        })}
      </div>

      <div className="relative rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-8 md:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-center">从一页简历，到能力宇宙</h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">过去</div>
              <div className="text-slate-400 space-y-2">
                <p>人写简历</p>
                <p>HR 搜关键词</p>
                <p>候选人海投</p>
                <p>大量错配</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-dashed border-primary-500/30" />
              </div>
              <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-500 text-white font-bold">
                →
              </div>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-accent-400 mb-2">现在</div>
              <div className="text-slate-400 space-y-2">
                <p>AI 理解项目</p>
                <p>AI 理解能力</p>
                <p>AI 自动匹配</p>
                <p>精准对接</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-16">
        <p className="text-slate-500 text-lg mb-6">
          传统简历是给人类 HR 快速浏览的<br />
          新时代简历应该同时给人类和 AI Agent 理解
        </p>
        <button
          onClick={() => navigate('/converter')}
          className="inline-flex items-center gap-2 px-6 py-3 border border-primary-500/50 rounded-xl text-primary-400 hover:bg-primary-500/10 transition-all"
        >
          立即开始构建你的人才图谱
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
