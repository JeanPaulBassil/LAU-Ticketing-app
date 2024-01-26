import React, { useEffect } from "react";
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
import DatePickerButton from "../events/DatePickerButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useDatePicker from "../../hooks/useDatePicker";
import { formatDate } from "../../utils/date";
import { IEvent } from "../../interfaces/events.interface";

interface EditModalProps {
  visible: boolean;
  onClose: () => void;
  handleCancel: () => void;
  handleSubmit: (date: string, event: IEvent | undefined) => void;
  loading: boolean;
  event: IEvent | undefined;
}

export const EditModal = ({visible, onClose, handleCancel, handleSubmit, loading, event}: EditModalProps)  => {
    const { date, isPickerVisible, showPicker, hidePicker, handleConfirm, setDate } = useDatePicker();
    
    useEffect(() => {
      if (event) {
          setDate(new Date(event.end_date));
      }
  }, [event, setDate]);

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
                <Text style={styles.modal_text}>Update End Date</Text>
                <View style={styles.modal_text_underline} />
                
                <DatePickerButton
                    date={date}
                    onPress={showPicker}
                    formatDate={formatDate}
                    label="New End Date"
                />
                <DateTimePickerModal
                    isVisible={isPickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hidePicker}
                    textColor="black"
                    date={date}
                />

                <View style={styles.modal_button_container}>
                  <Button
                    title="Cancel"
                    style={styles.cancel_button}
                    onPress={handleCancel}
                    textStyle={styles.button_text}
                    disabled={loading}
                  />
                  <Button
                    title="Submit"
                    style={styles.submit_button}
                    onPress={() => handleSubmit(date.toISOString(), event)}
                    textStyle={styles.button_text}
                    disabled={loading}
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