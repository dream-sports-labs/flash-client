import { flashInstance } from './core/FlashInstance'
import { type Component, type ConfigurableProps } from './types/types'
import React from 'react'
import { type IFlashListeners } from './core/interfaces/IFlashListeners'
import { type IFlashOptions } from './core/interfaces/IFlashOptions'

class FlashService {
  /**
   * Initializes the Flash instance with optional listeners and configuration.
   * @param flashListeners - Event listeners for Flash.
   * @param flashOptions - Configuration options for Flash.
   */
  public init(flashListeners?: IFlashListeners, flashOptions?: IFlashOptions) {
    flashInstance.init(flashListeners, flashOptions)
  }

  /**
   * Retrieves the layout for a specified component.
   * @param componentName - The name of the component.
   * @param defaultComponent - The default component if not found.
   * @returns The component layout.
   */
  public getComponentLayout(
    componentName: string,
    defaultComponent: Component
  ) {
    return flashInstance.getComponentLayout(componentName, defaultComponent)
  }

  /**
   * Stores and updates component data for Flash.
   * @param components - An array of components to store.
   */
  public setComponentsData(components: Array<Component>): void {
    flashInstance.setComponentsData(components)
  }

  /**
   * Registers any custom components for Flash rendering.
   * @param components - A record containing component names as keys and React functional components as values.
   */
  public registerComponent(
    components: Record<string, React.FC<ConfigurableProps>>
  ): void {
    flashInstance.registerComponent(components)
  }
}

/**
 * Exporting the Flash instance to be used globally.
 */
export const Flash = new FlashService()

// Re-exporting commonly used modules for easier access
export * from './types/types'
export * from './renderer/inflaters/ScrollInflater'
export * from './renderer/inflaters/FlatListInflater'
export * from './flash-components/base-components/FlashText'
export * from './flash-components/base-components/FlashView'
export * from './flash-components/base-components/FlashImage'
export * from './core/FlashConfig'
