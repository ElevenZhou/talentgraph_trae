'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { GitCompare, Loader2, Upload, FileText, ArrowRight, Sparkles, Briefcase, GraduationCap } from 'lucide-react'
import Link from 'next/link'

interface Resume {
  id: string
  user_id: string
  talent_data: string
  status: string
  created_at: string
}

const demoEntries = [
  { href: '/matching/demo-product', icon: Sparkles, title: 'AI 产品经理', desc: '适合产品、AI 应用、B 端工具岗位体验' },
  { href: '/matching/demo-dev', icon: Briefcase, title: '全栈工程师', desc: '适合前端、全栈、工程化岗位体验' },
  { href: '/matching/demo-student', icon: GraduationCap, title: '应届/实习生', desc: '适合实习、初级产品和数据岗位体验' }
]

export default function MatchingEntryPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [resumes, setResumes] = useState<Resume[]>([])
  const [openingDemo, setOpeningDemo] = useState('')

  useEffect(() => {
    demoEntries.forEach((demo) => {
      router.prefetch(demo.href)
      router.prefetch(demo.href.replace('/matching/', '/graph/'))
    })
  }, [router])

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
            router.push(`/matching/${data.resumes[0].id}`)
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
      <div className="py-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl skeleton-shimmer" />
          <div className="h-8 w-48 mx-auto mb-3 rounded-lg skeleton-shimmer" />
          <div className="h-5 w-72 mx-auto rounded-lg skeleton-shimmer" />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="stagger-item p-6 rounded-2xl bg-slate-800/30 border border-slate-700"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl skeleton-shimmer" />
                <div className="w-5 h-5 rounded skeleton-shimmer" />
              </div>
              <div className="h-6 w-32 mb-3 rounded-lg skeleton-shimmer" />
              <div className="h-4 w-full rounded-lg skeleton-shimmer" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 未登录状态
  if (!session) {
    return (
      <div className="py-10">
        <div className="text-center mb-8">
          <GitCompare className="w-16 h-16 mx-auto mb-4 text-primary-500" />
          <h2 className="text-2xl font-bold mb-2">智能匹配</h2>
          <p className="text-slate-400">不用注册上传，先用 Demo 跑完整匹配闭环</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {demoEntries.map((demo, index) => {
            const Icon = demo.icon
            const isOpening = openingDemo === demo.href
            return (
              <Link
                key={demo.href}
                href={demo.href}
                onClick={() => setOpeningDemo(demo.href)}
                className={`stagger-item p-6 rounded-2xl border transition-all text-left group ${
                  isOpening
                    ? 'bg-primary-500/10 border-primary-400/70 shadow-[0_0_30px_rgba(56,189,248,0.18)] scale-[0.99]'
                    : 'bg-slate-800/30 border-slate-700 hover:border-primary-500/50 hover:bg-slate-800/50'
                }`}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {isOpening ? (
                    <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-primary-400 transition-colors" />
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-1">{demo.title}</h3>
                <p className="text-slate-400 text-sm">{isOpening ? '正在进入 Demo...' : demo.desc}</p>
              </Link>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary-500/50 rounded-xl text-primary-400 hover:bg-primary-500/10 transition-all"
          >
            登录后上传自己的简历
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  // 无简历状态 - 显示Demo和上传提示
  if (resumes.length === 0) {
    return (
      <div className="py-8">
        <div className="text-center mb-8">
          <GitCompare className="w-16 h-16 mx-auto mb-4 text-primary-500" />
          <h2 className="text-2xl font-bold mb-2">智能匹配</h2>
          <p className="text-slate-400">AI 智能分析您与项目的匹配度</p>
        </div>

        {/* Demo 展示 */}
        <div className="rounded-2xl bg-slate-800/30 border border-slate-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">🎯 先看 3 个完整 Demo</h3>
            <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-sm">无需上传</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {demoEntries.map((demo, index) => {
              const Icon = demo.icon
              const isOpening = openingDemo === demo.href
              return (
                <Link
                  key={demo.href}
                  href={demo.href}
                  onClick={() => setOpeningDemo(demo.href)}
                  className={`stagger-item p-4 rounded-xl transition-colors group ${
                    isOpening ? 'bg-primary-500/10 ring-1 ring-primary-400/60' : 'bg-slate-900/50 hover:bg-slate-900/80'
                  }`}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {isOpening ? <Loader2 className="w-5 h-5 text-primary-400 animate-spin" /> : <Icon className="w-5 h-5 text-primary-400" />}
                    <span className="font-medium group-hover:text-primary-400">{demo.title}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{isOpening ? '正在进入 Demo...' : demo.desc}</p>
                </Link>
              )
            })}
          </div>
        </div>

        {/* 上传提示 */}
        <div className="rounded-2xl bg-primary-500/10 border border-primary-500/30 p-8 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-primary-400" />
          <h3 className="text-xl font-semibold mb-2">您还没有上传简历</h3>
          <p className="text-slate-400 mb-6">上传简历后，AI 将为您生成智能匹配分析</p>
          <Link
            href="/converter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 rounded-lg text-white hover:bg-primary-600 transition-colors"
          >
            <FileText className="w-4 h-4" />
            上传简历开始匹配
          </Link>
        </div>
      </div>
    )
  }

  // 多份简历状态 - 显示列表选择
  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <GitCompare className="w-16 h-16 mx-auto mb-4 text-primary-500" />
        <h2 className="text-2xl font-bold mb-2">选择要分析的简历</h2>
        <p className="text-slate-400">您有 {resumes.length} 份简历，请选择要进行智能匹配分析的简历</p>
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
              onClick={() => router.push(`/matching/${resume.id}`)}
              className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700 hover:border-primary-500/50 hover:bg-slate-800/50 transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-400 to-primary-500 flex items-center justify-center">
                  <GitCompare className="w-6 h-6 text-white" />
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
