import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

const RootLayout = () => {
  return (
    <Stack.Navigator 
        screenOptions={{
        headerShown: false,
        }}
    >
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Home" component={HomeScreen}/>
    </Stack.Navigator>
  );
}

export default RootLayout;
