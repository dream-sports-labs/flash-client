# ⚡ Flash Client

[![npm version](https://badge.fury.io/js/flash-client.svg)](https://badge.fury.io/js/flash-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Flash Client is a powerful React Native Server Driven UI (SDUI) library that enables dynamic UI updates without app releases. It allows you to define, manage, and render UI components from server configurations while maintaining native performance.

## Features

- 🚀 Server Driven UI Architecture
- ⚡️ Dynamic Component Rendering
- 🔄 Real-time UI Updates
- 📱 Cross-Platform Support (iOS & Android)
- 🎨 Customizable Component Registry
- 🛠 Type-Safe Component Definitions
- 📦 Easy Integration

## 📚 Documentation

- [Overview](https://app.gitbook.com/o/4LSU9ku5mbRRmXIp618W/s/x2629G9neeISCbDa2iUD/development/overview)
- [Understanding Configurability](https://app.gitbook.com/o/4LSU9ku5mbRRmXIp618W/s/x2629G9neeISCbDa2iUD/understanding-configurability)
- [Getting Started](https://app.gitbook.com/o/4LSU9ku5mbRRmXIp618W/s/x2629G9neeISCbDa2iUD/getting-started)
- [Components](https://app.gitbook.com/o/4LSU9ku5mbRRmXIp618W/s/x2629G9neeISCbDa2iUD/getting-started/components)
- [Inflaters](https://app.gitbook.com/o/4LSU9ku5mbRRmXIp618W/s/x2629G9neeISCbDa2iUD/getting-started/inflaters)
- [Overrides](https://app.gitbook.com/o/4LSU9ku5mbRRmXIp618W/s/x2629G9neeISCbDa2iUD/getting-started/overrides)


## Installation

```bash
npm install flash-client
```
### or
```typescript
yarn add flash-client
```

## Quick Start

#### 1. Initialize Flash Client in your app:

```typescript
import { Flash } from 'flash-client';

// Initialize with optional listeners and configuration
Flash.init({
  onError: (error) => console.error(error),
  onComponentUpdate: (component) => console.log('Component updated:', component),
});
```

#### 2. Register Custom Components:

```typescript
import { Flash } from 'flash-client';
import { MyCustomComponent } from './components';

Flash.registerComponent({
  'MyCustomComponent': MyCustomComponent,
});
```

#### 3. Set Component Data:

```typescript
Flash.setComponentsData([
  {
    id: 'header_1',
    type: 'FlashView',
    props: {
      style: {
        backgroundColor: '#fff',
        padding: 16,
      },
    },
    children: [
      {
        type: 'FlashText',
        props: {
          text: 'Welcome to Flash!',
          style: {
            fontSize: 24,
            fontWeight: 'bold',
          },
        },
      },
    ],
  },
]);
```

#### 4. Render Components:

   ##### - Rendering Lists with Inflater on Screen
```typescript
import { Flash, FlatListInflater } from 'flash-client';

function MatchListScreen() {
  const listLayout = Flash.getComponentLayout('match_list');

  return (
    <FlatListInflater
      components={listLayout.components}
  data={listLayout.data}
  style={listLayout.styles}
  overrides={listLayout.overrides}
  flatListProps={{
      keyExtractor: (item, index) => `match-${index}`,
      showsHorizontalScrollIndicator: false,
  }}
  />
);
}
```
  ##### - Fully Dynamic Rendering with FlashComponent
```typescript
import { FlashComponent } from 'flash-client';

function DynamicBlock({ layout }) {
  return (
    <FlashComponent
      name={layout.name}
      data={layout.data}
      components={layout.components}
      styles={layout.styles}
      overrides={layout.overrides}
    />
  );
}
```

## Core Concepts

### Component Structure

Components in Flash Client follow a specific structure:

```typescript
Component = {
  name: string;
  components?: Array<Component>; // Nested children
  styles?: Style;
  overrides?: Overrides;
  data?: PropData;
  dataId?: string;
}
```

### Built-in Components

Flash Client comes with several pre-built components:

- `FlashView`: A basic container component
- `FlashText`: Text rendering component
- `FlashImage`: Image rendering component
- `ScrollInflater`: Scrollable container
- `FlatListInflater`: List rendering component

## TypeScript Support

Flash Client is written in TypeScript and provides full type definitions out of the box.

## ⚡ Flash is Evolving Fast!

We’re actively working on powerful new features to make Flash even more dynamic and flexible:

- 🧩 **Events & Actions System** — Trigger behaviors like navigation, deep links, and alerts directly from backend-defined JSON
- 🌐 **Remote Components** — Render components dynamically using **pre-transpiled JSX**, enabling lightweight feature delivery without bundling into the app
- 🧱 **Enhanced Component Library** — A richer set of reusable, Flash-compatible UI components out of the box

## Community Discord

Join the [DreamSportsLabs Community](https://discord.com/channels/1317172052179943504/1317172052179943507) to chat about marco or other DreamSportsLabs libraries.

## Created by DreamSportsLabs

<img src="media/logo.png" width="40" alt="Flash Banner" />

DreamSportsLabs is committed to building open-source tools that empower developers and businesses. Learn more about us at our website.

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- [GitHub Issues](https://github.com/dream-sports-labs/flash-client/issues)
- [Documentation](https://app.gitbook.com/o/4LSU9ku5mbRRmXIp618W/s/x2629G9neeISCbDa2iUD/development/overview)
