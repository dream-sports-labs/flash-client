import { SduiView } from '../SduiView'
import { getSDUIProps, getSDUIStyles } from '../../../utils/style-utils'
import { render } from '../../../../jest/testing-utils'

jest.mock('../../../utils/style-utils', () => ({
  getSDUIProps: jest.fn(),
  getSDUIStyles: jest.fn(),
}))

describe('SduiView', () => {
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

  const getSduiPropsMock = getSDUIProps as jest.Mock
  const getSDUIStylesMock = getSDUIStyles as jest.Mock

  beforeEach(() => {
    getSduiPropsMock.mockReturnValue({ collapsable: false })
    getSDUIStylesMock.mockReturnValue({ marginBottom: 15 })
  })

  it('should render View with correct combined styles and props', () => {
    const { getByTestId } = render(
      <SduiView {...defaultProps} testID="sdui-view" />
    )

    expect(getSDUIProps).toHaveBeenCalledWith(
      mockNativeID,
      mockConfigProps.overrides
    )
    expect(getSDUIStyles).toHaveBeenCalledWith(
      mockNativeID,
      mockConfigProps.overrides
    )

    const view = getByTestId('sdui-view')

    expect(view.props.style).toEqual([
      { padding: 10 }, // from defaultProps
      { marginBottom: 15 }, // from getSDUIStyles
      { margin: 20 }, // from configProps.styles
    ])

    expect(view.props.collapsable).toBe(false) // from getSDUIProps
    expect(view.props.accessibilityRole).toBe('button') // from configProps.data
  })

  it('should merge and apply styles in the correct order', () => {
    const { getByTestId } = render(
      <SduiView {...defaultProps} testID="sdui-view" />
    )

    const view = getByTestId('sdui-view')

    // The combinedStyles should include all styles from props, getSDUIStyles, and configProps
    expect(view.props.style).toEqual([
      { padding: 10 }, // from defaultProps
      { marginBottom: 15 }, // from getSDUIStyles
      { margin: 20 }, // from configProps.styles
    ])
  })

  it('should apply additional props from data', () => {
    const { getByTestId } = render(
      <SduiView {...defaultProps} testID="sdui-view" />
    )

    const view = getByTestId('sdui-view')

    // Ensure additional props from configProps.data are applied
    expect(view.props.accessibilityRole).toBe('button') // from configProps.data
  })
})
