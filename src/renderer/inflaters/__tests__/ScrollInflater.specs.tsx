import React from 'react'

import { Text } from 'react-native'

import { Component, PropData } from '../../../types/types'
import * as renderUtils from '../../../utils/render-utils'
import { ScrollInflater } from '../ScrollInflater'
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

describe('ScrollInflater', () => {
  const mockComponents: Component[] = [
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
      return (props: any) => <MockComponent {...props} name={name} />
    })
  })

  it('should render ScrollView with the correct number of components', async () => {
    const { getByTestId, getAllByText } = render(
      <ScrollInflater components={mockComponents} data={mockData} style={{}} />
    )

    // Verify that ScrollView is rendered
    const scrollView = getByTestId('scroll-inflater-scrollview')
    expect(scrollView).toBeTruthy()

    // Wait for the components to render
    await waitFor(() => {
      const renderedItems = getAllByText(/Data for Component/i)
      expect(renderedItems).toHaveLength(2) // Check for the rendered items
    })
  })

  it('should render null if no components are provided', () => {
    const { queryByTestId } = render(
      <ScrollInflater components={[]} data={mockData} style={{}} />
    )

    // Verify that the ScrollInflater returns null
    const scrollView = queryByTestId('scroll-inflater-scrollview')
    expect(scrollView).toBeNull()
  })

  it('should pass additional ScrollView props', () => {
    const mockOnScroll = jest.fn()

    const { getByTestId } = render(
      <ScrollInflater
        components={mockComponents}
        data={mockData}
        style={{}}
        scrollViewProps={{ onScroll: mockOnScroll }}
      />
    )

    const scrollView = getByTestId('scroll-inflater-scrollview')

    scrollView.props.onScroll()

    expect(mockOnScroll).toHaveBeenCalled()
  })

  it('should handle missing data for components and render fallback', async () => {
    const componentsWithMissingData = [
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

    // Empty data or null data for the components
    const incompleteData = {
      TestComponent1: null, // Missing data for TestComponent1
      // No data for TestComponent2
    }

    const { getByTestId, getByText } = render(
      <ScrollInflater
        components={componentsWithMissingData}
        data={incompleteData}
        style={{}}
      />
    )

    // Verify that ScrollView is rendered
    await waitFor(() =>
      expect(getByTestId('scroll-inflater-scrollview')).toBeTruthy()
    )

    // Check that fallback or default values are rendered for components with missing data
    await waitFor(() => {
      const renderedItem1 = getByText('TestComponent1: Invalid Data')
      expect(renderedItem1).toBeTruthy()

      const renderedItem2 = getByText('TestComponent2: Invalid Data')
      expect(renderedItem2).toBeTruthy()
    })
  })

  it('should return null when there are no components to render', () => {
    const { queryByTestId } = render(
      <ScrollInflater components={null as any} data={{}} style={{}} /> // Pass null or an empty array
    )

    // Verify that ScrollInflater returns null
    const scrollView = queryByTestId('scroll-inflater-scrollview')
    expect(scrollView).toBeNull()
  })

  it('should handle optional scrollViewProps and missing data gracefully in ScrollInflater', async () => {
    const componentsWithMissingData = [
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

    const missingData = {
      TestComponent1: null, // Missing data for TestComponent1
    }

    const { getByTestId, getByText } = render(
      <ScrollInflater
        components={componentsWithMissingData}
        data={missingData}
        style={{}}
      />
    )

    // Verify that ScrollView is rendered even without scrollViewProps
    await waitFor(() =>
      expect(getByTestId('scroll-inflater-scrollview')).toBeTruthy()
    )

    // Check that fallback or default values are rendered for components with missing data
    await waitFor(() => {
      const renderedItem1 = getByText('TestComponent1: Invalid Data')
      const renderedItem2 = getByText('TestComponent2: Invalid Data')
      expect(renderedItem1).toBeTruthy()
      expect(renderedItem2).toBeTruthy()
    })
  })

  it('should pass scrollViewProps if provided', () => {
    const mockOnScroll = jest.fn()

    const { getByTestId } = render(
      <ScrollInflater
        components={mockComponents}
        data={mockData}
        style={{}}
        scrollViewProps={{ onScroll: mockOnScroll }}
      />
    )

    const scrollView = getByTestId('scroll-inflater-scrollview')

    scrollView.props.onScroll()

    expect(mockOnScroll).toHaveBeenCalled()
  })
})
