import { FlashText } from '../FlashText'
import { getFlashProps, getFlashStyles } from '../../../utils/style-utils'
import { Text } from 'react-native'
import { render } from '../../../../jest/testing-utils'

jest.mock('react-native/Libraries/Text/Text', () => jest.fn(() => null))
jest.mock('../../../utils/style-utils', () => ({
  getFlashProps: jest.fn(),
  getFlashStyles: jest.fn(),
}))

describe('FlashText', () => {
  const mockNativeID = 'test-native-id'
  const mockConfigProps = {
    styles: { style: { fontSize: 16 } },
    overrides: {},
    data: { text: 'Sample Text' },
  }

  const defaultProps = {
    nativeID: mockNativeID,
    configProps: mockConfigProps,
    style: { color: 'blue' },
  }

  const getFlashPropsMock = getFlashProps as jest.Mock
  const getFlashStylesMock = getFlashStyles as jest.Mock

  beforeEach(() => {
    getFlashPropsMock.mockReturnValue({ numberOfLines: 2 })
    getFlashStylesMock.mockReturnValue({ margin: 10 })
    jest.clearAllMocks()
  })

  it('should render Text with correct props and combined styles', () => {
    render(<FlashText {...defaultProps} />)

    expect(getFlashProps).toHaveBeenCalledWith(
      mockNativeID,
      mockConfigProps.overrides
    )
    expect(getFlashStyles).toHaveBeenCalledWith(
      mockNativeID,
      mockConfigProps.overrides
    )

    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        style: [
          defaultProps.style, // Style from props
          mockConfigProps.styles.style, // Style from configProps
          { margin: 10 }, // Style from getFlashStyles
        ],
        numberOfLines: 2, // From getFlashProps
        text: 'Sample Text', // From configProps.data
      }),
      {}
    )
  })

  it('should pass the correct content to Text', () => {
    const { rerender } = render(
      <FlashText {...defaultProps}>Child Content</FlashText>
    )

    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        children: 'Sample Text', // Text from configProps.data takes precedence
      }),
      {}
    )

    // Rerender without `data.text` to see if children are rendered
    const updatedConfigProps = {
      ...mockConfigProps,
      data: {},
    }
    rerender(
      <FlashText {...defaultProps} configProps={updatedConfigProps}>
        Child Content
      </FlashText>
    )

    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        children: 'Child Content', // Children should be rendered now
      }),
      {}
    )
  })

  it('should handle the absence of data and children', () => {
    const updatedConfigProps = {
      styles: { style: { fontSize: 16 } },
      overrides: {},
      data: {}, // No text data
    }

    render(<FlashText {...defaultProps} configProps={updatedConfigProps} />)

    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        children: null, // No data or children, so null should be passed
      }),
      {}
    )
  })

  it('should return null for children when no matching translation and no default is provided', () => {
    const localizedValue = {
      'hi-IN': 'नमस्ते',
    }

    const updatedConfigProps = {
      ...mockConfigProps,
      data: { text: localizedValue },
    }

    render(<FlashText {...defaultProps} configProps={updatedConfigProps} />)

    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        style: [
          defaultProps.style,
          mockConfigProps.styles.style,
          { margin: 10 },
        ],
        children: null,
        nativeID: mockNativeID,
        numberOfLines: 2,
      }),
      {}
    )
  })

  it('should handle empty object value and render null children', () => {
    const localizedValue = {}

    const updatedConfigProps = {
      ...mockConfigProps,
      data: { text: localizedValue },
    }

    render(<FlashText {...defaultProps} configProps={updatedConfigProps} />)

    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        style: [
          defaultProps.style,
          mockConfigProps.styles.style,
          { margin: 10 },
        ],
        children: null,
        nativeID: mockNativeID,
        numberOfLines: 2,
      }),
      {}
    )
  })

  it('should handle null value and render null children', () => {
    const updatedConfigProps = {
      ...mockConfigProps,
      data: { text: null },
    }

    render(<FlashText {...defaultProps} configProps={updatedConfigProps} />)

    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        style: [
          defaultProps.style,
          mockConfigProps.styles.style,
          { margin: 10 },
        ],
        children: null,
        nativeID: mockNativeID,
        numberOfLines: 2,
      }),
      {}
    )
  })

  it('should render children when no text from data or Flash props is available', () => {
    getFlashPropsMock.mockReturnValue({ numberOfLines: 2 })

    const updatedConfigProps = {
      ...mockConfigProps,
      data: {},
    }

    render(
      <FlashText {...defaultProps} configProps={updatedConfigProps}>
        Child Content
      </FlashText>
    )

    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        style: [
          defaultProps.style,
          mockConfigProps.styles.style,
          { margin: 10 },
        ],
        children: 'Child Content',
        nativeID: mockNativeID,
        numberOfLines: 2,
      }),
      {}
    )
  })

  it('should render null when no text from data, Flash props, or children is available', () => {
    getFlashPropsMock.mockReturnValue({ numberOfLines: 2 })

    const updatedConfigProps = {
      ...mockConfigProps,
      data: {},
    }

    render(<FlashText {...defaultProps} configProps={updatedConfigProps} />)

    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        style: [
          defaultProps.style,
          mockConfigProps.styles.style,
          { margin: 10 },
        ],
        children: null,
        nativeID: mockNativeID,
        numberOfLines: 2,
      }),
      {}
    )
  })
})
