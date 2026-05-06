'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Sparkles, Mail, Lock, User, Github } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false
        })
        if (result?.error) {
          setError('邮箱或密码错误')
        } else {
          router.push('/')
        }
      } else {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name })
        })
        const data = await res.json()
        if (data.error) {
          setError(data.error)
        } else {
          await signIn('credentials', { email, password, redirect: false })
          router.push('/')
        }
      }
    } catch (err) {
      setError('操作失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              职场引力场
            </span>
          </div>
          <p className="text-slate-400">AI 原生人才图谱平台</p>
        </div>

        <div className="rounded-2xl bg-slate-800/50 border border-slate-700 p-8">
          <h2 className="text-xl font-bold text-center mb-6">
            {isLogin ? '欢迎回来' : '创建账号'}
          </h2>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm text-slate-400 mb-1">昵称</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="请输入昵称"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-900 border border-slate-600 focus:border-primary-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm text-slate-400 mb-1">邮箱</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="请输入邮箱"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-900 border border-slate-600 focus:border-primary-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-900 border border-slate-600 focus:border-primary-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold disabled:opacity-50 hover:opacity-90 transition-all"
            >
              {loading ? '加载中...' : (isLogin ? '登录' : '注册')}
            </button>
          </form>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex-1 border-t border-slate-700" />
            <span className="text-slate-500 text-sm">或</span>
            <div className="flex-1 border-t border-slate-700" />
          </div>

          <div className="mt-4">
            <button
              onClick={() => signIn('github', { redirect: true })}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-600 hover:bg-slate-700/50 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">使用 GitHub 登录</span>
            </button>
          </div>

          <p className="text-center mt-6 text-sm text-slate-400">
            {isLogin ? '还没有账号？' : '已有账号？'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-primary-400 hover:underline"
            >
              {isLogin ? '立即注册' : '立即登录'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
