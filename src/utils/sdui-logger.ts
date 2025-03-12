import { SduiConfig } from '../core/SduiConfig'

export class SduiLogger {
  static log(message: string, details?: object) {
    if (SduiConfig.shouldLog('info')) {
      console.log(`[SDUI] ${message}`, details || '')
    }
  }

  static warn(message: string, details?: object) {
    if (SduiConfig.shouldLog('warn')) {
      console.warn(`[SDUI Warning] ${message}`, details || '')
    }
  }

  static error(message: string, details?: object) {
    if (SduiConfig.shouldLog('error')) {
      console.error(`[SDUI Error] ${message}`, details || '')
    }
  }
}
