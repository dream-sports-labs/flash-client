import React from 'react'
import { type Component, type ConfigurableProps } from '../../types/types'
import { type IFlashListeners } from './IFlashListeners'
import { type IFlashOptions } from './IFlashOptions'

export interface IFlash {
  /**
   * Initializes Flash with optional listeners and options.
   */
  init(flashListeners?: IFlashListeners, flashOptions?: IFlashOptions): void

  /**
   * Registers new UI components.
   */
  registerComponent(
    components: Record<string, React.FC<ConfigurableProps>>
  ): void

  /**
   * Sets component data within Flash.
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
