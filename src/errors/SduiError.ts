import { SduiLogger } from '../utils/sdui-logger'

export class SduiError extends Error {
  constructor(
    message: string,
    public details?: object
  ) {
    super(message)
    this.name = 'SduiError'

    if (details) {
      SduiLogger.error(`[SDUI Error]: ${message}`, details)
    } else {
      SduiLogger.error(`[SDUI Error]: ${message}`)
    }
  }
}
