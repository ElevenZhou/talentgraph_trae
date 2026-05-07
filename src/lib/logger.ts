type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
}

class Logger {
  private level: LogLevel

  constructor() {
    this.level = (process.env.LOG_LEVEL as LogLevel) || 'info'
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[this.level]
  }

  private formatMessage(level: LogLevel, context: string, message: string, data?: any): string {
    const timestamp = new Date().toISOString()
    const contextStr = context ? `[${context}]` : ''
    const dataStr = data ? ` ${JSON.stringify(data)}` : ''
    return `${timestamp} [${level.toUpperCase()}]${contextStr} ${message}${dataStr}`
  }

  debug(context: string, message: string, data?: any) {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', context, message, data))
    }
  }

  info(context: string, message: string, data?: any) {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', context, message, data))
    }
  }

  warn(context: string, message: string, data?: any) {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', context, message, data))
    }
  }

  error(context: string, message: string, error?: any) {
    if (this.shouldLog('error')) {
      const errorData = error instanceof Error 
        ? { message: error.message, stack: error.stack }
        : error
      console.error(this.formatMessage('error', context, message, errorData))
    }
  }
}

export const logger = new Logger()
