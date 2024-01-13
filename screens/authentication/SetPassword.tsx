import React, { useState, useRef } from "react";
import {
  Platform,
  Keyboard,
  SafeAreaView,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../components/Button";
import * as yup from "yup";
import { CommonActions } from "@react-navigation/native";
import InputField from "../../components/InputField";
import { HelperText, ActivityIndicator } from "react-native-paper";
import setPasswordSchema from "../../validation/set-password";
import styles from "../../styles/authentication/set-password";
import api from "../../services/api";
import useAuth from "../../contexts/auth";
import { IClub } from "../../interfaces/clubs.interface";

const SetPassword = ({ route, navigation }: { route: any, navigation: any} ) => {
  const [password, setPassword] = useState<string>("");
  const [passConfirmation, setPassConfirmation] = useState<string>("");
  const [ loading, setLoading ] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { clubname, code } = route.params ;
  const { login } = useAuth();


  const passwordInputRef = useRef<TextInput>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [ showConfirmation, setShowConfirmation ] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  }
  const handleClubNameSubmit = () => {
    passwordInputRef.current?.focus();
  };

  const handlePress = async () => {
    try {
      setLoading(true);
      await setPasswordSchema.validate({ password, confirmPassword: passConfirmation });
      const club: IClub = await api.verifyAccount({ 
        name: clubname,
        code,
        password
     });
      login(club);
      setError(null);
    } catch (error) {
      if (error instanceof yup.ValidationError || error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };
  
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
                backgroundColor={"#f6f6f6"}
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
              <View style={styles.password_container}>
                <InputField
                  placeholder="Password"
                  placeholderTextColor="#AAAAAA"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  returnKeyType="next"
                  onSubmitEditing={handleClubNameSubmit}
                />
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off" : "eye"}
                  size={22}
                  color="#aaa"
                  style={styles.icon}
                  onPress={toggleShowPassword}
                />
                </View>
                <View style={styles.password_container}>
                  <InputField
                    placeholder="Confirm Password"
                    placeholderTextColor="#AAAAAA"
                    value={passConfirmation}
                    onChangeText={setPassConfirmation}
                    secureTextEntry={!showConfirmation}
                    style={styles.input}
                    ref={passwordInputRef}
                  />
                  <MaterialCommunityIcons
                  name={showConfirmation ? "eye-off" : "eye"}
                  size={22}
                  color="#aaa"
                  style={styles.icon}
                  onPress={toggleShowConfirmation}
                />
              </View>
              {error && (
                <HelperText padding="none" style={styles.error_text} type="error" visible={!!error}>
                  {error}
                </HelperText>
              )}
            </View>

            <View style={styles.submit_button_container}>
              <CustomButton
                onPress={() => handlePress()}
                title={loading ? "loading..." : "Continue"}
                disabled={loading}
                style={[styles.submit_button, loading ? styles.buttonDisabled : undefined]}
              >
                 {loading && <ActivityIndicator size="small" color="#FFF" />}
              </CustomButton>
            </View>
            <View style={{ flex : 1 }} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SetPassword;
