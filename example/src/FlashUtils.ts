import { type IFlashOptions } from '../../src/core/interfaces/IFlashOptions'
import { Flash } from 'flash-client'
import { flashMockData } from './mocks/MockData'
import { AppComponentList } from './component-registry/ComponentRegistry'

export const initializeFlashClient = () => {
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
