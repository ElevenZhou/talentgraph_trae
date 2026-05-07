'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { User, FileText, Calendar, Eye, RefreshCw, Trash2, ArrowRight, AlertCircle, Loader2, Pencil, Save, X } from 'lucide-react'
import { TalentGraphData } from '@/types'

interface ResumeRecord {
  id: string
  user_id: string
  title?: string | null
  talent_data: string
  status: string
  created_at: string
  updated_at?: string
}

export default function ProfilePage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [resumes, setResumes] = useState<ResumeRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedResume, setSelectedResume] = useState<TalentGraphData | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [savingTitleId, setSavingTitleId] = useState<string | null>(null)
  const [titleMessage, setTitleMessage] = useState<{ id: string; type: 'success' | 'error'; text: string } | null>(null)
  const [showRawResume, setShowRawResume] = useState(false)

  useEffect(() => {
    if (!session) {
      router.push('/login')
      return
    }
    fetchResumes()
  }, [session, router])

  const fetchResumes = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/resumes')
      const data = await res.json()
      if (data.resumes) {
        setResumes(data.resumes)
      }
    } catch (error) {
      console.error('获取简历列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewGraph = (id: string) => {
    router.push(`/graph/${id}`)
  }

  const handleViewDetail = (record: ResumeRecord) => {
    try {
      const talentData = JSON.parse(record.talent_data)
      setSelectedResume(talentData)
    } catch {
      console.error('解析简历数据失败')
    }
  }

  const formatResumeTitle = (record: ResumeRecord, talentData: TalentGraphData | null) => {
    if (record.title?.trim()) return record.title.trim()

    const importedAt = new Date(record.created_at).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/\//g, '-')

    return `${talentData?.identity?.name || '未命名人才'} ${importedAt}`
  }

  const startEditTitle = (record: ResumeRecord, talentData: TalentGraphData | null) => {
    setEditingId(record.id)
    setEditingTitle(formatResumeTitle(record, talentData))
    setTitleMessage(null)
  }

  const cancelEditTitle = () => {
    setEditingId(null)
    setEditingTitle('')
    setTitleMessage(null)
  }

  const saveTitle = async (id: string) => {
    const title = editingTitle.trim()
    if (!title) {
      setTitleMessage({ id, type: 'error', text: '简历名称不能为空' })
      return
    }

    setSavingTitleId(id)
    try {
      const res = await fetch(`/api/resumes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      const data = await res.json()
      if (!res.ok) {
        setTitleMessage({ id, type: 'error', text: data.error || '修改失败' })
        return
      }
      setResumes(prev => prev.map(record => (
        record.id === id ? { ...record, title: data.title } : record
      )))
      setEditingId(null)
      setEditingTitle('')
      setTitleMessage({ id, type: 'success', text: '简历名称已保存' })
      setTimeout(() => {
        setTitleMessage(current => current?.id === id ? null : current)
      }, 1800)
    } catch (error) {
      console.error('修改简历名称失败:', error)
      setTitleMessage({ id, type: 'error', text: '修改失败，请重试' })
    } finally {
      setSavingTitleId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这份简历吗？')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/resumes/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setResumes(prev => prev.filter(r => r.id !== id))
      }
    } catch (error) {
      console.error('删除失败:', error)
    } finally {
      setDeletingId(null)
    }
  }

  if (!session) {
    return (
      <div className="py-16 text-center">
        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h2 className="text-xl font-bold mb-4">请先登录</h2>
        <p className="text-slate-400 mb-6">登录后才能查看您的简历记录</p>
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-3 bg-primary-500 rounded-lg text-white hover:bg-primary-600 transition-colors"
        >
          立即登录
        </button>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">个人中心</h1>
          <p className="text-slate-400">管理您的简历记录和人才图谱</p>
        </div>
        <button
          onClick={() => router.push('/converter')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500/20 text-primary-400 hover:bg-primary-500/30 transition-colors"
        >
          <FileText className="w-4 h-4" />
          上传新简历
        </button>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl bg-slate-800/30 border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">📋 我的简历记录</h3>
            <button
              onClick={fetchResumes}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors text-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              刷新
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center">
              <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin text-primary-500" />
              <p className="text-slate-400">加载中...</p>
            </div>
          ) : resumes.length === 0 ? (
            <div className="py-16 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <h3 className="text-lg font-medium mb-2 text-slate-300">暂无简历记录</h3>
              <p className="text-slate-500 mb-6">还没有上传过简历，快去创建您的第一份人才图谱吧！</p>
              <button
                onClick={() => router.push('/converter')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:opacity-90 transition-all"
              >
                ✨ 开始创建人才图谱
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {resumes.map((record) => {
                let talentData: TalentGraphData | null = null
                try {
                  talentData = JSON.parse(record.talent_data)
                } catch {}
                const displayTitle = formatResumeTitle(record, talentData)
                const isEditing = editingId === record.id
                const canEditTitle = record.status !== 'demo'

                return (
                  <div
                    key={record.id}
                    className="p-4 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            {isEditing ? (
                              <div className="flex items-center gap-2">
                                <input
                                  value={editingTitle}
                                  onChange={(event) => setEditingTitle(event.target.value)}
                                  onKeyDown={(event) => {
                                    if (event.key === 'Enter') saveTitle(record.id)
                                    if (event.key === 'Escape') cancelEditTitle()
                                  }}
                                  maxLength={80}
                                  autoFocus
                                  className="w-full max-w-md rounded-lg border border-primary-500/50 bg-slate-950 px-3 py-1.5 text-sm text-slate-100 outline-none focus:border-primary-400"
                                />
                                <button
                                  onClick={() => saveTitle(record.id)}
                                  disabled={savingTitleId === record.id}
                                  className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 disabled:opacity-50"
                                  title="保存名称"
                                >
                                  {savingTitleId === record.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                </button>
                                <button
                                  onClick={cancelEditTitle}
                                  className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200"
                                  title="取消"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-slate-200 break-all">{displayTitle}</h4>
                                {canEditTitle && (
                                  <button
                                    onClick={() => startEditTitle(record, talentData)}
                                    className="p-1 rounded-md text-slate-500 hover:text-primary-400 hover:bg-primary-500/10 transition-colors"
                                    title="修改简历名称"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            )}
                            <p className="text-sm text-slate-500">
                              {talentData?.identity?.role || '暂无职位'} · {talentData?.identity?.location || '未知地点'}
                            </p>
                            {titleMessage?.id === record.id && (
                              <p className={`mt-1 text-xs ${titleMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {titleMessage.text}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {talentData && talentData.capabilities && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {talentData.capabilities.slice(0, 5).map((cap) => (
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
                            {talentData.capabilities.length > 5 && (
                              <span className="px-2 py-1 rounded text-xs bg-slate-700 text-slate-400">
                                +{talentData.capabilities.length - 5}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <div className="text-right text-sm text-slate-500 mr-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(record.created_at).toLocaleDateString('zh-CN')}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleViewDetail(record)}
                          className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                          title="查看简历详情"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleViewGraph(record.id)}
                          className="p-2 rounded-lg bg-primary-500/20 text-primary-400 hover:bg-primary-500/30 transition-colors"
                          title="查看人才图谱"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          disabled={deletingId === record.id}
                          className="p-2 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50"
                          title="删除"
                        >
                          {deletingId === record.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {selectedResume && (
          <div className="rounded-2xl bg-slate-800/30 border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">👤 简历详情</h3>
              <button
                onClick={() => setSelectedResume(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-600">
                <h4 className="text-primary-400 font-semibold mb-2">身份信息</h4>
                <p className="text-xl font-bold text-white">{selectedResume.identity.name}</p>
                <p className="text-slate-400">{selectedResume.identity.role}</p>
                <p className="text-slate-500 text-sm">{selectedResume.identity.location}</p>
                {selectedResume.identity.totalExperienceYears && (
                  <p className="text-slate-400 text-sm mt-1">
                    从业年限：{selectedResume.identity.totalExperienceYears}年
                  </p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-600">
                <h4 className="text-accent-400 font-semibold mb-2">能力概览</h4>
                <div className="space-y-2">
                  {selectedResume.capabilities?.slice(0, 4).map((cap) => (
                    <div key={cap.id} className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">{cap.name}</span>
                      <div className="flex items-center gap-2">
                        {cap.strength !== undefined && (
                          <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-400 to-yellow-400"
                              style={{ width: `${cap.strength}%` }}
                            />
                          </div>
                        )}
                        <span className="text-xs text-slate-500">
                          {cap.level === 'expert' ? '专家' : cap.level === 'strong' ? '熟练' : cap.level === 'moderate' ? '中等' : '基础'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-600">
                <h4 className="text-green-400 font-semibold mb-2">项目证据</h4>
                <div className="space-y-2">
                  {selectedResume.evidence?.slice(0, 3).map((evi) => (
                    <div key={evi.id} className="text-sm">
                      <p className="text-slate-300">{evi.title}</p>
                      <p className="text-slate-500 text-xs">{evi.organization} · {evi.period}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowRawResume(!showRawResume)}
                className="w-full py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700/50 transition-colors"
              >
                {showRawResume ? '🙈 隐藏简历原文' : '👁️ 查看简历原文'}
              </button>

              {showRawResume && (
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-600">
                  <h4 className="text-slate-400 font-semibold mb-2">📄 简历原文</h4>
                  <div className="max-h-60 overflow-auto bg-slate-900 p-3 rounded-lg font-mono text-xs text-slate-400 whitespace-pre-wrap">
                    {selectedResume.rawResume || '暂无原文'}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  handleViewGraph(selectedResume.id)
                  setSelectedResume(null)
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:opacity-90 transition-all"
              >
                🕸️ 查看人才图谱
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
