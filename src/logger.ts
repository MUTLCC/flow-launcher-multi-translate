import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const logsDir = path.join(projectRoot, 'logs')

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export interface LoggerConfig {
  level: LogLevel
  enableFile: boolean
}

class Logger {
  private config: LoggerConfig

  constructor() {
    this.config = {
      level: LogLevel.INFO,
      enableFile: true,
    }
    this.ensureLogsDir()
  }

  private async ensureLogsDir(): Promise<void> {
    try {
      await fs.access(logsDir)
    }
    catch {
      await fs.mkdir(logsDir, { recursive: true })
    }
  }

  private getLogFileName(): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}_${month}_${day}.log`
  }

  private getTimestamp(): string {
    const now = new Date()
    return now.toISOString().replace('T', ' ').slice(0, 19)
  }

  private formatMessage(level: LogLevel, message: any): string {
    const timestamp = this.getTimestamp()
    let formattedMessage: string

    if (typeof message === 'object' && message !== null) {
      formattedMessage = JSON.stringify(message, null, 2)
    }
    else {
      formattedMessage = String(message)
    }

    return `[${timestamp}] [${level}] ${formattedMessage}`
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR]
    const currentLevelIndex = levels.indexOf(this.config.level)
    const messageLevelIndex = levels.indexOf(level)
    return messageLevelIndex >= currentLevelIndex
  }

  private async writeToFile(message: string): Promise<void> {
    if (!this.config.enableFile)
      return

    try {
      const fileName = this.getLogFileName()
      const filePath = path.join(logsDir, fileName)
      await fs.appendFile(filePath, `${message}\n`, 'utf8')
    }
    catch {}
  }

  private async log(level: LogLevel, message: any): Promise<void> {
    if (!this.shouldLog(level))
      return

    const formattedMessage = this.formatMessage(level, message)

    await this.writeToFile(formattedMessage)
  }

  async debug(message: any): Promise<void> {
    await this.log(LogLevel.DEBUG, message)
  }

  async info(message: any): Promise<void> {
    await this.log(LogLevel.INFO, message)
  }

  async warn(message: any): Promise<void> {
    await this.log(LogLevel.WARN, message)
  }

  async error(message: any): Promise<void> {
    await this.log(LogLevel.ERROR, message)
  }
}

const logger = new Logger()

export { Logger, logger }
