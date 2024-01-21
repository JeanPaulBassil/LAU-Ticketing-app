import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Button,
} from "react-native";
import common from "../../styles/common";
import styles from "../../styles/settings/settings";
import { MaterialIcons } from "@expo/vector-icons";
import useAuth from "../../contexts/auth";
import CustomButton from "../../components/common/Button";
import api from "../../services/api";
import { AxiosError } from "axios";

const Settings = () => {
  const { logout } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.logout();
      setError("");
      logout();
    } catch (err: any) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SafeAreaView style={common.container}>
      <View style={common.header}>
        <View>
          <Text style={common.header_text}>Settings</Text>
          <View style={common.header_underline} />
        </View>
        <CustomButton
          disabled={loading}
          onPress={signOut}
          title={""}
          style={styles.logout_button}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <View style={styles.logout_content}>
              <Text style={styles.logout_button_text}>Logout</Text>
              <MaterialIcons name="logout" size={14} color="white" />
            </View>
          )}
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
