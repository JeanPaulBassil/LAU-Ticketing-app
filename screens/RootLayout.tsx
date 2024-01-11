import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import useFontLoader from "../hooks/useFontLoader";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();

const RootLayout = () => {
  const fontsLoaded = useFontLoader();

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default RootLayout;
