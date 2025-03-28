import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ListComponent from './screens/ListComponent'
import { initializeFlashSDK } from './FlashUtils'

const Stack = createNativeStackNavigator()

initializeFlashSDK()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ListComponent"
            component={ListComponent}
            options={{ title: 'Welcome to Flash App' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
