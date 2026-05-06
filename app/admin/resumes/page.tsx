'use client'

import AdminLayout from '@/components/AdminLayout'
import { Search, Eye, Check, X, Clock, User } from 'lucide-react'
import { useState } from 'react'

interface Resume {
  id: string
  userName: string
  userEmail: string
  identityName: string
  status: 'pending' | 'approved' | 'rejected'
  aiProvider: 'deepseek' | 'openai'
  createdAt: string
}

const mockResumes: Resume[] = [
  { id: '1', userName: '张三', userEmail: 'zhangsan@example.com', identityName: '前端开发工程师', status: 'approved', aiProvider: 'deepseek', createdAt: '2024-01-15 10:30' },
  { id: '2', userName: '李四', userEmail: 'lisi@example.com', identityName: '产品经理', status: 'pending', aiProvider: 'deepseek', createdAt: '2024-01-15 09:20' },
  { id: '3', userName: '王五', userEmail: 'wangwu@example.com', identityName: '后端架构师', status: 'approved', aiProvider: 'openai', createdAt: '2024-01-14 16:45' },
  { id: '4', userName: '赵六', userEmail: 'zhaoliu@example.com', identityName: 'UI设计师', status: 'rejected', aiProvider: 'deepseek', createdAt: '2024-01-14 14:10' },
  { id: '5', userName: '钱七', userEmail: 'qianqi@example.com', identityName: '数据分析师', status: 'pending', aiProvider: 'openai', createdAt: '2024-01-13 11:00' },
]

export default function ResumesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredResumes = mockResumes.filter(resume => {
    const matchesSearch = resume.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resume.identityName.toLowerCase().includes(searchTerm.toLowerCase())
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

      {/* 搜索和筛选 */}
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

      {/* 简历列表 */}
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
            {filteredResumes.map((resume) => {
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
                  <td className="px-6 py-4 font-medium text-gray-800">{resume.identityName}</td>
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
                      {resume.status === 'pending' && (
                        <>
                          <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <Check className="w-4 h-4 inline mr-1" />
                            通过
                          </button>
                          <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <X className="w-4 h-4 inline mr-1" />
                            拒绝
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* 分页 */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">共 {filteredResumes.length} 条记录</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">上一页</button>
            <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50">下一页</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
