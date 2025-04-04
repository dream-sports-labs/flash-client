import { FlashLogger } from '../utils/flash-logger'

export class FlashError extends Error {
  constructor(
    message: string,
    public details?: object
  ) {
    super(message)
    this.name = 'FlashError'

    if (details) {
      FlashLogger.error(`[Flash Error]: ${message}`, details)
    } else {
      FlashLogger.error(`[Flash Error]: ${message}`)
    }
  }
}
