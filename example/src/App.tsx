import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FlatListComponent from './screens/FlatListComponent'
import { initializeSDUISDK } from './SduiUtils'

const Stack = createNativeStackNavigator()

initializeSDUISDK()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="FlatListComponent"
            component={FlatListComponent}
            options={{ title: 'Welcome' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
