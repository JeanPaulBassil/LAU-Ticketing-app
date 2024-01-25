import React from "react";
import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Button from "../common/Button";
import styles from "../../styles/home/modal";
import useModal from "../../hooks/useModal";

export const EditModal = ({visible, onClose, handleCancel, handleSubmit}: {visible: boolean, onClose: () => void, handleCancel: () => void, handleSubmit: () => void}) => {
    return (
        <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "android" ? 75 : 0}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <View style={styles.centered_view}>
              <View style={styles.modal_view}>
                <Text style={styles.modal_text}>Enter Student Name</Text>
                <View style={styles.modal_text_underline} />
                
                <View style={styles.modal_button_container}>
                  <Button
                    title="Cancel"
                    style={styles.cancel_button}
                    onPress={handleCancel}
                    textStyle={styles.button_text}
                  />
                  <Button
                    title="Submit"
                    style={styles.submit_button}
                    onPress={handleSubmit}
                    textStyle={styles.button_text}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
    )
}