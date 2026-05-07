import Database from 'better-sqlite3'
import path from 'path'
import { existsSync, mkdirSync } from 'fs'

const DB_DIR = path.join(process.cwd(), 'data')
const DB_PATH = path.join(DB_DIR, 'talentgraph.db')

let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (db) return db

  if (!existsSync(DB_DIR)) {
    mkdirSync(DB_DIR, { recursive: true })
  }

  db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')
  
  initSchema(db)
  
  return db
}

function initSchema(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT,
      role TEXT DEFAULT 'user',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS resumes (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      talent_data TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
    CREATE INDEX IF NOT EXISTS idx_resumes_status ON resumes(status);
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  `)

  const existingUsers = database.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number }
  if (existingUsers.count === 0) {
    const insertUser = database.prepare(`
      INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)
    `)
    
    const testUsers = [
      ['test-user-001', '张伟', 'test@talentgraph.com', 'test123', 'user'],
      ['admin-user-001', '管理员', 'admin@talentgraph.com', 'admin123', 'admin'],
      ['test-user-002', '李明', 'user01@talentgraph.com', '123456', 'user'],
      ['test-user-003', '王芳', 'user02@talentgraph.com', '123456', 'user'],
      ['test-user-004', '刘洋', 'user03@talentgraph.com', '123456', 'user'],
      ['test-user-005', '陈静', 'user04@talentgraph.com', '123456', 'user'],
      ['test-user-006', '杨帆', 'user05@talentgraph.com', '123456', 'user'],
      ['test-user-007', '赵磊', 'user06@talentgraph.com', '123456', 'user'],
      ['test-user-008', '周婷', 'user07@talentgraph.com', '123456', 'user'],
      ['test-user-009', '吴强', 'user08@talentgraph.com', '123456', 'user'],
      ['test-user-010', '郑琳', 'user09@talentgraph.com', '123456', 'user'],
      ['test-user-011', '孙浩', 'user10@talentgraph.com', '123456', 'user'],
    ]

    for (const user of testUsers) {
      insertUser.run(...user)
    }
  }
}

export interface Resume {
  id: string
  user_id: string
  talent_data: string
  status: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  name: string
  email: string
  password: string | null
  role: string
  created_at: string
  updated_at: string
}

export const resumeDb = {
  create(resume: { id: string; user_id: string; talent_data: string; status?: string }) {
    const db = getDb()
    const stmt = db.prepare(`
      INSERT INTO resumes (id, user_id, talent_data, status)
      VALUES (?, ?, ?, ?)
    `)
    stmt.run(resume.id, resume.user_id, resume.talent_data, resume.status || 'pending')
    return resume
  },

  findById(id: string) {
    const db = getDb()
    const stmt = db.prepare('SELECT * FROM resumes WHERE id = ?')
    const row = stmt.get(id) as Resume | undefined
    if (row) {
      return { ...row, talent_data: JSON.parse(row.talent_data) }
    }
    return null
  },

  findByUserId(userId: string) {
    const db = getDb()
    const stmt = db.prepare('SELECT * FROM resumes WHERE user_id = ? ORDER BY created_at DESC')
    const rows = stmt.all(userId) as Resume[]
    return rows.map(row => ({ ...row, talent_data: JSON.parse(row.talent_data) }))
  },

  findAll() {
    const db = getDb()
    const stmt = db.prepare('SELECT * FROM resumes ORDER BY created_at DESC')
    const rows = stmt.all() as Resume[]
    return rows.map(row => ({ ...row, talent_data: JSON.parse(row.talent_data) }))
  },

  updateStatus(id: string, status: string) {
    const db = getDb()
    const stmt = db.prepare('UPDATE resumes SET status = ?, updated_at = datetime("now") WHERE id = ?')
    stmt.run(status, id)
  },

  count() {
    const db = getDb()
    const stmt = db.prepare('SELECT COUNT(*) as count FROM resumes')
    return (stmt.get() as { count: number }).count
  },

  countByStatus(status: string) {
    const db = getDb()
    const stmt = db.prepare('SELECT COUNT(*) as count FROM resumes WHERE status = ?')
    return (stmt.get(status) as { count: number }).count
  }
}

export const userDb = {
  findByEmail(email: string) {
    const db = getDb()
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?')
    return stmt.get(email) as User | undefined
  },

  findById(id: string) {
    const db = getDb()
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?')
    return stmt.get(id) as User | undefined
  },

  findAll() {
    const db = getDb()
    const stmt = db.prepare('SELECT * FROM users ORDER BY created_at DESC')
    return stmt.all() as User[]
  },

  count() {
    const db = getDb()
    const stmt = db.prepare('SELECT COUNT(*) as count FROM users')
    return (stmt.get() as { count: number }).count
  },

  create(user: { id: string; name: string; email: string; password: string; role?: string }) {
    const db = getDb()
    const stmt = db.prepare(`
      INSERT INTO users (id, name, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `)
    stmt.run(user.id, user.name, user.email, user.password, user.role || 'user')
    return user
  }
}
