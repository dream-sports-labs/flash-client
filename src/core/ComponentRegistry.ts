import React from 'react'
import { type ConfigurableProps } from '../types/types'
import { flashInstance } from './FlashInstance'
import { FlashError } from '../errors/FlashError'
import { FlashView } from '../flash-components/base-components/FlashView'
import { FlashImage } from '../flash-components/base-components/FlashImage'
import { FlashText } from '../flash-components/base-components/FlashText'
import { createComponent } from './createComponent'
import { FlashComponent } from '../flash-components/generic-components/FlashComponent'

class ComponentRegistry {
  private FlashComponentList: Record<string, React.FC<ConfigurableProps>> = {
    FlashView: createComponent(FlashView, 'default-view', true),
    FlashText: createComponent(FlashText, 'default-text', true),
    FlashImage: createComponent(FlashImage, 'default-image', true),
    FlashComponent: createComponent(FlashComponent),
  }

  private static instance: ComponentRegistry

  private constructor() {}

  public static getInstance(): ComponentRegistry {
    if (!ComponentRegistry.instance) {
      ComponentRegistry.instance = new ComponentRegistry()
    }
    return ComponentRegistry.instance
  }

  public registerComponent(
    components: Record<string, React.FC<ConfigurableProps>>
  ): void {
    try {
      Object.keys(components).forEach((key) => {
        if (this.FlashComponentList[key]) {
          flashInstance.sendFlashNonFatalEvent(
            new FlashError(`Component "${key}" is being overwritten.`, {
              existingComponent: this.FlashComponentList[key],
              newComponent: components[key],
            })
          )
        }
      })
      this.FlashComponentList = { ...this.FlashComponentList, ...components }
    } catch (error) {
      flashInstance.sendFlashNonFatalEvent(
        new FlashError('Error registering components.', { error, components })
      )
    }
  }

  public getFlashRegisteredComponent(
    name: string
  ): React.FC<ConfigurableProps> {
    if (!this.FlashComponentList[name]) {
      flashInstance.sendFlashNonFatalEvent(
        new FlashError(`Component "${name}" not found.`, {
          requestedComponent: name,
        })
      )
    }
    return this.FlashComponentList[name]
  }
}

export const componentRegistry = ComponentRegistry.getInstance()
