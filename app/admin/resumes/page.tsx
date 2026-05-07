'use client'

import AdminLayout from '@/components/AdminLayout'
import { Search, Eye, Check, X, Clock, User } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Resume {
  id: string
  userName: string
  userEmail: string
  identityName: string
  status: 'pending' | 'approved' | 'rejected'
  aiProvider: string
  createdAt: string
}

export default function ResumesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const res = await fetch('/api/admin/resumes')
      const data = await res.json()
      setResumes(data.resumes || [])
    } catch (error) {
      console.error('Failed to fetch resumes:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredResumes = resumes.filter(resume => {
    const matchesSearch = resume.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resume.identityName || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || resume.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusInfo = (status: Resume['status']) => {
    switch (status) {
      case 'pending':
        return { label: '待审核', color: 'bg-yellow-100 text-yellow-700', icon: Clock }
      case 'approved':
        return { label: '已通过', color: 'bg-green-100 text-green-700', icon: Check }
      case 'rejected':
        return { label: '已拒绝', color: 'bg-red-100 text-red-700', icon: X }
    }
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">简历管理</h1>
        <p className="text-gray-500 mt-1">审核和管理用户提交的简历</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索简历..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">全部状态</option>
            <option value="pending">待审核</option>
            <option value="approved">已通过</option>
            <option value="rejected">已拒绝</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">提交用户</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">职位身份</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">AI服务商</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">状态</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">提交时间</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">加载中...</td>
              </tr>
            ) : filteredResumes.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">暂无简历数据</td>
              </tr>
            ) : (
              filteredResumes.map((resume) => {
                const statusInfo = getStatusInfo(resume.status)
                const StatusIcon = statusInfo.icon
                return (
                  <tr key={resume.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {resume.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {resume.userName}
                          </p>
                          <p className="text-sm text-gray-500">{resume.userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">{resume.identityName || '未命名'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        resume.aiProvider === 'deepseek' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {resume.aiProvider === 'deepseek' ? 'DeepSeek' : 'OpenAI'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{resume.createdAt}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 inline mr-1" />
                          查看
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">共 {filteredResumes.length} 条记录</p>
        </div>
      </div>
    </AdminLayout>
  )
}
