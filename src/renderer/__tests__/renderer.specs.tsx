import { View, type ViewProps } from 'react-native'

import { getComponent } from '../../utils/render-utils'
import { RenderItem } from '../RenderItem'
import { type SduiComponentConfigurableProps } from '../../types/types'
import { render, screen } from '../../../jest/testing-utils'

// Mock View component with proper typing for props
const MockView = (props: ViewProps & { testID: string }) => <View {...props} />

jest.mock('../../utils/render-utils', () => ({
  getComponent: jest.fn(),
}))

jest.mock('../../sdui-components/base-components/SduiView', () => ({
  SduiView: jest.fn(() => <MockView testID="sdui-view" />),
}))

describe('RenderItem Component', () => {
  const mockComponent: SduiComponentConfigurableProps = {
    components: [
      {
        id: 1,
        name: 'TestComponent',
        components: [],
        styles: {},
        overrides: {},
        data: {},
      },
    ],
  }

  const getComponentMock = getComponent as jest.Mock

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders a child component if provided', () => {
    const TestComponent = jest.fn(() => <View testID="test-component" />)
    getComponentMock.mockReturnValue(TestComponent)

    render(<RenderItem {...mockComponent} />)

    expect(screen.getByTestId('test-component')).toBeTruthy()
    expect(getComponent).toHaveBeenCalledWith('TestComponent')
  })

  it('ensures that each component has a unique key', () => {
    const TestComponent = jest.fn(() => <View testID="test-component" />)
    getComponentMock.mockReturnValue(TestComponent)

    const componentsWithSameId: SduiComponentConfigurableProps = {
      components: [
        { id: 1, name: 'Component1', components: [], styles: {}, data: {} },
        { id: 2, name: 'Component2', components: [], styles: {}, data: {} },
      ],
    }

    render(<RenderItem {...componentsWithSameId} />)

    const renderedComponents = screen.getAllByTestId('test-component')
    expect(renderedComponents.length).toBe(2)
  })

  it('returns null if no components are provided', () => {
    render(<RenderItem components={[]} />)

    expect(screen.queryByTestId('test-component')).toBeNull()
  })
})
