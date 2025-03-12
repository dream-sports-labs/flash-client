import React from 'react'
import { type ConfigurableProps } from '../types/types'

export function createComponent<T>(
  Component: React.ComponentType<any>,
  defaultNativeID?: string,
  isBaseComponent = false
): React.FC<ConfigurableProps<T>> {
  return (props: ConfigurableProps<T>) => {
    if (isBaseComponent) {
      return (
        <Component {...props} nativeID={defaultNativeID} configProps={props} />
      )
    }
    return <Component {...props} />
  }
}
