import React from 'react'
import { type ConfigurableProps } from '../types/types'
import { sduiInstance } from './SduiInstance'
import { SduiError } from '../errors/SduiError'
import { SduiView } from '../sdui-components/base-components/SduiView'
import { SduiImage } from '../sdui-components/base-components/SduiImage'
import { SduiText } from '../sdui-components/base-components/SduiText'
import { createComponent } from './createComponent'
import { SduiComponent } from '../sdui-components/generic-components/SduiComponent'

class ComponentRegistry {
  private SduiComponentList: Record<string, React.FC<ConfigurableProps>> = {
    SduiView: createComponent(SduiView, 'default-view', true),
    SduiText: createComponent(SduiText, 'default-text', true),
    SduiImage: createComponent(SduiImage, 'default-image', true),
    SduiComponent: createComponent(SduiComponent),
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
        if (this.SduiComponentList[key]) {
          sduiInstance.sendSDUINonFatalEvent(
            new SduiError(`Component "${key}" is being overwritten.`, {
              existingComponent: this.SduiComponentList[key],
              newComponent: components[key],
            })
          )
        }
      })
      this.SduiComponentList = { ...this.SduiComponentList, ...components }
    } catch (error) {
      sduiInstance.sendSDUINonFatalEvent(
        new SduiError('Error registering components.', { error, components })
      )
    }
  }

  public getSDUIRegisteredComponent(name: string): React.FC<ConfigurableProps> {
    if (!this.SduiComponentList[name]) {
      sduiInstance.sendSDUINonFatalEvent(
        new SduiError(`Component "${name}" not found.`, {
          requestedComponent: name,
        })
      )
    }
    return this.SduiComponentList[name]
  }
}

export const componentRegistry = ComponentRegistry.getInstance()
