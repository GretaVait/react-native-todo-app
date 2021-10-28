// Base
import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
// Lib
import { SafeAreaProvider } from 'react-native-safe-area-context'
// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// Screens
import HomeScreen from './screens/HomeScreen'
import NoteScreen from './screens/NoteScreen'
import WorkCategoryScreen from './screens/WorkCategoryScreen'
import IdeasCategoryScreen from './screens/IdeasCategoryScreen'

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView behavior="height" style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NoteScreen" component={NoteScreen} options={{ headerShown: false }} />
            <Stack.Screen name="WorkCategoryScreen" component={WorkCategoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="IdeasCategoryScreen" component={IdeasCategoryScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
