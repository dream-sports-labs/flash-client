import { ISduiOptions } from '../../src/core/interfaces/IsduiOptions'
import { SDUI } from 'react-native-server-driven-ui'
import { sduiMockData } from './mocks/MockData'

export const initializeSDUISDK = () => {
  const sduiOptions: ISduiOptions = {
    logLevel: 'info',
  }

  SDUI.init(
    {
      sendSDUIEvent(): void {
        console.log('SDUI App Event:')
      },
      sendSDUINonFatalEvent(error: Error): void {
        console.log('SDUI App Non fatal event:', error)
      },
    },
    sduiOptions
  )
  SDUI.setComponentsData(sduiMockData)
}
