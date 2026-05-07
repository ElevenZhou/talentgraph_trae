'use client'

import AdminLayout from '@/components/AdminLayout'
import { Save, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface AIConfigForm {
  openaiApiKey: string
  openaiBaseUrl: string
  deepseekApiKey: string
  deepseekBaseUrl: string
  defaultProvider: 'openai' | 'deepseek'
}

export default function SettingsPage() {
  const [form, setForm] = useState<AIConfigForm>({
    openaiApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
    openaiBaseUrl: 'https://api.openai.com/v1',
    deepseekApiKey: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || '',
    deepseekBaseUrl: 'https://api.deepseek.com/v1',
    defaultProvider: 'deepseek'
  })

  const [saved, setSaved] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const testAIProvider = async (provider: 'openai' | 'deepseek') => {
    setTestResult(null)
    const response = await fetch('/api/admin/test-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider })
    })
    const data = await response.json()
    setTestResult(data)
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">系统设置</h1>
        <p className="text-gray-500 mt-1">管理平台配置和AI服务</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* AI配置 */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">AI服务配置</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 默认服务商 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">默认AI服务商</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="defaultProvider"
                      value="deepseek"
                      checked={form.defaultProvider === 'deepseek'}
                      onChange={(e) => setForm({ ...form, defaultProvider: e.target.value as 'deepseek' })}
                      className="w-4 h-4 text-blue-500"
                    />
                    <span className="text-gray-700">DeepSeek (国内推荐)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="defaultProvider"
                      value="openai"
                      checked={form.defaultProvider === 'openai'}
                      onChange={(e) => setForm({ ...form, defaultProvider: e.target.value as 'openai' })}
                      className="w-4 h-4 text-blue-500"
                    />
                    <span className="text-gray-700">OpenAI (海外)</span>
                  </label>
                </div>
              </div>

              {/* DeepSeek配置 */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-medium text-blue-600 mb-4">DeepSeek 配置</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                    <input
                      type="password"
                      value={form.deepseekApiKey}
                      onChange={(e) => setForm({ ...form, deepseekApiKey: e.target.value })}
                      placeholder="sk-xxxxxxxxxxxxxxxx"
                      className="w-full px-4 py-2 text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API 地址</label>
                    <input
                      type="text"
                      value={form.deepseekBaseUrl}
                      onChange={(e) => setForm({ ...form, deepseekBaseUrl: e.target.value })}
                      className="w-full px-4 py-2 text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => testAIProvider('deepseek')}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    测试连接
                  </button>
                  {testResult && (
                    <span className={`ml-3 flex items-center gap-1 text-sm ${
                      testResult.success ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {testResult.success ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          连接成功
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4" />
                          {testResult.message}
                        </>
                      )}
                    </span>
                  )}
                </div>
              </div>

              {/* OpenAI配置 */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-medium text-orange-600 mb-4">OpenAI 配置</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                    <input
                      type="password"
                      value={form.openaiApiKey}
                      onChange={(e) => setForm({ ...form, openaiApiKey: e.target.value })}
                      placeholder="sk-xxxxxxxxxxxxxxxx"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API 地址</label>
                    <input
                      type="text"
                      value={form.openaiBaseUrl}
                      onChange={(e) => setForm({ ...form, openaiBaseUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => testAIProvider('openai')}
                  className="mt-3 flex items-center gap-2 px-4 py-2 text-sm bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  测试连接
                </button>
              </div>

              {/* 保存按钮 */}
              <div className="border-t border-gray-100 pt-6">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {saved ? '已保存' : '保存配置'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 配置说明 */}
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-800 mb-3">配置说明</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• API Key 请从各服务商官网获取</li>
              <li>• 建议使用 DeepSeek 作为国内默认服务商</li>
              <li>• 修改配置后需要重启服务生效</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">服务商对比</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pb-2 font-medium">特性</th>
                  <th className="pb-2 font-medium">DeepSeek</th>
                  <th className="pb-2 font-medium">OpenAI</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-600">
                  <td>国内访问</td>
                  <td className="text-green-600">✓ 稳定</td>
                  <td className="text-yellow-600">需代理</td>
                </tr>
                <tr className="text-gray-600">
                  <td>响应速度</td>
                  <td className="text-green-600">快</td>
                  <td className="text-yellow-600">中等</td>
                </tr>
                <tr className="text-gray-600">
                  <td>价格</td>
                  <td className="text-green-600">较低</td>
                  <td className="text-yellow-600">较高</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
