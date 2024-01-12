import React, { useState, useEffect, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./authentication/Login";
import HomeScreen from "./Home";
import getFonts from "../utils/getFonts";
import * as SplashScreen from "expo-splash-screen";
import useAuth from "../contexts/auth";
import CodeScreen from "./authentication/Code";
import SetPasswordScreen from "./authentication/SetPassword";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const RootLayout = () => {
  const [ready, setReady] = useState<boolean>(false);
  const { state } = useAuth();

  useEffect(() => {
    const prepareResources = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Load fonts, make API calls and do other things
        await getFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setReady(true);
      }
    };
    prepareResources();
  });

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    if (ready && !state.loading) {
      hideSplash();
    }
  }, [ready, state.loading]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* {state.club === null ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      )} */}
      <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
      <Stack.Screen name="Code" component={CodeScreen} />
    </Stack.Navigator>
  );
};

export default RootLayout;
