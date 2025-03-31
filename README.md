# ⚡ Flash Client — Server-Driven UI for React Native

**Flash Client** enables fully dynamic, server-controlled UIs in React Native using JSON-based configuration.
It lets you change your app layout, styling, and behavior — without a new app release.

> Push UI updates from backend ➡ Render them on app instantly using `FlashComponent` + Inflaters

---

## 📦 What is Flash?

Flash is a Server-Driven UI (SDUI) framework that uses a **render engine + inflater system** to interpret backend JSON into real, functional UI in React Native.

- Supports both simple and complex layouts
- Enables styling and prop overrides on baked components
- Works with dynamic lists, scroll views, tabs, etc.
- Powers reusable, templatized, data-driven UI blocks

---

## 📐 Specs: Core Flash Schema

Every UI element is defined as a `Component` in JSON. Here are the key types:

### `Component`

```ts
type Component = {
  id?: number;
  name: string;
  components?: Array<Component>; // Children
  styles?: Style;
  overrides?: Overrides;
  data?: PropData;
  version?: string;
  dataId?: string;
}
```

### `Style`, `PropData`, `Overrides`

```ts
type Style = {
  [key: string]: ViewStyle | TextStyle | ImageStyle;
}

type PropData = {
  [key: string]: string | number | boolean | null | PropData | Array<PropData>;
}

type Overrides = {
  [nativeId: string]: {
    props?: PropData;
    styles?: Style;
  };
}
```

### `ConfigurableProps<T>`

Every Flash-compatible component must accept these props:

```ts
type ConfigurableProps<T = never> = {
  components?: Array<Component>;
  style?: ViewStyle;
  overrides?: Overrides;
  data?: T;
}
```

---

## 💡 Capabilities of Flash

### ⚡ `FlashComponent`
Renders any component or layout block directly from backend JSON.
Works for both registered and baked components.

---

### ✅ Dynamic Styles & Props

Customize any component at runtime via JSON.

```json
{
  "name": "FlashText",
  "data": { "text": "Welcome!" },
  "styles": {
    "style": { "fontSize": 16, "color": "#000" }
  }
}
```

---

### 🧬 Component Overrides

Modify pre-baked components using `overrides` + `nativeID`.

```json
"overrides": {
  "button-title-id": {
    "props": { "text": "Overridden" },
    "styles": { "style": { "color": "#FF0000" } }
  }
}
```

---

### 🔀 Layout Control

Add, remove, or reorder child components dynamically using Inflaters.

---

### 🧱 Inflaters

Render structured layouts defined in backend:

| Inflater             | Use Case                      |
|----------------------|-------------------------------|
| `ScrollViewInflater` | Scrollable sections           |
| `FlatListInflater`   | Lists, carousels, feed blocks |

---

## 🛠️ Making Components Flash-Compatible

Flash-compatible components use `ConfigurableProps` and Flash base components (`FlashText`, `FlashView`, etc.) with `nativeID`.

### ❌ Regular Component

```tsx
const FooterButton = ({ text, onPress }) => (
  <Pressable onPress={onPress}>
    <Text>{text}</Text>
  </Pressable>
)
```

---

### ✅ Flash-Compatible Component

```tsx
import { FlashPressable, FlashText } from 'flash-client'

const FooterButtonFlash = (props: ConfigurableProps) => {
  const { data } = props
  const testId = data?.testId

  return (
    <FlashPressable
      nativeID={`${testId}-button-container`}
      onPress={data?.onPress}
      configProps={props}
    >
      <FlashText
        nativeID={`${testId}-button-title`}
        configProps={props}
      >
        {data?.text}
      </FlashText>
    </FlashPressable>
  )
}
```

> ⚠️ `nativeID` is **mandatory** if you want to override props or styles dynamically

---

## 🔁 Using Inflaters

Inflaters decode backend layout structure and render dynamic children.

### 🌀 ScrollViewInflater

```tsx
<ScrollViewInflater
  components={layout.components}
  style={layout.styles}
  scrollViewProps={{
    showsVerticalScrollIndicator: false
  }}
/>
```

---

### 📋 FlatListInflater

```tsx
<FlatListInflater
  components={layout.components}
  data={layout.data}
  style={layout.styles}
  flatListProps={{ horizontal: true }}
/>
```

> Can be used on screen-level or nested inside other components.

---

## 🧾 What is FlashComponent?

`FlashComponent` is the **core dynamic renderer**. It:

- Parses backend JSON
- Finds the registered component by `name`
- Injects `data`, `styles`, `overrides`, and `components`
- Renders it with Flash render engine

Even complex business components can be rendered — as long as they're Flash-Compatible.

---

## 🧰 Registering Components

Before rendering, you must register Flash-compatible components.

```tsx
import { Flash } from 'flash-client'
import { FooterButtonFlash, MatchCard } from './components'

Flash.registerComponent({
  FooterButtonFlash,
  MatchCard
})
```

---

## 🔌 SDK Integration Guide

### 1️⃣ Install

```bash
npm install flash-client
# or
yarn add flash-client
```

---

### 2️⃣ Initialize Flash

Call once in the app root:

```tsx
Flash.init(
  {
    sendFlashEvent: () => console.log('Flash event'),
    sendFlashNonFatalEvent: (e) => console.warn('Flash non-fatal', e),
  },
  {
    logLevel: 'info' // options: 'info', 'warn', 'error', 'none'
  }
)
```

---

### 3️⃣ Set JSON Layout

Load mock or real layout from backend:

```tsx
import flashMockData from './mock/flashMockData.json'

Flash.setComponentsData(flashMockData)
```

---

### 4️⃣ Render with Inflater

```tsx
const layout = Flash.getComponentLayout('FLAT_LIST_COMPONENT')

return (
  <FlatListInflater
    components={layout.components}
    data={layout.data}
    style={layout.styles}
    overrides={layout.overrides}
  />
)
```

---

## 🎯 Example JSON

```json
{
  "name": "FooterButtonFlash",
  "data": {
    "text": "Submit",
    "onPress": "handleSubmit",
    "testId": "submit"
  },
  "styles": {
    "style": {
      "backgroundColor": "#000"
    }
  },
  "overrides": {
    "submit-button-title": {
      "styles": {
        "style": {
          "color": "#FFF"
        }
      }
    }
  }
}
```

---

## 🤝 Contributing

We welcome contributions!

```bash
# 1. Fork the repo
# 2. Create a branch
git checkout -b feature/your-feature

# 3. Commit and push
git commit -m "Add new feature"
git push origin feature/your-feature

# 4. Open a pull request 🎉
```

---

## 📄 License

Licensed under the [MIT License](./LICENSE)
