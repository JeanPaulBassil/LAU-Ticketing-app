// App.js or App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootLayout from "./screens/RootLayout";
import { AuthProvider } from "./contexts/auth";
import { NavigationContainerRef } from "@react-navigation/native";
import { ModalProvider } from "./contexts/modal";
import { EventDetailProvider } from "./contexts/EventDetails";

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider>
        <StatusBar style="auto" />
        <ModalProvider>
          <NavigationContainer ref={navigationRef}>
            <AuthProvider>
              <EventDetailProvider>
                <RootLayout />
              </EventDetailProvider>
            </AuthProvider>
          </NavigationContainer>
        </ModalProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
