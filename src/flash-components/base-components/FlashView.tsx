import { View, type ViewProps, type ViewStyle } from 'react-native'
import { getFlashProps, getFlashStyles } from '../../utils/style-utils'
import { type ConfigurableProps } from '../../types/types'

export const FlashView = <T,>(
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
    getFlashStyles(rest.nativeID, overrides),
    styles?.style ?? {},
  ]

  // Retrieve additional props based on nativeID
  const flashProps = getFlashProps(rest.nativeID, overrides)

  return (
    <View
      {...rest} // Spread the rest of the props, including nativeID
      {...flashProps} // Spread additional props retrieved from getFlashProps
      {...data} // Spread any additional props from data
      style={combinedStyles} // Apply the combined styles
    />
  )
}
