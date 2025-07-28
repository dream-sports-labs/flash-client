import { FlashConfig } from '../core/FlashConfig'

export class FlashLogger {
  static log(message: string, details?: object) {
    if (__DEV__ && FlashConfig.shouldLog('info')) {
      console.log(`[Flash] ${message}`, details || '')
    }
  }

  static warn(message: string, details?: object) {
    if (__DEV__ && FlashConfig.shouldLog('warn')) {
      console.warn(`[Flash Warning] ${message}`, details || '')
    }
  }

  static error(message: string, details?: object) {
    if (FlashConfig.shouldLog('error')) {
      console.error(`[Flash Error] ${message}`, details || '')
    }
  }
}
