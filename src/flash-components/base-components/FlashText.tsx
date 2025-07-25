import { type ReactNode } from 'react'

import { Text, type TextProps } from 'react-native'

import { getFlashProps, getFlashStyles } from '../../utils/style-utils'
import { type ConfigurableProps } from 'flash-client'

// Helper function to filter values that are string, number, null or object and ignore other types
const filterContent = (value: unknown): string | number | null | undefined => {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    value === null
  ) {
    return value as string | number | null
  }
  return undefined
}

// Function to determine the final content to render
const getContentToRender = (
  labelFromFlashProps: string | number | null | undefined,
  labelFromData: string | number | null | undefined,
  children: ReactNode
): ReactNode => {
  return (
    filterContent(labelFromFlashProps) ??
    filterContent(labelFromData) ??
    children ??
    null
  )
}

export const FlashText = <T,>(
  props: Omit<TextProps, 'nativeID'> & {
    nativeID: string
    configProps: ConfigurableProps<T>
  }
) => {
  const { configProps, children, ...rest } = props
  const { styles, overrides, data } = configProps

  // Combine styles from various sources
  const combinedStyles = [
    rest.style,
    styles?.style ?? {},
    getFlashStyles(rest.nativeID, overrides),
  ]

  // Retrieve additional props based on nativeID
  const flashProps = getFlashProps(rest.nativeID, overrides)

  // Destructure and exclude `text` from `flashProps`
  const { text: textFromFlashProps, ...remainingFlashProps } = flashProps || {}

  // Extract text from data and filter it to ensure correct type
  const textFromData = filterContent((data as Partial<{ text: unknown }>)?.text)

  // Get the final content to render using the helper function
  const contentToRender: ReactNode = getContentToRender(
    filterContent(textFromFlashProps),
    textFromData,
    children
  )

  return (
    <Text
      {...rest} // Spread the rest of the props, including nativeID
      {...remainingFlashProps} // Spread additional props retrieved from getFlashProps, excluding `text`
      {...data} // Spread any additional props from data
      style={combinedStyles} // Apply the combined styles
      children={contentToRender}
    />
  )
}
