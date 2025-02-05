export interface ISduiListeners {
  sendSDUIEvent: () => void
  sendSDUINonFatalEvent: (error: Error) => void
}
