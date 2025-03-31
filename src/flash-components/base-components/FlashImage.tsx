import { Image, type ImageProps } from 'react-native'
import { getFlashProps, getFlashStyles } from '../../utils/style-utils'
import { type ConfigurableProps } from 'flash-client'

type FlashImageProps<T> = ImageProps & {
  nativeID: string
  configProps: ConfigurableProps<T>
}

// Helper function to replace `uri` with `source: { uri }` if `uri` is valid
const wrappedUriIntoSource = (props: { uri?: string } | undefined) => {
  if (props && typeof props.uri === 'string' && props.uri.trim() !== '') {
    const { uri, ...rest } = props
    return { ...rest, source: { uri } }
  }
  return props
}

export const FlashImage = <T,>(props: FlashImageProps<T>) => {
  const { configProps, ...rest } = props
  const { styles, overrides, data } = configProps

  // Combine styles from props, overrides, and configProps styles
  const combinedStyles = [
    rest.style,
    styles?.style ?? {},
    getFlashStyles(rest.nativeID, overrides),
  ]

  // Retrieve and transform additional props based on nativeID
  const flashProps = wrappedUriIntoSource(
    getFlashProps(rest.nativeID, overrides)
  )

  // Transform data to include source instead of uri if necessary
  const dataWithSource =
    typeof data === 'object' && data !== null
      ? wrappedUriIntoSource(data as { uri?: string })
      : data

  return (
    <Image
      {...rest} // Spread rest of the props, including nativeID, but excluding configProps
      {...flashProps} // Spread additional props with modified source if uri is present
      {...dataWithSource} // Spread data with modified source if uri is present
      style={combinedStyles as never} // Apply the merged styles
    />
  )
}
