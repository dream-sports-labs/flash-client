import React from 'react'
import { type ConfigurableProps } from '../types/types'
import { componentRegistry } from '../core/ComponentRegistry'

export function getComponent(name: string): React.FC<ConfigurableProps> {
  return componentRegistry.getSDUIRegisteredComponent(name)
}
