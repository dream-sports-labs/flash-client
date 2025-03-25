import React from 'react'
import { componentRegistry } from './ComponentRegistry'
import { FlashConfig } from './FlashConfig'
import { FlashError } from '../errors/FlashError'
import { type IFlashListeners } from './interfaces/IFlashListeners'
import { type IFlash } from './interfaces/IFlash'
import { type IFlashOptions } from './interfaces/IFlashOptions'
import { type Component, type ConfigurableProps } from '../types/types'
import { FlashLogger } from '../utils/flash-logger'
import { componentService } from './ComponentService'

class Flash implements IFlash {
  private flashListeners?: IFlashListeners
  private static instance: Flash

  private constructor() {}

  /**
   * Retrieves the singleton instance of Flash.
   * @returns {Flash} The Flash instance.
   */
  public static getInstance(): Flash {
    if (!Flash.instance) {
      Flash.instance = new Flash()
    }
    return Flash.instance
  }

  /**
   * Initializes Flash with optional event listeners and configuration.
   * @param flashListeners - Optional event listeners.
   * @param flashOptions - Optional configuration settings.
   */
  init(flashListeners?: IFlashListeners, flashOptions?: IFlashOptions) {
    this.flashListeners = flashListeners

    if (flashOptions?.logLevel) {
      FlashConfig.setLogLevel(flashOptions.logLevel)
    }

    FlashLogger.log('Flash initialized.', flashOptions || {})
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
  sendFlashNonFatalEvent(error: Error) {
    try {
      this.flashListeners?.sendFlashNonFatalEvent?.(error)
    } catch (err) {
      flashInstance.sendFlashNonFatalEvent(
        new FlashError('Failed to send non-fatal event', { originalError: err })
      )
    }
  }

  /**
   * Updates component data within Flash.
   * @param components - An array of components to update.
   */
  setComponentsData(components: Component[]): void {
    try {
      componentService.setComponentsData(components)
    } catch (error) {
      flashInstance.sendFlashNonFatalEvent(
        new FlashError('Error setting components data', { error })
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
      flashInstance.sendFlashNonFatalEvent(
        new FlashError('Error registering components in Flash', { error })
      )
    }
  }
}

/**
 * Exporting the singleton Flash instance globally.
 */
export const flashInstance = Flash.getInstance()
