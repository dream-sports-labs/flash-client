import React from 'react'
import { componentRegistry } from './ComponentRegistry'
import { SduiConfig } from './SduiConfig'
import { SduiError } from '../errors/SduiError'
import { type ISduiListeners } from './interfaces/ISduiListeners'
import { type ISdui } from './interfaces/ISdui'
import { type ISduiOptions } from './interfaces/IsduiOptions'
import { type Component, type ConfigurableProps } from '../types/types'
import { SduiLogger } from '../utils/sdui-logger'
import { componentService } from './ComponentService'

class Sdui implements ISdui {
  private sduiListeners?: ISduiListeners // Made optional
  private static instance: Sdui

  private constructor() {}

  public static getInstance(): Sdui {
    if (!Sdui.instance) {
      Sdui.instance = new Sdui()
    }
    return Sdui.instance
  }

  init(sduiListeners?: ISduiListeners, sduiOptions?: ISduiOptions) {
    this.sduiListeners = sduiListeners

    if (sduiOptions?.logLevel) {
      SduiConfig.setLogLevel(sduiOptions.logLevel)
    }

    SduiLogger.log('SDUI initialized.', sduiOptions || {})
  }

  getComponentLayout(componentName: string, defaultComponent: Component) {
    return componentService.getComponentLayout(componentName, defaultComponent)
  }

  sendSDUINonFatalEvent(error: Error) {
    try {
      this.sduiListeners?.sendSDUINonFatalEvent?.(error)
    } catch (err) {
      sduiInstance.sendSDUINonFatalEvent(
        new SduiError('Failed to send non-fatal event', { originalError: err })
      )
    }
  }

  setComponentsData(components: Component[]): void {
    try {
      componentService.setComponentsData(components)
    } catch (error) {
      sduiInstance.sendSDUINonFatalEvent(
        new SduiError('Error setting components data', { error })
      )
    }
  }

  registerComponent(
    components: Record<string, React.FC<ConfigurableProps>>
  ): void {
    try {
      componentRegistry.registerComponent(components)
    } catch (error) {
      sduiInstance.sendSDUINonFatalEvent(
        new SduiError('Error registering components in SDUI', { error })
      )
    }
  }
}

export const sduiInstance = Sdui.getInstance()
