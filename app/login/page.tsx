'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Sparkles, Mail, Lock, User, Copy, Check } from 'lucide-react'

const testAccounts = [
  {
    name: '管理员',
    email: 'admin@talentgraph.com',
    password: 'admin123',
    role: '管理员',
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: '张伟',
    email: 'test@talentgraph.com',
    password: 'test123',
    role: '用户',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: '李明',
    email: 'user01@talentgraph.com',
    password: '123456',
    role: '用户',
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: '王芳',
    email: 'user02@talentgraph.com',
    password: '123456',
    role: '用户',
    color: 'from-orange-500 to-amber-500'
  }
]

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const fillAccount = (account: typeof testAccounts[0]) => {
    setEmail(account.email)
    setPassword(account.password)
    if (!isLogin) {
      setName(account.name)
    }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        console.log('登录尝试:', { email, password })
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false
        })
        console.log('登录结果:', result)
        if (result?.error) {
          console.error('登录失败:', result.error)
          setError('邮箱或密码错误')
        } else if (result?.ok) {
          console.log('登录成功，跳转到首页')
          router.push('/')
        } else {
          console.error('登录结果异常:', result)
          setError('登录失败，请重试')
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
      console.error('登录异常:', err)
      setError('操作失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-5xl">
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

        <div className="grid lg:grid-cols-2 gap-8">
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

          <div className="rounded-2xl bg-slate-800/50 border border-slate-700 p-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              测试账号清单
            </h3>
            
            <p className="text-sm text-slate-400 mb-4">
              点击账号即可一键填入，也可以复制单独使用
            </p>

            <div className="space-y-3">
              {testAccounts.map((account, index) => (
                <div
                  key={index}
                  onClick={() => fillAccount(account)}
                  className="p-4 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-primary-500/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${account.color} flex items-center justify-center text-white font-bold`}>
                        {account.name[0]}
                      </div>
                      <div>
                        <div className="font-medium text-slate-200">{account.name}</div>
                        <div className={`text-xs px-2 py-0.5 rounded-full inline-block ${
                          account.role === '管理员' 
                            ? 'bg-purple-500/20 text-purple-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {account.role}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        fillAccount(account)
                      }}
                      className="px-3 py-1.5 text-sm rounded-lg bg-primary-500/20 text-primary-400 hover:bg-primary-500/30 transition-colors"
                    >
                      一键填入
                    </button>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between bg-slate-800/50 rounded-lg px-3 py-2">
                      <span className="text-slate-400">邮箱</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300 font-mono">{account.email}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            copyToClipboard(account.email, `email-${index}`)
                          }}
                          className="p-1 hover:bg-slate-700 rounded transition-colors"
                        >
                          {copied === `email-${index}` ? (
                            <Check className="w-3.5 h-3.5 text-green-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-slate-800/50 rounded-lg px-3 py-2">
                      <span className="text-slate-400">密码</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300 font-mono">{account.password}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            copyToClipboard(account.password, `password-${index}`)
                          }}
                          className="p-1 hover:bg-slate-700 rounded transition-colors"
                        >
                          {copied === `password-${index}` ? (
                            <Check className="w-3.5 h-3.5 text-green-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
