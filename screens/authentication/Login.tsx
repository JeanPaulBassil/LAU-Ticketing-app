import { ActivityIndicator } from "react-native-paper";
import React, { useState, useCallback } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as yup from "yup";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { HelperText } from "react-native-paper";
import Button from "../../components/Button";
import ImageLogo from "../../components/ImageLogo";
import InputField from "../../components/InputField";

import styles from "../../components/styles/LoginScreenStyles";
import loginSchema from "../../validation/LoginValidation";
import api from "../../services/api";
import useAuth from "../../contexts/auth";
import { IClub } from "../../interfaces/clubs.interface";
import { AxiosResponse } from "axios";

const emailSent = (response: AxiosResponse<IClub>) => {
  return response.status === 202;
};

const LoginScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePress = useCallback(async () => {
    try {
      setLoading(true);
      await loginSchema.validate({ name, password });
      const response: AxiosResponse<IClub> = await api.login({
        name,
        password,
      });
      if (emailSent(response)) {
        navigation.navigate("Code", { clubname: name });
        return;
      }
      const club = response.data;
      login(club);
      setError(null);
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        setError(error.message);
      } else if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [name, password]);
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "android" ? 75 : 0}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View>
              <ImageLogo />
              <Text style={styles.title}>
                Welcome to LAU {"\n"}Barcode{" "}
                <Text style={styles.scanner}>scanner!</Text>
              </Text>
              <Text style={styles.subtitle}>
                Please use your club name provided by the SLO.
              </Text>
            </View>
            <View style={styles.inputs_container}>
              <InputField
                placeholder="Club Name"
                placeholderTextColor="#AAAAAA"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
              <View style={styles.password_container}>
                <InputField
                  placeholder="Password"
                  placeholderTextColor="#AAAAAA"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  style={styles.input}
                />
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off" : "eye"}
                  size={22}
                  color="#aaa"
                  style={styles.icon}
                  onPress={toggleShowPassword}
                />
              </View>
              {error && (
                <HelperText
                  padding="none"
                  style={styles.error_text}
                  type="error"
                  visible={!!error}
                >
                  {error}
                </HelperText>
              )}
              <View style={styles.submit_container}>
                <Button
                  onPress={handlePress}
                  title={loading ? "" : "Login  →"}
                  disabled={loading}
                  style={[
                    styles.submit_button,
                    loading ? styles.buttonDisabled : undefined,
                  ]}
                >
                  {loading && <ActivityIndicator size="small" color="#FFF" />}
                </Button>
              </View>
            </View>
            <View style={{ flex: 1 }} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
