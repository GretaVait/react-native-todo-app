// Base
import React from 'react'
import { KeyboardAvoidingView, View, Platform } from 'react-native'
// Lib
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// Screens
import HomeScreen from './screens/HomeScreen'
import NoteScreen from './screens/NoteScreen'
import WorkCategoryScreen from './screens/WorkCategoryScreen'
import IdeasCategoryScreen from './screens/IdeasCategoryScreen'
import SettingsScreen from './screens/SettingsScreen'
// Comp
import Catgories from './components/Categories'
// Redux
import { Provider } from 'react-redux'
import store from './redux/store'

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'height'} style={{ flex: 1, flexDirection: 'row' }}>

              <View style={{ width: 32 }}>
                <Catgories  />
              </View>
              
              <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="NoteScreen" component={NoteScreen} options={{ headerShown: false }} />
                <Stack.Screen name="WorkCategoryScreen" component={WorkCategoryScreen} options={{ headerShown: false }} />
                <Stack.Screen name="IdeasCategoryScreen" component={IdeasCategoryScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
              </Stack.Navigator>

            </KeyboardAvoidingView>
          </SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
