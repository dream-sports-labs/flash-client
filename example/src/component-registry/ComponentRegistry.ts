import type { ConfigurableProps } from 'flash-sdk'
import { CardComponent } from '../components/CardComponent'
import React from 'react'
import { createComponent } from '../../../src/core/createComponent'

export const AppComponentList: Record<string, React.FC<ConfigurableProps>> = {
  CardComponent: createComponent(CardComponent),
}
