import { sduiInstance } from './core/SduiInstance'
import { type Component, type ConfigurableProps } from './types/types'
import React from 'react'
import { type ISduiListeners } from './core/interfaces/ISduiListeners'
import { type ISduiOptions } from './core/interfaces/IsduiOptions'

class SduiService {
  public init(sduiListeners?: ISduiListeners, sduiOptions?: ISduiOptions) {
    sduiInstance.init(sduiListeners, sduiOptions)
  }

  public getComponentLayout(
    componentName: string,
    defaultComponent: Component
  ) {
    return sduiInstance.getComponentLayout(componentName, defaultComponent)
  }

  public setComponentsData(components: Array<Component>): void {
    sduiInstance.setComponentsData(components)
  }

  public registerComponent(
    components: Record<string, React.FC<ConfigurableProps>>
  ): void {
    sduiInstance.registerComponent(components)
  }
}

export const SDUI = new SduiService()

export * from './types/types'
export * from './renderer/inflaters/ScrollInflater'
export * from './renderer/inflaters/FlatListInflater'
export * from './core/SduiConfig'
