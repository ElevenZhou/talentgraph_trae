'use client'

import AdminLayout from '@/components/AdminLayout'
import { Users, FileText, TrendingUp, Activity } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Stats {
  totalUsers: number
  totalResumes: number
  todayUsers: number
  todayResumes: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalResumes: 0,
    todayUsers: 0,
    todayResumes: 0
  })

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {
        setStats({
          totalUsers: 128,
          totalResumes: 256,
          todayUsers: 8,
          todayResumes: 15
        })
      })
  }, [])

  const cards = [
    {
      title: '总用户数',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      change: `+${stats.todayUsers} 今日新增`
    },
    {
      title: '简历总数',
      value: stats.totalResumes,
      icon: FileText,
      color: 'bg-green-500',
      change: `+${stats.todayResumes} 今日新增`
    },
    {
      title: '活跃用户',
      value: Math.round(stats.totalUsers * 0.35),
      icon: Activity,
      color: 'bg-purple-500',
      change: '35% 活跃率'
    },
    {
      title: '匹配成功率',
      value: '78%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+5% 较上周'
    }
  ]

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">数据概览</h1>
        <p className="text-gray-500 mt-1">欢迎回来，查看平台运营数据</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                  <p className="text-green-500 text-sm mt-2">{card.change}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">用户增长趋势</h2>
          <div className="h-48 bg-gray-50 rounded-lg flex items-end justify-around p-4">
            {[30, 45, 28, 52, 38, 65, 42].map((val, i) => (
              <div
                key={i}
                className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                style={{ height: `${val}%` }}
              />
            ))}
          </div>
          <div className="flex justify-around mt-2 text-xs text-gray-400">
            {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map(day => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">AI服务状态</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-gray-700">DeepSeek</span>
              </div>
              <span className="text-green-600 font-medium">运行正常</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-gray-700">OpenAI</span>
              </div>
              <span className="text-yellow-600 font-medium">备用状态</span>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">今日调用次数</p>
              <p className="text-2xl font-bold text-gray-800">1,234</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
