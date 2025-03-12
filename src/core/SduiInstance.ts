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
  private sduiListeners?: ISduiListeners
  private static instance: Sdui

  private constructor() {}

  /**
   * Retrieves the singleton instance of SDUI.
   * @returns {Sdui} The SDUI instance.
   */
  public static getInstance(): Sdui {
    if (!Sdui.instance) {
      Sdui.instance = new Sdui()
    }
    return Sdui.instance
  }

  /**
   * Initializes SDUI with optional event listeners and configuration.
   * @param sduiListeners - Optional event listeners.
   * @param sduiOptions - Optional configuration settings.
   */
  init(sduiListeners?: ISduiListeners, sduiOptions?: ISduiOptions) {
    this.sduiListeners = sduiListeners

    if (sduiOptions?.logLevel) {
      SduiConfig.setLogLevel(sduiOptions.logLevel)
    }

    SduiLogger.log('SDUI initialized.', sduiOptions || {})
  }

  /**
   * Retrieves the layout for a given component.
   * @param componentName - The name of the component.
   * @param defaultComponent - The default component layout.
   * @returns The component layout.
   */
  getComponentLayout(componentName: string, defaultComponent: Component) {
    return componentService.getComponentLayout(componentName, defaultComponent)
  }

  /**
   * Sends a non-fatal error event.
   * @param error - The error object.
   */
  sendSDUINonFatalEvent(error: Error) {
    try {
      this.sduiListeners?.sendSDUINonFatalEvent?.(error)
    } catch (err) {
      sduiInstance.sendSDUINonFatalEvent(
        new SduiError('Failed to send non-fatal event', { originalError: err })
      )
    }
  }

  /**
   * Updates component data within SDUI.
   * @param components - An array of components to update.
   */
  setComponentsData(components: Component[]): void {
    try {
      componentService.setComponentsData(components)
    } catch (error) {
      sduiInstance.sendSDUINonFatalEvent(
        new SduiError('Error setting components data', { error })
      )
    }
  }

  /**
   * Registers new UI components.
   * @param components - A record of component names and their React component implementations.
   */
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

/**
 * Exporting the singleton SDUI instance globally.
 */
export const sduiInstance = Sdui.getInstance()
