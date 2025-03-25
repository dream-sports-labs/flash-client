export interface IFlashListeners {
  /**
   * Sends a standard Flash event.
   */
  sendFlashEvent: () => void

  /**
   * Sends a non-fatal Flash event (for logging errors without crashing).
   * @param error - The error object.
   */
  sendFlashNonFatalEvent: (error: Error) => void
}
