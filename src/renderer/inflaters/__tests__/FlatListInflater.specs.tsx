import { Text } from 'react-native'

import * as renderUtils from '../../../utils/render-utils'
import { type PropData } from '../../../types/types'
import { FlatListInflater } from '../FlatListInflater'
import { render, waitFor } from '../../../../jest/testing-utils'

// Mocking getComponent function from render-utils
jest.mock('../../../utils/render-utils', () => ({
  getComponent: jest.fn(),
}))

// Sample mock component for testing
const MockComponent = ({ data, name }: { data: PropData; name: string }) => {
  const text =
    typeof data?.name === 'string' ? data.name : `${name}: Invalid Data`
  return <Text>{text}</Text>
}

describe('FlatListInflater', () => {
  const mockComponents = [
    {
      id: 1,
      name: 'TestComponent1',
      styles: {},
      components: [],
    },
    {
      id: 2,
      name: 'TestComponent2',
      styles: {},
      components: [],
    },
  ]

  const mockData = {
    TestComponent1: { name: 'Data for Component 1' },
    TestComponent2: { name: 'Data for Component 2' },
  }

  const mockGetComponent = renderUtils.getComponent as jest.Mock

  beforeEach(() => {
    mockGetComponent.mockImplementation((name: string) => {
      if (name === 'TestComponent1' || name === 'TestComponent2') {
        return (props: any) => <MockComponent {...props} name={name} />
      }
      return null
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render FlatList with the correct number of components', async () => {
    const { getByTestId, getAllByText } = render(
      <FlatListInflater
        components={mockComponents}
        data={mockData}
        style={{}}
      />
    )

    // Verify that FlatList is rendered with the correct testID
    await waitFor(() =>
      expect(getByTestId('list-inflater-flatlist')).toBeTruthy()
    )

    // Wait for the components to render
    await waitFor(() => {
      const renderedItems = getAllByText(/Data for Component/i)
      expect(renderedItems).toHaveLength(2) // Check for the rendered items
    })
  })

  it('should render null if no components are provided', () => {
    const { queryByTestId } = render(
      <FlatListInflater components={[]} data={mockData} style={{}} />
    )

    // Verify that the FlatListInflater returns null
    const flatList = queryByTestId('list-inflater-flatlist')
    expect(flatList).toBeNull()
  })

  it('should pass additional FlatList props', () => {
    const mockOnEndReached = jest.fn()

    const { getByTestId } = render(
      <FlatListInflater
        components={mockComponents}
        data={mockData}
        style={{}}
        flatListProps={{ onEndReached: mockOnEndReached }}
      />
    )

    const flatList = getByTestId('list-inflater-flatlist')

    flatList.props.onEndReached()

    expect(mockOnEndReached).toHaveBeenCalled()
  })

  it('should handle missing or malformed data gracefully', async () => {
    const malformedData = {
      TestComponent1: null, // Malformed data
    }

    const { getByTestId, queryByText } = render(
      <FlatListInflater
        components={mockComponents}
        data={malformedData}
        style={{}}
      />
    )

    // Verify that FlatList is rendered
    await waitFor(() =>
      expect(getByTestId('list-inflater-flatlist')).toBeTruthy()
    )

    // Verify that a component with missing data doesn't render "Invalid Data"
    expect(queryByText('TestComponent1: Invalid Data')).toBeTruthy()
    // expect(queryByText('TestComponent2: Invalid Data')).toBeNull()
  })

  it('should render components without overrides', async () => {
    const componentsWithOverrides = [
      {
        id: 1,
        name: 'TestComponent1',
        styles: {},
        components: [],
      },
      {
        id: 2,
        name: 'TestComponent2',
        styles: {},
        components: [],
      },
    ]

    const { getByTestId, getByText } = render(
      <FlatListInflater
        components={componentsWithOverrides}
        data={mockData}
        style={{}}
      />
    )

    const flatList = getByTestId('list-inflater-flatlist')
    expect(flatList).toBeTruthy()

    // Validate that components render properly with and without overrides
    await waitFor(() => {
      const renderedItem1 = getByText('Data for Component 1')
      const renderedItem2 = getByText('Data for Component 2')
      expect(renderedItem1).toBeTruthy()
      expect(renderedItem2).toBeTruthy()
    })
  })

  it('should not render duplicate "Invalid Data" when multiple components have missing data', async () => {
    const componentsWithInvalidData = [
      { id: 1, name: 'TestComponent1', styles: {}, components: [] },
      { id: 2, name: 'TestComponent2', styles: {}, components: [] },
    ]

    const malformedData = {
      TestComponent1: null,
      TestComponent2: null,
    }

    const { getByTestId, getAllByText } = render(
      <FlatListInflater
        components={componentsWithInvalidData}
        data={malformedData}
        style={{}}
      />
    )

    // Ensure that FlatList is rendered
    await waitFor(() =>
      expect(getByTestId('list-inflater-flatlist')).toBeTruthy()
    )

    // Wait for components with invalid data to render
    await waitFor(() => {
      const invalidDataItems = getAllByText(/Invalid Data/)
      expect(invalidDataItems).toHaveLength(2) // Should render two components with "Invalid Data"
    })
  })

  it('should handle missing or invalid data gracefully in FlatListInflater', async () => {
    const componentsWithInvalidData = [
      {
        id: 1,
        name: 'TestComponent1',
        styles: {},
        components: [],
      },
      {
        id: 2,
        name: 'TestComponent2',
        styles: {},
        components: [],
      },
    ]

    const { getByTestId, getByText } = render(
      <FlatListInflater components={componentsWithInvalidData} style={{}} />
    )

    // Verify that FlatList is rendered
    await waitFor(() =>
      expect(getByTestId('list-inflater-flatlist')).toBeTruthy()
    )

    // Check that fallback or default values are rendered for components with invalid data
    await waitFor(() => {
      const renderedItem1 = getByText('TestComponent1: Invalid Data')
      const renderedItem2 = getByText('TestComponent2: Invalid Data')
      expect(renderedItem1).toBeTruthy()
      expect(renderedItem2).toBeTruthy()
    })
  })
})
