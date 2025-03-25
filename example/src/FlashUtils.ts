import { type IFlashOptions } from '../../src/core/interfaces/IFlashOptions'
import { Flash } from 'react-native-server-driven-ui'
import { flashMockData } from './mocks/MockData'
import { AppComponentList } from './component-registry/ComponentRegistry'

export const initializeFlashSDK = () => {
  const flashOptions: IFlashOptions = {
    logLevel: 'info',
  }

  Flash.init(
    {
      sendFlashEvent(): void {
        console.log('Flash App Event:')
      },
      sendFlashNonFatalEvent(error: Error): void {
        console.log('Flash App Non fatal event:', error)
      },
    },
    flashOptions
  )
  Flash.setComponentsData(flashMockData)
  Flash.registerComponent(AppComponentList)
}
