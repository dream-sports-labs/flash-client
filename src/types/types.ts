import {
  type FlatListProps,
  type ImageStyle,
  type ScrollViewProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native'

/**
 * Represents a single component in the SDUI (Server-Driven UI) structure.
 *
 * - `id`: A unique identifier for the component, used for distinguishing between different components.
 * - `name`: The name of the component, which typically corresponds to a specific UI element or a custom component type.
 * - `child`: An optional array of child components. This allows for hierarchical UI structures where components contain other components, enabling composability.
 * - `styles`: An optional object that defines the styling properties for the component. This can include styles like `ViewStyle`, `ImageStyle`, and `TextStyle` that are used to control the appearance of the component.
 * - `overrides`: An optional object that allows for overriding the styles and props of specific child components or elements. Overrides are particularly useful when you need to customize the appearance or behavior of a component without modifying the original component structure.
 * - `data`: An optional object containing the data required by the component. This can include static text, numeric values, or other data that the component needs to render correctly.
 * - `version`: A string indicating the version of the component. This can be used to manage different versions of components and ensure compatibility between the server and client.
 * - `dataId`: A string representing the data identifier for the component. This can be used to uniquely identify the data associated with the component.
 */
export type Component = {
  readonly id?: number
  readonly name: string
  readonly components?: Array<Component>
  readonly styles?: Style
  readonly overrides?: Overrides
  readonly data?: PropData
  readonly version?: string
  readonly dataId?: string
}

/**
 * Represents a collection of style overrides.
 *
 * - `key`: Represents a specific component or element within a component (often identified by a `nativeId`).
 *   The value is an `OverrideStyle` object that defines the props and styles to override for that component or element.
 */
export type Overrides = {
  [key: string]: OverrideStyle
}

/**
 * Represents a collection of style overrides and event-based actions.
 *
 * - `props`: An optional object containing props that override the original props of the component.
 * - `styles`: An optional object that defines styles to override the original styles of the component.
 */
export type OverrideStyle = {
  readonly props?: PropData
  readonly styles?: Style
}

/**
 * Represents a generic style object that can be used for a component.
 *
 * - `key`: The name of the style property (e.g., "backgroundColor", "padding").
 *   The value can be one of the React Native style types (`ViewStyle`, `ImageStyle`, or `TextStyle`),
 *   which are used to define how the component should be visually presented.
 */
export type Style = {
  [key: string]: ViewStyle | ImageStyle | TextStyle
}

/**
 * Represents configurable properties that can be passed to a component.
 *
 * - `child`: An optional array of child components. This allows for the nesting of components, enabling complex UI structures.
 * - `styles`: An optional object that defines the styling for the component. This allows the component to be visually customized.
 * - `overrides`: An optional object that allows for overriding the styles and props of child components. This is useful for dynamic customization based on server data.
 * - `data`: An optional generic type (`T`) that contains the data required by the component. This could include text, numbers, or other types of data that the component needs to render.
\ *
 * @template T - The type of the data prop. Defaults to `never` if not specified.
 */
export type ConfigurableProps<T = never> = {
  readonly components?: Array<Component>
  readonly styles?: Style
  readonly overrides?: Overrides
  readonly data?: T
}

/**
 * Extends `ConfigurableProps` to include the `children` prop, allowing React elements to be passed as children.
 *
 * - `children`: An optional React element to be rendered as a child of the component.
 *
 * @template T - The type of the data prop. Defaults to `never` if not specified.
 */
export type SduiComponentConfigurableProps<T = never> = ConfigurableProps<T> & {
  readonly children?: JSX.Element
}

/**
 * Represents the data that can be passed to a component's `data` prop.
 *
 * - `key`: The name of the data field (e.g., "text", "number").
 *   The value can be of several types, including `boolean`, `number`, `string`, `null`, or another `PropData` object.
 *   This allows for nested data structures, which can be used to represent complex component configurations.
 */
export type PropData = {
  [key: string]:
    | boolean
    | number
    | string
    | null
    | PropData
    | Array<PropData | string | boolean | number>
}

/**
 * Represents the base configurable properties for an inflater component.
 *
 * Inflaters are used to dynamically manage and render components in different configurations.
 *
 * - `child`: An optional array of child components. This allows inflaters to manage nested components.
 * - `style`: An optional object defining the styling for the inflater component.
 * - `overrides`: An optional object for overriding the styles and props of child components within the inflater.
 * - `data`: An optional generic type (`T`) representing the data required by the inflater component.
 *
 * @template T - The type of the data prop. Defaults to `never` if not specified.
 */
export type BaseInflaterProps<T extends PropData | never = never> = {
  readonly components?: Array<Component>
  readonly style?: ViewStyle
  readonly overrides?: Overrides
  readonly data?: T
}

/**
 * Extends the base inflater properties with additional properties specific to `FlatListInflater`.
 *
 * - `flatListProps`: Optional props that will be passed to the underlying `FlatList` component.
 *   These props allow for customizing the behavior and appearance of the `FlatList`, such as enabling horizontal scrolling,
 *   setting the number of columns, or handling scroll events.
 *   Note that the `data` and `renderItem` props are managed internally by `FlatListInflater` and cannot be overridden.
 *
 * @template T - The type of the data prop used in the list, extending `PropData`.
 */
export type FlatListInflaterProps<T extends PropData> = BaseInflaterProps<T> & {
  readonly flatListProps?: Omit<FlatListProps<Component>, 'data' | 'renderItem'>
}

/**
 * Extends the base inflater properties with additional properties specific to ScrollInflater.
 *
 * - `scrollViewProps`: An optional object containing props to be spread into the root `ScrollView`.
 *
 * @template T - The type of the data prop used in the scroll inflater.
 */
export type ScrollInflaterProps<T extends PropData> = BaseInflaterProps<T> & {
  readonly scrollViewProps?: ScrollViewProps
}
