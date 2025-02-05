import React, { type ReactNode } from 'react'

import { Text, type TextProps } from 'react-native'

import { getSDUIProps, getSDUIStyles } from '../../utils/style-utils'
import { type ConfigurableProps } from 'react-native-server-driven-ui'

// Helper function to filter values that are string, number, null or object and ignore other types
const filterContent = (value: unknown): string | number | null | undefined => {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    value === null
  ) {
    return value
  }
  return undefined
}

// Function to determine the final content to render
const getContentToRender = (
  labelFromSDUIProps: string | number | null | undefined,
  labelFromData: string | number | null | undefined,
  children: ReactNode
): ReactNode => {
  return (
    filterContent(labelFromSDUIProps) ??
    filterContent(labelFromData) ??
    children ??
    null
  )
}

export const SduiText = <T,>(
  props: Omit<TextProps, 'nativeID'> & {
    nativeID: string
    configProps: ConfigurableProps<T>
  },
  ref: React.ForwardedRef<Text>
) => {
  const { configProps, children, ...rest } = props
  const { styles, overrides, data } = configProps

  // Combine styles from various sources
  const combinedStyles = [
    rest.style,
    styles?.style ?? {},
    getSDUIStyles(rest.nativeID, overrides),
  ]

  // Retrieve additional props based on nativeID
  const sduiProps = getSDUIProps(rest.nativeID, overrides)

  // Destructure and exclude `text` from `sduiProps`
  const { text: textFromSDUIProps, ...remainingSduiProps } = sduiProps || {}

  // Extract text from data and filter it to ensure correct type
  const textFromData = filterContent((data as Partial<{ text: unknown }>)?.text)

  // Get the final content to render using the helper function
  const contentToRender: ReactNode = getContentToRender(
    filterContent(textFromSDUIProps),
    textFromData,
    children
  )

  return (
    <Text
      {...rest} // Spread the rest of the props, including nativeID
      {...remainingSduiProps} // Spread additional props retrieved from getSDUIProps, excluding `text`
      {...data} // Spread any additional props from data
      ref={ref} // Forward ref
      style={combinedStyles} // Apply the combined styles
      children={contentToRender}
    />
  )
}
