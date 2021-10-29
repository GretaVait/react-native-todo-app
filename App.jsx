// Base
import React from 'react'
import { KeyboardAvoidingView, StyleSheet, View, Platform, TextInput } from 'react-native'
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

export default function App() {
  const Stack = createNativeStackNavigator()
  const [text, onChangeText] = React.useState("Useless Text")


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'height'} style={{ flex: 1, flexDirection: 'row' }}>
            
            <View style={{ width: 32 }}>
              <Catgories />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Platform.OS === "ios" ? 'grey' : 'white'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
