import { CardComponent } from '../components/CardComponent'
import React from 'react'
import { createComponent } from '../../../src/core/createComponent'
import type { ConfigurableProps } from '@d11/flash-client'

export const AppComponentList: Record<string, React.FC<ConfigurableProps>> = {
  CardComponent: createComponent(CardComponent),
}
