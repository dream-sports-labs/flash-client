import React from 'react'
import { type Component, type ConfigurableProps } from '../../types/types'
import { type ISduiListeners } from './ISduiListeners'
import { type ISduiOptions } from './IsduiOptions'

export interface ISdui {
  init(sduiListeners?: ISduiListeners, sduiOptions?: ISduiOptions): void

  registerComponent(
    components: Record<string, React.FC<ConfigurableProps>>
  ): void

  setComponentsData(components: Component[]): void

  getComponentLayout(
    componentName: string,
    defaultComponent: Component
  ): Component
}
