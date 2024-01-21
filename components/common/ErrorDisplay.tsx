import React from "react";
import styles from "../../styles/common/error";
import { HelperText } from "react-native-paper";
import { Image, View, Text } from "react-native";
import CustomButton from "../../components/common/Button";

interface ErrorDisplayProps {
    error: string;
    handleError: () => Promise<void>;
    loading: boolean;
}
const ErrorDisplay = ({
  error,
  handleError,
  loading
}: ErrorDisplayProps) => {
  if (!error || loading) {
    return null;
  }

  return (
    <View style={styles.error_container}>
      <Image
        source={require("../../assets/events/error1.png")}
        style={styles.error_image}
      />
      <Text style={styles.error_title}>Whoops!</Text>
      <HelperText
        padding="none"
        style={styles.error_text}
        type="error"
        visible={!!error}
      >
        {error}
      </HelperText>

      <View style={styles.error_button_container}>
        <CustomButton
          onPress={() => handleError()}
          title="Okay"
          style={styles.error_button}
        />
      </View>
    </View>
  );
};

export default ErrorDisplay;
