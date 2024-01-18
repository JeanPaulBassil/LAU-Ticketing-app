import React from "react";
import styles from "../../styles/home/home";
import { HelperText } from "react-native-paper";
import { Image, View, Text } from "react-native";
import CustomButton from "../../components/common/Button";

const ErrorDisplay = ({
  error,
  handleError,
}: {
  error: string;
  handleError: () => Promise<void>;
}) => {
  if (!error) {
    return null;
  }

  return (
    <View style={styles.errorContainer}>
      <Image
        source={require("../../assets/events/error.png")}
        style={styles.errorImage}
      />
      <Text style={styles.errorTitle}>Whoops!</Text>
      <HelperText
        padding="none"
        style={styles.errorText}
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
