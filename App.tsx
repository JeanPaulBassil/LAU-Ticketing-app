// App.js or App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootLayout from './screens/RootLayout';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <RootLayout />
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
