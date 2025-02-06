export interface ISduiListeners {
  /**
   * Sends a standard SDUI event.
   */
  sendSDUIEvent: () => void

  /**
   * Sends a non-fatal SDUI event (for logging errors without crashing).
   * @param error - The error object.
   */
  sendSDUINonFatalEvent: (error: Error) => void
}
