# 人才引力场 TalentGraph

> 新一代 AI 原生人才能力资产协议平台

将传统简历转化为 AI 可读的结构化人才图谱，实现项目与人才的智能匹配。

## 🎯 项目定位

TalentGraph 是一个面向人才与岗位匹配的智能平台，通过 AI 技术解析简历，构建结构化的人才能力图谱，为企业和求职者提供精准的匹配服务。

## ✨ 核心功能

| 模块 | 功能描述 | 状态 |
|------|----------|------|
| **用户认证** | 登录/注册、Session 管理、角色权限 | ✅ 完成 |
| **AI 简历解析** | 文本/文件解析、结构化输出、能力评估 | ✅ 完成 |
| **人才图谱** | 三层径向可视化、节点交互、能力展示 | ✅ 完成 |
| **个人中心** | 简历管理、原文查看、图谱预览 | ✅ 完成 |
| **分享链接** | 生成带 token 的公开访问链接 | ✅ 完成 |
| **智能匹配** | 50个内置岗位、技能匹配算法 | ✅ 完成 |
| **运营后台** | 用户管理、简历管理、数据统计 | ✅ 完成 |

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router) + TypeScript
- **样式**: Tailwind CSS 3
- **数据库**: SQLite（本地部署，符合国内数据合规）
- **认证**: NextAuth.js (JWT)
- **可视化**: D3.js（三层径向人才图谱）
- **AI 服务**: DeepSeek（国内）+ OpenAI（海外）双服务商

## 📁 项目结构

```
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   ├── auth/          # 认证接口
│   │   ├── process-resume/ # 简历处理（核心）
│   │   ├── resumes/       # 简历 CRUD
│   │   ├── projects/      # 岗位数据接口
│   │   ├── matching/      # 智能匹配接口
│   │   └── admin/         # 管理后台接口
│   ├── converter/         # 简历转换页面
│   ├── graph/[id]/        # 人才图谱展示
│   ├── graph/page.tsx     # 人才图谱入口（智能判断）
│   ├── matching/[id]/     # 匹配建议页面
│   ├── matching/page.tsx  # 匹配入口（智能判断）
│   ├── login/             # 登录页面
│   ├── profile/           # 个人中心
│   ├── admin/             # 运营后台
│   └── layout.tsx         # 根布局
├── src/                   # 核心代码
│   ├── auth.ts            # 认证配置
│   └── lib/               # 工具库
│       ├── aiService.ts   # AI 服务封装
│       ├── db.ts          # SQLite 数据库
│       └── logger.ts      # 日志系统
├── components/            # UI 组件
├── data/                  # 数据目录
│   ├── talentgraph.db     # SQLite 数据库文件
│   └── mockProjects.ts    # 50个内置岗位数据
└── public/                # 静态资源
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.x
- npm >= 9.x

### 安装依赖

```bash
npm install
```

### 配置环境变量

创建 `.env` 文件：

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
DEEPSEEK_API_KEY=your-deepseek-api-key
OPENAI_API_KEY=your-openai-api-key
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

### 生产构建

```bash
npm run build
npm start
```

## 🔌 API 接口

### 简历相关

| 接口 | 方法 | 功能 |
|------|------|------|
| `/api/resumes` | GET | 获取当前用户简历列表 |
| `/api/resumes` | POST | 创建新简历 |
| `/api/resumes/[id]` | GET | 获取单个简历（支持 token 认证） |
| `/api/resumes/[id]` | DELETE | 删除简历 |
| `/api/process-resume` | POST | AI 解析简历 |

### Agent 读取方式

Agent 视图提供可直接发给对方的 OpenClaw 交付文本。对方拿到后，将文本粘贴到 OpenClaw，OpenClaw 会根据其中的 API 和 token 自动读取结构化人才图谱：

```bash
curl "http://localhost:3000/api/resumes/{talentId}?token={accessToken}"
```

返回结果中的 `data` 即人才图谱档案。OpenClaw 应重点读取 `identity`、`capabilities`、`evidence`、`boundaries`、`matching`、`agentMeta` 字段，并遵守 `agentMeta.permissionScope` 与 `agentMeta.instructions`。

建议 OpenClaw 输出：
- 一句话结论
- 适配度：高 / 中高 / 中 / 偏低
- 核心匹配点
- 主要风险或缺口
- 建议追问的问题
- 是否建议进入下一步沟通

### 岗位相关

| 接口 | 方法 | 功能 |
|------|------|------|
| `/api/projects` | GET | 获取岗位列表（支持搜索筛选） |

### 匹配相关

| 接口 | 方法 | 功能 |
|------|------|------|
| `/api/matching` | POST | 计算人才与岗位匹配度 |

### 认证相关

| 接口 | 方法 | 功能 |
|------|------|------|
| `/api/auth/signin` | POST | 登录 |
| `/api/auth/signup` | POST | 注册 |
| `/api/register` | POST | 用户注册 |

## 👤 测试账号

**普通用户**（可直接登录）：
- `test01@talentgraph.com` / `123456`
- `test02@talentgraph.com` / `123456`
- `test03@talentgraph.com` / `123456`
- ...（共10个测试用户）

**管理员账号**：
- `admin@talentgraph.com` / `admin123`

## 📊 内置岗位数据

系统内置50个类真实岗位数据，覆盖以下行业：

- 人工智能
- 互联网
- 金融科技
- 医疗健康
- 教育
- 电商
- 新能源
- 智能制造
- 文化娱乐
- 企业服务
- 游戏
- 区块链

## 🔒 安全规范

- 所有用户输入必须验证和清理
- JWT Token 通过 `getToken` 安全获取
- 分享链接使用独立的 `accessToken`
- 敏感信息仅存储在 `.env` 文件中

## 📝 日志系统

日志分为四个级别：

```typescript
import { logger } from '@/lib/logger'

logger.debug('Module', '详细调试信息')
logger.info('Auth', '用户登录成功', { userId, role })
logger.warn('Process', '潜在问题警告')
logger.error('ProcessResume', '处理失败', error)
```

## 🚩 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 登录后无状态显示 | Session Provider 未正确配置 | 检查 `SessionProvider` 包装 |
| AI 返回格式错误 | DeepSeek 模型版本问题 | 使用 `deepseek-v4-flash` 模型 |
| 401 未授权 | Token 获取失败 | 确保使用 `getToken({ req })` |
| 分享链接无法访问 | Token 不匹配 | 检查 `accessToken` 是否正确 |

## 📋 后续工作重点

1. **完善 AI 解析**：优化解析精度和响应速度
2. **匹配算法优化**：引入更智能的匹配策略
3. **性能优化**：大图渲染性能提升
4. **移动端适配**：完善移动端体验
5. **数据导出**：支持 PDF/JSON 格式导出
6. **企业端功能**：企业账号、岗位发布、人才搜索

## 📜 版本历史

### v2.0 (2026-05-07)
- 新增个人中心页面，支持简历管理
- 新增简历原文查看功能
- 新增人才图谱导航智能判断
- 新增分享链接功能（带 token）
- 新增智能匹配功能（50个内置岗位）
- 新增 Agent 视图和 API 文档
- 优化 Agent 视图说明，补充使用步骤、关键字段、调用案例和使用边界
- 新增 OpenClaw 交付文本，明确对方拿到后如何读取、学习和输出匹配结论
- 优化 OpenClaw 交付文本语气，改为候选人发给项目方或招聘负责人的谦逊自信表达
- 优化个人中心简历记录命名，默认使用“人名 + 导入时间”，并支持在列表中编辑简历名称

### v1.0 (2026-04)
- 基础用户认证系统
- AI 简历解析功能
- 人才图谱可视化
- 运营后台

## 📄 许可证

MIT License

---

**人才引力场 TalentGraph** - 让人才匹配更智能 🚀
