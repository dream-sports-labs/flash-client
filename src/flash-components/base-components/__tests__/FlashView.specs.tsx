import { FlashView } from '../FlashView'
import { getFlashProps, getFlashStyles } from '../../../utils/style-utils'
import { render } from '../../../../jest/testing-utils'

jest.mock('../../../utils/style-utils', () => ({
  getFlashProps: jest.fn(),
  getFlashStyles: jest.fn(),
}))

describe('FlashView', () => {
  const mockNativeID = 'test-native-id'
  const mockConfigProps = {
    styles: { style: { margin: 20 } },
    overrides: {},
    data: { accessibilityRole: 'button' },
  }

  const defaultProps = {
    nativeID: mockNativeID,
    configProps: mockConfigProps,
    style: { padding: 10 },
  }

  const getFlashPropsMock = getFlashProps as jest.Mock
  const getFlashStylesMock = getFlashStyles as jest.Mock

  beforeEach(() => {
    getFlashPropsMock.mockReturnValue({ collapsable: false })
    getFlashStylesMock.mockReturnValue({ marginBottom: 15 })
  })

  it('should render View with correct combined styles and props', () => {
    const { getByTestId } = render(
      <FlashView {...defaultProps} testID="flash-view" />
    )

    expect(getFlashProps).toHaveBeenCalledWith(
      mockNativeID,
      mockConfigProps.overrides
    )
    expect(getFlashStyles).toHaveBeenCalledWith(
      mockNativeID,
      mockConfigProps.overrides
    )

    const view = getByTestId('flash-view')

    expect(view.props.style).toEqual([
      { padding: 10 }, // from defaultProps
      { marginBottom: 15 }, // from getFlashStyles
      { margin: 20 }, // from configProps.styles
    ])

    expect(view.props.collapsable).toBe(false) // from getFlashProps
    expect(view.props.accessibilityRole).toBe('button') // from configProps.data
  })

  it('should merge and apply styles in the correct order', () => {
    const { getByTestId } = render(
      <FlashView {...defaultProps} testID="flash-view" />
    )

    const view = getByTestId('flash-view')

    // The combinedStyles should include all styles from props, getFlashStyles, and configProps
    expect(view.props.style).toEqual([
      { padding: 10 }, // from defaultProps
      { marginBottom: 15 }, // from getFlashStyles
      { margin: 20 }, // from configProps.styles
    ])
  })

  it('should apply additional props from data', () => {
    const { getByTestId } = render(
      <FlashView {...defaultProps} testID="flash-view" />
    )

    const view = getByTestId('flash-view')

    // Ensure additional props from configProps.data are applied
    expect(view.props.accessibilityRole).toBe('button') // from configProps.data
  })
})
