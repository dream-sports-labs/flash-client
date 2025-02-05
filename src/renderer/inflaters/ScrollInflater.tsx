import React, { useMemo } from 'react'

import {
  type Component,
  type PropData,
  type ScrollInflaterProps,
} from '../../types/types'
import { useCallback } from 'react'
import { getComponent } from '../../utils/render-utils'
import { ScrollView } from 'react-native'

/**
 * `ScrollInflater` is a memoized React component that dynamically renders a scrollable list of components
 * based on the provided data and component configuration.
 *
 * @template T - The type of data that each component will use, extending `PropData`.
 *
 * @param {ScrollInflaterProps<T>} props - The properties for the `ScrollInflater` component.
 * @param {Component[]} props.components - An array of components to be rendered.
 * @param {ViewStyle} [props.style] - Optional style to be applied to the `ScrollView`.
 * @param {Record<string, T>} [props.data] - Optional data to be bound to the components.
 * @param {ScrollViewProps} [props.scrollViewProps] - Optional props to be spread into the root `ScrollView`.
 *
 * @returns {JSX.Element | null} - A `ScrollView` containing the dynamically created components, or `null` if there are no components to render.
 */
export const ScrollInflater = React.memo(
  <T extends PropData>({
    components,
    style,
    data,
    scrollViewProps,
  }: ScrollInflaterProps<T>): JSX.Element | null => {
    /**
     * Creates a component based on the provided configuration and data.
     *
     * @param {Component} component - The configuration of the component.
     * @param {T | null} dataItem - The data item to be passed to the component, or `null` if no data is available.
     * @param {number | string} index - The index or unique key for the component.
     *
     * @returns {JSX.Element} - The rendered component.
     */
    const createComponent = useCallback(
      (component: Component, dataItem: T | null, index: number | string) => {
        const RenderComponent = getComponent(component.name)

        return (
          <RenderComponent
            components={component.components}
            style={component.styles}
            overrides={component.overrides || {}}
            // @ts-ignore
            data={dataItem || component.data || {}}
            key={`${component.name}-${index || 'default'}`}
          />
        )
      },
      []
    )

    // Create components based on component configuration and data
    const renderedComponents = useMemo(() => {
      if (!components) {
        return []
      }

      return components
        .flatMap((component) => {
          const componentData = data
            ? component.dataId && component.dataId.trim().length > 0
              ? data[component.dataId]
              : data[component.name]
            : null

          if (componentData) {
            return createComponent(component, componentData as T, 'single')
          }

          // Handle default case with null data
          return createComponent(component, null, 'default')
        })
        .filter(Boolean) as JSX.Element[] // Remove null values
    }, [components, data, createComponent])

    // Return null if there are no components to render
    if (renderedComponents.length === 0) {
      return null
    }

    // Render the scrollable view with the created components
    return (
      <ScrollView
        style={style}
        testID="scroll-inflater-scrollview"
        {...scrollViewProps}
      >
        {renderedComponents}
      </ScrollView>
    )
  }
)
