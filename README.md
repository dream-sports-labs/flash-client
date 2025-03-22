# React Native Server-Driven UI (SDUI) SDK

Welcome to the React Native Server-Driven UI (SDUI) SDK, designed to facilitate dynamic user interfaces in React Native applications. This SDK enables real-time UI updates without necessitating client-side redeployments, enhancing flexibility and reducing release cycles.

## Features

- **Dynamic UI Rendering**: Fetch and render UI components based on server configurations, enabling real-time updates and personalized experiences.
- **Component Registry**: Register and manage reusable UI components that can be dynamically rendered as specified by the server.
- **Error Handling**: Implement robust mechanisms for capturing and reporting non-fatal errors, ensuring a stable application.
- **Logging**: Utilize configurable logging levels to monitor SDK operations and maintain transparency in UI rendering processes.

## Installation

To integrate the SDUI SDK into your React Native project, install it via npm:

```bash
npm install react-native-server-driven-ui
```
Or using yarn:

```bash
yarn add react-native-server-driven-ui
```
## Integration Guide
**Initialization**

Begin by initializing the SDK with your desired options, including custom event handlers and logging levels:
```bash
import { SDUI, ISduiOptions } from 'react-native-server-driven-ui';

const sduiOptions: ISduiOptions = {
  logLevel: 'info', // Options: 'info', 'warn', 'error', 'none'
};

SDUI.init(
  {
    sendSDUIEvent(): void {
      console.log('SDUI App Event:');
    },
    sendSDUINonFatalEvent(error: Error): void {
      console.log('SDUI App Non-fatal event:', error);
    },
  },
  sduiOptions
)
```
In this setup, sendSDUIEvent and sendSDUINonFatalEvent are custom event handlers that allow you to manage and log events specific to your application. The logLevel option configures the verbosity of the SDK's internal logging.

## Registering Components
Register your custom components with the SDK to enable dynamic rendering based on server configurations. This process ensures that the SDK can recognize and render the components defined in your application. The SDK also includes a set of built-in components, such as SDUIView and SDUIText, which can be utilized directly.

```bash
import { SDUI } from 'react-native-server-driven-ui';
import AppComponentList from './components/AppComponentList';

SDUI.registerComponent(AppComponentList);
```

By registering your components, you make them available for server-driven rendering, allowing the SDK to instantiate and display them as dictated by the server's configuration.

## Setting Component Data

Provide the SDK with the components' configuration data, which can be fetched from the server or defined locally. While the example below uses mock data (sduiMockData), you can replace this with data retrieved from your backend to dynamically control the UI based on server-defined configurations.
```bash
import { SDUI } from 'react-native-server-driven-ui';
import sduiMockData from './sduiMockData';

// Replace sduiMockData with your backend data
SDUI.setComponentsData(sduiMockData);
```
By setting the components' data, you enable the SDK to render the UI dynamically based on the provided configurations, facilitating a server-driven approach to UI management.

## Rendering Components
Retrieve and render components within your application based on the registered components and the provided data. The SDK offers different inflaters to facilitate this process.

**Using the FlatListInflater Component**

For rendering lists of data, the SDK provides the FlatListInflater component, which integrates seamlessly with the server-driven configuration to display lists dynamically.

```bash
import React from 'react';
import { FlatListInflater, SDUI } from 'react-native-server-driven-ui';
import { flatListDefaultConfig } from './mock/FlatListDefaultConfig';
import { ComponentName } from '../constants/AppConstants';

const FlatListComponent = () => {
  const flatListComponent = SDUI.getComponentLayout(
    ComponentName.FLAT_LIST_COMPONENT,
    flatListDefaultConfig
  );

  return (
    <FlatListInflater
      components={flatListComponent.components}
      data={flatListComponent.data}
      overrides={flatListComponent.overrides}
      style={flatListComponent.styles}
    />
  );
};

export default FlatListComponent;
```
In this example, FlatListInflater renders a list based on the components and data provided. The flatListDefaultConfig serves as a fallback configuration if the server does not provide specific data for the flat list component. ComponentName.FLAT_LIST_COMPONENT identifies the specific component layout to retrieve from the SDK.

By utilizing the FlatListInflater, you can efficiently render lists that adapt to server-driven configurations, enhancing the flexibility and responsiveness of your application.

**Using the ScrollViewInflater Component**

For rendering scrollable content, the SDK provides the ScrollViewInflater component, which allows for dynamic rendering of components within a scrollable view.

By utilizing the ScrollViewInflater, you can dynamically render scrollable content that adapts to server-driven configurations, enhancing the flexibility and responsiveness of your application.

## Contributing
We welcome contributions to enhance the SDUI SDK. To contribute:

- Fork the repository.
- Create a new branch: git checkout -b feature/YourFeatureName.
- Make your changes and commit them: git commit -m 'Add some feature'.
- Push to the branch: git push origin feature/YourFeatureName.
- Submit a pull request.
- Please ensure your code adheres to our coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
