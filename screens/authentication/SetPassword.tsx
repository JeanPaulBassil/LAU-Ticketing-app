import React, { useState } from "react";
import {
  Platform,
  Keyboard,
  SafeAreaView,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../components/Button";

import { CommonActions } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";
import InputField from "../../components/InputField";
import { HelperText } from "react-native-paper";

import styles from "../../styles/authentication/set-password";

type RootStackParamList = {
  SetPassword: undefined;
};
type SetPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SetPassword"
>;
type SetPasswordScreenProps = {
  navigation: SetPasswordScreenNavigationProp;
};

const SetPassword = ({ navigation }: SetPasswordScreenProps) => {
  const [password, setPassword] = useState<string>("");
  const [passConfirmation, setPassConfirmation] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "android" ? 75 : 0}
    >
      <SafeAreaView style={styles.root}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.back_container}>
              <Ionicons.Button
                style={styles.back_button}
                name="arrow-back"
                size={33}
                color="black"
                backgroundColor={"#EAF2EF"}
                onPress={() => navigation.dispatch(CommonActions.goBack())}
                borderRadius={50}
              ></Ionicons.Button>
            </View>
            <View style={styles.top_logo}>
              <Image source={require("../../assets/lauLogo.png")} />
            </View>
            <View style={styles.top_container}>
              <Text style={styles.title}>Secure Your Account</Text>
              <Text style={styles.sub_title}>
                Ensure your account's security with a robust password.
              </Text>
            </View>
            <View style={styles.inputs_container}>
              <InputField
                placeholder="Password"
                placeholderTextColor="#AAAAAA"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
              />
              {error && (
                <HelperText type="error" visible={!!error}>
                  {error}
                </HelperText>
              )}
              <InputField
                placeholder="Confirm Password"
                placeholderTextColor="#AAAAAA"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
              />
              {error && (
                <HelperText type="error" visible={!!error}>
                  {error}
                </HelperText>
              )}
            </View>

            <View style={styles.submit_button_container}>
              <CustomButton
                onPress={() => {}}
                title="Confirm"
                style={styles.submit_button}
              />
            </View>
            <View style={{ flex : 1 }} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SetPassword;
