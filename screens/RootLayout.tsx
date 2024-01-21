import React, { useState, useEffect, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./authentication/Login";
import HomeScreen from "./Home";
import getFonts from "../utils/getFonts";
import * as SplashScreen from "expo-splash-screen";
import useAuth from "../contexts/auth";
import CodeScreen from "./authentication/Code";
import SetPasswordScreen from "./authentication/SetPassword";
import { IEvent } from "../interfaces/events.interface";
import SettingsScreen from "./settings/Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventScreen from "./events/Event";
import { View, Platform } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useModal } from '../contexts/modal';


export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Code: {
    name: string;
  };
  Event: { event: IEvent };
};

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Code" component={CodeScreen} />
    <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
  </Stack.Navigator>
);
const AppTabs = () => {
  const { setModalVisible } = useModal();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: "flex",
          position: "absolute",
          bottom: 25,
          left: 25,
          right: 25,
          elevation: 5,
          backgroundColor: "white",
          borderRadius: 30,
          height: 60,
          shadowColor: "#000", // Shadow color for iOS
          shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
          shadowOpacity: 0.15, // Shadow opacity
          shadowRadius: 2, // Shadow radius
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
                position: "relative",
              }}
            >
              <Ionicons
                name={focused ? "home-outline" : "home-outline"}
                size={30}
                color={focused ? "#005C4A" : "grey"}
              />
              <View
                style={{
                  // bullet
                  position: "absolute",
                  bottom: -14,
                  left: 12,
                  width: 6,
                  height: 6,
                  borderRadius: 50,
                  backgroundColor: focused ? "#005C4A" : "transparent",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Event"
        component={EventScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Create"
        component={() => <View></View>}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: -10,
                width: 85,
                height: 85,
                borderRadius: 50,
                backgroundColor: "#f6f6f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  backgroundColor: "#005C4A",
                  borderRadius: 50,
                  padding: 15,
                }}
              >
                <AntDesign
                  name="plus"
                  size={30}
                  color={focused ? "white" : "white"}
                />
              </TouchableOpacity>
            </View>
          ),
          tabBarIconStyle: {},
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
                position: "relative",
              }}
            >
              <Ionicons
                name={focused ? "settings-outline" : "settings-outline"}
                size={30}
                color={focused ? "#005C4A" : "grey"}
              />
              <View
                style={{
                  // bullet
                  position: "absolute",
                  bottom: -15,
                  left: 12,
                  width: 6,
                  height: 6,
                  borderRadius: 50,
                  backgroundColor: focused ? "#005C4A" : "transparent",
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

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

  return <>{state.club === null ? <AuthStack /> : <AppTabs />}</>;
};

export default RootLayout;
