import { type Component } from '../types/types'
import { flashInstance } from './FlashInstance'
import { FlashError } from '../errors/FlashError'

class ComponentService {
  private static instance: ComponentService
  private componentsList: Component[] = []

  private constructor() {} // Prevent direct instantiation

  public static getInstance(): ComponentService {
    if (!ComponentService.instance) {
      ComponentService.instance = new ComponentService()
    }
    return ComponentService.instance
  }

  public getComponentLayout(
    componentName: string,
    defaultComponent: Component
  ): Component {
    try {
      return this.findComponentByName(componentName) || defaultComponent
    } catch (error) {
      flashInstance.sendFlashNonFatalEvent(
        new FlashError(
          `Flash: Error retrieving component "${componentName}".`,
          {
            error,
          }
        )
      )
      return defaultComponent
    }
  }

  private findComponentByName(componentName: string): Component | null {
    try {
      return (
        this.componentsList.find(
          (component) => component.name === componentName
        ) || null
      )
    } catch (error) {
      flashInstance.sendFlashNonFatalEvent(
        new FlashError(
          `Flash: Error searching for component "${componentName}".`,
          { error }
        )
      )
      return null
    }
  }

  public setComponentsData(components: Component[]): void {
    try {
      this.componentsList.splice(0, this.componentsList.length, ...components) // Safe array reset
    } catch (error) {
      flashInstance.sendFlashNonFatalEvent(
        new FlashError('Flash: Error setting component data.', {
          error,
          components,
        })
      )
    }
  }
}

export const componentService = ComponentService.getInstance()
