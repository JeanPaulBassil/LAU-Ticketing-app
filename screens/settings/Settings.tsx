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
import EventsList from "../../components/settings/EventList";
import useEvents from "../../hooks/useEvents";
import ErrorDisplay from "../../components/common/ErrorDisplay";

const Settings = () => {
  const { logout, state } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const {
    loading: loading_events,
    error: error_events,
    events,
    fetchEvents,
  } = useEvents();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  useEffect(() => {
    fetchEvents();
    // setError("Internal server error");
    // setLoading(true);
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await api.logout();
      setError("");
      logout();
    } catch (err: any) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }, []);

  if ((error || error_events) && !loading && !loading_events) {
    return (
      <SafeAreaView style={common.container}>
        <ErrorDisplay
          loading={loading || loading_events}
          error={error_events}
          handleError={fetchEvents}
        />
      </SafeAreaView>
    );
  }

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

      <View style={styles.account_container}>
        <View>
          <Text style={styles.account_text}>Account Details</Text>
          <View style={styles.account_underline} />
        </View>

        <View style={styles.account_details}>
          <Text style={styles.label}>Club Name</Text>
          <View style={styles.input}>
            <Text style={styles.input_text}>{state?.club?.name}</Text>
          </View>
        </View>
        <View style={styles.account_details}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.input}>
            <Text style={styles.input_text}>{state?.club?.email}</Text>
          </View>
        </View>
        {/* <View style={styles.account_details}>
          <Text style={styles.label}>Password</Text>
          <View style={[styles.input, styles.password_input]}>
            <Text style={styles.input_text}>
              {isPasswordVisible
                ? password // Show the password if isPasswordVisible is true
                : "*".repeat(
                    password.length
                  ) // Show asterisks for hidden password
              }
            </Text>
            <MaterialCommunityIcons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={22}
                  color="#aaa"
                  style={styles.icon}
                  onPress={togglePasswordVisibility}
                />
          </View>
        </View> */}
      </View>

      <View style={styles.events_container}>
        <View>
          <Text style={styles.account_text}>Your Events</Text>
          <View style={styles.account_underline} />
        </View>
      </View>

      {(loading || loading_events) && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#005C4A"
          />
        </View>
      )}

      <EventsList
        loading={loading || loading_events}
        error={error || error_events}
        onDelete={fetchEvents}
        events={events}
      />
    </SafeAreaView>
  );
};

export default Settings;
