'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Network, Loader2, Upload, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Resume {
  id: string
  user_id: string
  talent_data: string
  status: string
  created_at: string
}

export default function GraphEntryPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [resumes, setResumes] = useState<Resume[]>([])

  useEffect(() => {
    if (!session) {
      setLoading(false)
      return
    }

    const fetchResumes = async () => {
      try {
        const res = await fetch('/api/resumes')
        const data = await res.json()
        if (data.resumes) {
          setResumes(data.resumes)
          
          // 智能判断逻辑
          if (data.resumes.length === 0) {
            // 无简历 - 保持在当前页面显示demo和上传提示
            setLoading(false)
          } else if (data.resumes.length === 1) {
            // 只有1份简历 - 直接跳转
            router.push(`/graph/${data.resumes[0].id}`)
          } else {
            // 多份简历 - 显示列表
            setLoading(false)
          }
        }
      } catch (error) {
        console.error('获取简历列表失败:', error)
        setLoading(false)
      }
    }

    fetchResumes()
  }, [session, router])

  if (loading) {
    return (
      <div className="py-16 text-center">
        <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary-500" />
        <p className="text-slate-400">正在加载...</p>
      </div>
    )
  }

  // 未登录状态
  if (!session) {
    return (
      <div className="py-16 text-center">
        <Network className="w-16 h-16 mx-auto mb-4 text-slate-600" />
        <h2 className="text-2xl font-bold mb-2">人才图谱</h2>
        <p className="text-slate-400 mb-6">请先登录后查看您的人才图谱</p>
        <Link
          href="/login"
          className="px-6 py-3 bg-primary-500 rounded-lg text-white hover:bg-primary-600 transition-colors"
        >
          立即登录
        </Link>
      </div>
    )
  }

  // 无简历状态 - 显示Demo和上传提示
  if (resumes.length === 0) {
    return (
      <div className="py-8">
        <div className="text-center mb-8">
          <Network className="w-16 h-16 mx-auto mb-4 text-primary-500" />
          <h2 className="text-2xl font-bold mb-2">人才图谱</h2>
          <p className="text-slate-400">可视化展示您的能力结构和项目经验</p>
        </div>

        {/* Demo 展示 */}
        <div className="rounded-2xl bg-slate-800/30 border border-slate-700 p-6 mb-8 opacity-75">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">👤 示例：张小明</h3>
            <span className="px-3 py-1 rounded-full bg-slate-700 text-slate-400 text-sm">Demo 数据</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-900/50">
              <p className="text-3xl font-bold text-primary-400 mb-1">8</p>
              <p className="text-slate-400 text-sm">核心能力</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50">
              <p className="text-3xl font-bold text-accent-400 mb-1">4</p>
              <p className="text-slate-400 text-sm">项目经验</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50">
              <p className="text-3xl font-bold text-green-400 mb-1">6年</p>
              <p className="text-slate-400 text-sm">从业经验</p>
            </div>
          </div>
        </div>

        {/* 上传提示 */}
        <div className="rounded-2xl bg-primary-500/10 border border-primary-500/30 p-8 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-primary-400" />
          <h3 className="text-xl font-semibold mb-2">您还没有上传简历</h3>
          <p className="text-slate-400 mb-6">上传简历后，AI 将为您生成专属的人才能力图谱</p>
          <Link
            href="/converter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 rounded-lg text-white hover:bg-primary-600 transition-colors"
          >
            <FileText className="w-4 h-4" />
            上传简历生成图谱
          </Link>
        </div>
      </div>
    )
  }

  // 多份简历状态 - 显示列表选择
  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <Network className="w-16 h-16 mx-auto mb-4 text-primary-500" />
        <h2 className="text-2xl font-bold mb-2">选择要查看的人才图谱</h2>
        <p className="text-slate-400">您有 {resumes.length} 份简历，请选择要查看的图谱</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resumes.map((resume) => {
          let talentData
          try {
            talentData = JSON.parse(resume.talent_data)
          } catch {
            talentData = null
          }
          
          const name = talentData?.identity?.name || '未知'
          const role = talentData?.identity?.role || '未识别职位'
          const createdAt = new Date(resume.created_at).toLocaleString('zh-CN', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })

          return (
            <button
              key={resume.id}
              onClick={() => router.push(`/graph/${resume.id}`)}
              className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700 hover:border-primary-500/50 hover:bg-slate-800/50 transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-primary-400 transition-colors" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{name}</h3>
              <p className="text-slate-400 text-sm mb-3">{role}</p>
              <p className="text-slate-500 text-xs">创建于 {createdAt}</p>
            </button>
          )
        })}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/converter"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-600 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
        >
          <Upload className="w-4 h-4" />
          上传新简历
        </Link>
      </div>
    </div>
  )
}
