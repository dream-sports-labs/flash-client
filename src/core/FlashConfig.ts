export type LogLevel = 'info' | 'warn' | 'error' | 'none'

export class FlashConfig {
  private static logLevel: LogLevel = 'info' // Default log level

  static setLogLevel(level: LogLevel): void {
    if (['info', 'warn', 'error', 'none'].includes(level)) {
      this.logLevel = level
    }
  }

  static shouldLog(level: Exclude<LogLevel, 'none'>): boolean {
    const levels: LogLevel[] = ['none', 'error', 'warn', 'info']
    return levels.indexOf(level) <= levels.indexOf(this.logLevel)
  }
}
