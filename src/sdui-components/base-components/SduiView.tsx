import React from 'react'

import { View, type ViewProps, type ViewStyle } from 'react-native'
import { getSDUIProps, getSDUIStyles } from '../../utils/style-utils'
import { type ConfigurableProps } from '../../types/types'

export const SduiView = <T,>(
  props: Omit<ViewProps, 'nativeID'> & {
    nativeID: string
    configProps: ConfigurableProps<T>
  }
) => {
  const { configProps, ...rest } = props
  const { styles, overrides, data } = configProps

  // Combine styles from various sources
  const combinedStyles: ViewStyle[] = [
    rest.style as ViewStyle,
    getSDUIStyles(rest.nativeID, overrides),
    styles?.style ?? {},
  ]

  // Retrieve additional props based on nativeID
  const sduiProps = getSDUIProps(rest.nativeID, overrides)

  return (
    <View
      {...rest} // Spread the rest of the props, including nativeID
      {...sduiProps} // Spread additional props retrieved from getSDUIProps
      {...data} // Spread any additional props from data
      style={combinedStyles} // Apply the combined styles
    />
  )
}
