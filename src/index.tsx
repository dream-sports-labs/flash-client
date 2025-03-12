import { sduiInstance } from './core/SduiInstance'
import { type Component, type ConfigurableProps } from './types/types'
import React from 'react'
import { type ISduiListeners } from './core/interfaces/ISduiListeners'
import { type ISduiOptions } from './core/interfaces/IsduiOptions'

class SduiService {
  /**
   * Initializes the SDUI instance with optional listeners and configuration.
   * @param sduiListeners - Event listeners for SDUI.
   * @param sduiOptions - Configuration options for SDUI.
   */
  public init(sduiListeners?: ISduiListeners, sduiOptions?: ISduiOptions) {
    sduiInstance.init(sduiListeners, sduiOptions)
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
    return sduiInstance.getComponentLayout(componentName, defaultComponent)
  }

  /**
   * Stores and updates component data for SDUI.
   * @param components - An array of components to store.
   */
  public setComponentsData(components: Array<Component>): void {
    sduiInstance.setComponentsData(components)
  }

  /**
   * Registers any custom components for SDUI rendering.
   * @param components - A record containing component names as keys and React functional components as values.
   */
  public registerComponent(
    components: Record<string, React.FC<ConfigurableProps>>
  ): void {
    sduiInstance.registerComponent(components)
  }
}

/**
 * Exporting the SDUI instance to be used globally.
 */
export const SDUI = new SduiService()

// Re-exporting commonly used modules for easier access
export * from './types/types'
export * from './renderer/inflaters/ScrollInflater'
export * from './renderer/inflaters/FlatListInflater'
export * from './sdui-components/base-components/SduiText'
export * from './sdui-components/base-components/SduiView'
export * from './sdui-components/base-components/SduiImage'
export * from './core/SduiConfig'
