import React from 'react'

import { render } from '@testing-utils'

import { SduiText } from '../SduiText'
import { getSDUIProps, getSDUIStyles } from '../../../utils/style-utils'
import { Text } from 'react-native'

jest.mock('react-native/Libraries/Text/Text', () => jest.fn(() => null))
jest.mock('../../../utils/style-utils', () => ({
  getSDUIProps: jest.fn(),
  getSDUIStyles: jest.fn(),
}))

describe('SduiText', () => {
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

  const getSduiPropsMock = getSDUIProps as jest.Mock
  const getSDUIStylesMock = getSDUIStyles as jest.Mock

  beforeEach(() => {
    getSduiPropsMock.mockReturnValue({ numberOfLines: 2 })
    getSDUIStylesMock.mockReturnValue({ margin: 10 })
    jest.clearAllMocks()
  })

  it('should render Text with correct props and combined styles', () => {
    render(<SduiText {...defaultProps} />)

    expect(getSDUIProps).toHaveBeenCalledWith(
      mockNativeID,
      mockConfigProps.overrides
    )
    expect(getSDUIStyles).toHaveBeenCalledWith(
      mockNativeID,
      mockConfigProps.overrides
    )

    expect(Text).toHaveBeenCalledWith(
      expect.objectContaining({
        style: [
          defaultProps.style, // Style from props
          mockConfigProps.styles.style, // Style from configProps
          { margin: 10 }, // Style from getSDUIStyles
        ],
        numberOfLines: 2, // From getSDUIProps
        text: 'Sample Text', // From configProps.data
      }),
      {}
    )
  })

  it('should pass the correct content to Text', () => {
    const { rerender } = render(
      <SduiText {...defaultProps}>Child Content</SduiText>
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
      <SduiText {...defaultProps} configProps={updatedConfigProps}>
        Child Content
      </SduiText>
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

    render(<SduiText {...defaultProps} configProps={updatedConfigProps} />)

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

    render(<SduiText {...defaultProps} configProps={updatedConfigProps} />)

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

    render(<SduiText {...defaultProps} configProps={updatedConfigProps} />)

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

    render(<SduiText {...defaultProps} configProps={updatedConfigProps} />)

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

  it('should render children when no text from data or SDUI props is available', () => {
    getSduiPropsMock.mockReturnValue({ numberOfLines: 2 })

    const updatedConfigProps = {
      ...mockConfigProps,
      data: {},
    }

    render(
      <SduiText {...defaultProps} configProps={updatedConfigProps}>
        Child Content
      </SduiText>
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

  it('should render null when no text from data, SDUI props, or children is available', () => {
    getSduiPropsMock.mockReturnValue({ numberOfLines: 2 })

    const updatedConfigProps = {
      ...mockConfigProps,
      data: {},
    }

    render(<SduiText {...defaultProps} configProps={updatedConfigProps} />)

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
