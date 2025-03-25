import { FlashImage } from '../FlashImage'
import { getFlashProps, getFlashStyles } from '../../../utils/style-utils'
import { Image } from 'react-native'
import { render } from '../../../../jest/testing-utils'

jest.mock('react-native/Libraries/Image/Image', () => jest.fn(() => null))
jest.mock('../../../utils/style-utils', () => ({
  getFlashProps: jest.fn(),
  getFlashStyles: jest.fn(),
}))

describe('FlashImage', () => {
  const mockNativeID = 'test-native-id'

  const mockConfigProps = {
    styles: { style: { width: 100, height: 100 } },
    overrides: {},
    data: { source: { uri: 'test-source' } }, // Correct format for React Native Image
  }

  const defaultProps = {
    nativeID: mockNativeID,
    configProps: mockConfigProps,
    style: { borderRadius: 10 },
  }
  const getFlashPropsMock = getFlashProps as jest.Mock
  const getFlashStylesMock = getFlashStyles as jest.Mock

  beforeEach(() => {
    getFlashPropsMock.mockReturnValue({ resizeMode: 'contain' })
    getFlashStylesMock.mockReturnValue({ margin: 5 })
  })

  it('should render Image with correct props and styles', () => {
    render(<FlashImage {...defaultProps} />)

    expect(getFlashProps).toHaveBeenCalledWith(
      mockNativeID,
      mockConfigProps.overrides
    )
    expect(getFlashStyles).toHaveBeenCalledWith(
      mockNativeID,
      mockConfigProps.overrides
    )

    // Verify Image component is rendered with combined styles and correct props
    expect(Image).toHaveBeenCalledWith(
      expect.objectContaining({
        style: [
          defaultProps.style, // style from props
          mockConfigProps.styles.style, // style from configProps
          { margin: 5 }, // style from getFlashStyles
        ],
        resizeMode: 'contain', // from getFlashProps
        source: { uri: 'test-source' }, // from configProps data
      }),
      {}
    )
  })

  it('should merge styles correctly', () => {
    render(<FlashImage {...defaultProps} />)

    // Assert that Image is passed the correct merged styles
    const expectedStyles = [
      defaultProps.style, // props styles
      mockConfigProps.styles.style, // configProps styles
      { margin: 5 }, // styles from getFlashStyles
    ]

    expect(Image).toHaveBeenCalledWith(
      expect.objectContaining({
        style: expectedStyles,
      }),
      {}
    )
  })

  it('should pass dynamic data as props to Image', () => {
    render(<FlashImage {...defaultProps} />)

    // Verify that dynamic data from configProps is passed to Image
    expect(Image).toHaveBeenCalledWith(
      expect.objectContaining({
        source: { uri: 'test-source' },
      }),
      {}
    )
  })
})
