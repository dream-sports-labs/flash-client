import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ListComponent from './screens/ListComponent'
import { initializeFlashClient } from './FlashUtils'

const Stack = createNativeStackNavigator()

initializeFlashClient()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ListComponent"
            component={ListComponent}
            options={{ title: '⚡ Flash' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
