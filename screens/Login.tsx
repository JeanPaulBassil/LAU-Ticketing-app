import { ActivityIndicator } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { HelperText } from "react-native-paper";
import Button from "../components/Button";
import ImageLogo from "../components/ImageLogo";
import InputField from "../components/InputField";

import styles from "../components/styles/LoginScreenStyles";
import loginSchema from "../validation/LoginValidation";
import apiService from "../services/apiServices";

const LoginScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handlePress = async () => {
    try {
      setLoading(true);
      await loginSchema.validate({ name, password });
      await apiService.login({ name, password });
      setError(null);
      navigation.navigate("Home");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setError(error.message);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <ImageLogo />
      <Text style={styles.title}>
        Welcome to LAU {"\n"}Barcode{" "}
        <Text style={styles.scanner}>scanner!</Text>
      </Text>
      <Text style={styles.subtitle}>
        Please use your club name provided by the SLO.
      </Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <InputField
          placeholder="Club Name"
          placeholderTextColor="#AAAAAA"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
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

        <Button
          onPress={handlePress}
          title={loading ? "" : "→"}
          disabled={loading}
          style={loading ? styles.buttonDisabled : undefined}
        >
          {loading && <ActivityIndicator size="small" color="#FFF" />}
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
