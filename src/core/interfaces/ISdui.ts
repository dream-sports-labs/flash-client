import React from 'react'
import { type Component, type ConfigurableProps } from '../../types/types'
import { type ISduiListeners } from './ISduiListeners'
import { type ISduiOptions } from './IsduiOptions'

export interface ISdui {
  /**
   * Initializes SDUI with optional listeners and options.
   */
  init(sduiListeners?: ISduiListeners, sduiOptions?: ISduiOptions): void

  /**
   * Registers new UI components.
   */
  registerComponent(
    components: Record<string, React.FC<ConfigurableProps>>
  ): void

  /**
   * Sets component data within SDUI.
   */
  setComponentsData(components: Component[]): void

  /**
   * Retrieves the layout for a specified component.
   */
  getComponentLayout(
    componentName: string,
    defaultComponent: Component
  ): Component
}
