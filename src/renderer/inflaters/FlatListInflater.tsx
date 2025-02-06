import React, { useCallback } from 'react'
import {
  type Component,
  type FlatListInflaterProps,
  type PropData,
} from '../../types/types'
import { getComponent } from '../../utils/render-utils'
import { FlatList, type ViewStyle } from 'react-native'

/**
 * `FlatListInflater` component for rendering a dynamic list of components using `FlatList`.
 *
 * @template T - The type of data that each component will use, extending `PropData`.
 */
export const FlatListInflater = React.memo(
  <T extends PropData>({
    components,
    style,
    data,
    flatListProps, // Optional FlatList props without 'data' and 'renderItem'
  }: FlatListInflaterProps<T>): JSX.Element | null => {
    /**
     * Creates a React component based on the provided configuration and data.
     * The component configuration and optional data are passed to the appropriate UI component.
     *
     * @param {Component} component - The configuration object for the component.
     * @param {T | null} dataItem - The data item associated with the component, or `null` if no data is available.
     * @param {number | string} index - The unique index or key for the component, used for identifying the component in the list.
     *
     * @returns {JSX.Element} - The dynamically rendered component.
     */
    const createComponent = useCallback(
      (component: Component, dataItem: T | null, index: number | string) => {
        const RenderComponent = getComponent(component.name)

        return (
          <RenderComponent
            components={component.components} // Pass any child components
            styles={component.styles} // Apply the component's styles
            overrides={component.overrides || {}} // Apply overrides if provided
            // @ts-ignore
            data={dataItem || component.data || {}} // Pass the component-specific data or an empty object if no data
            key={`${component.name}-${index || 'default'}`} // Unique key for the component
          />
        )
      },
      [] // Empty dependency array ensures the function is memoized and doesn't change between renders
    )

    /**
     * Memoized function to render each item in the `FlatList`.
     * Retrieves the associated data for the component and calls `createComponent`.
     *
     * @param {Object} item - The component configuration for the current list item.
     *
     * @returns {JSX.Element} - The dynamically rendered list item.
     */
    const renderItem = useCallback(
      ({ item }: { item: Component }) => {
        // Retrieve the data for the component based on `dataId` or `name`
        const componentData = data
          ? item.dataId && item.dataId.trim().length > 0
            ? data[item.dataId]
            : data[item.name]
          : null

        // Create the component with the associated data
        return createComponent(item, componentData as T, 'single')
      },
      [data, createComponent] // Dependencies include `data` and `createComponent`
    )

    /**
     * Key extractor for `FlatList`, providing a unique key for each component.
     * Ensures that each component has a stable, unique key for efficient rendering.
     *
     * @param {Component} item - The component configuration.
     * @param {number} index - The index of the component in the list.
     *
     * @returns {string} - The unique key for the component.
     */
    const keyExtractor = useCallback(
      (item: Component, index: number) => `${item.name}-${index}`,
      [] // Memoized function to ensure it doesn't change between renders
    )

    // If there are no components to render, return null to avoid rendering an empty list
    if (!components || components.length === 0) {
      return null
    }

    /**
     * Render the `FlatList` with the provided components and optional props.
     *
     * - `data`: The array of components to render.
     * - `renderItem`: The function used to render each item in the list.
     * - `keyExtractor`: Function that extracts unique keys for each item.
     * - `contentContainerStyle`: Optional style applied to the `FlatList` content container.
     * - `flatListProps`: Additional props to customize `FlatList` behavior, such as scrolling, layout, etc.
     */
    return (
      <FlatList
        data={components}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={style as ViewStyle}
        testID="list-inflater-flatlist" // <-- Add this line for testing purposes
        {...flatListProps}
      />
    )
  }
)
