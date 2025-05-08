# Flash Client

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
# or
yarn add flash-client
```

## Quick Start

1. Initialize Flash Client in your app:

```typescript
import { Flash } from 'flash-client';

// Initialize with optional listeners and configuration
Flash.init({
  onError: (error) => console.error(error),
  onComponentUpdate: (component) => console.log('Component updated:', component),
});
```

2. Register Custom Components:

```typescript
import { Flash } from 'flash-client';
import { MyCustomComponent } from './components';

Flash.registerComponent({
  'MyCustomComponent': MyCustomComponent,
});
```

3. Set Component Data:

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

4. Render Components:

  - Rendering Lists with Inflater on Screen
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
 - Fully Dynamic Rendering with FlashComponent
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
interface Component {
  id: string;
  type: string;
  props?: ConfigurableProps;
  children?: Component[];
}
```

### Built-in Components

Flash Client comes with several pre-built components:

- `FlashView`: A basic container component
- `FlashText`: Text rendering component
- `FlashImage`: Image rendering component
- `ScrollInflater`: Scrollable container
- `FlatListInflater`: List rendering component

## Advanced Usage

### Custom Component Registration

```typescript
interface CustomComponentProps {
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<CustomComponentProps> = (props) => {
  // Component implementation
};

Flash.registerComponent({
  'CustomButton': CustomButton,
});
```

## TypeScript Support

Flash Client is written in TypeScript and provides full type definitions out of the box.

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- [GitHub Issues](https://github.com/anirudhdream11/flash-client/issues)
- [Documentation](https://app.gitbook.com/o/4LSU9ku5mbRRmXIp618W/s/x2629G9neeISCbDa2iUD/development/overview)
