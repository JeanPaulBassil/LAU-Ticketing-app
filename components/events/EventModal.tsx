import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ActivityIndicator
} from "react-native";
import Button from "../common/Button";
import DatePickerButton from "./DatePickerButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate } from "../../utils/date";
import useForm from "../../hooks/useForm";
import useDatePicker from "../../hooks/useDatePicker";
import styles from "../../styles/home/modal";

const EventModal = ({
  visible,
  onClose,
  onAdd,
  loading
}: {
  visible: boolean;
  onClose: () => void;
  onAdd: (eventData: any) => Promise<void>;
  loading: boolean
}) => {
  const { values, handleChange, resetForm } = useForm({ eventName: "" });
  const { eventName } = values;
  const {
    date: startDate,
    isPickerVisible: isStartVisible,
    showPicker: showStartPicker,
    hidePicker: hideStartPicker,
    handleConfirm: confirmStartPicker,
    setDate: setStartDate,
  } = useDatePicker();
  const {
    date: endDate,
    isPickerVisible: isEndVisible,
    showPicker: showEndPicker,
    hidePicker: hideEndPicker,
    handleConfirm: confirmEndPicker,
    setDate: setEndDate,
  } = useDatePicker();

  useEffect(() => {
    setStartDate(new Date());
    setEndDate(new Date());
  }, [])
  const handleAddEvent = async () => {
    const eventData = {
      name: eventName,
      description: "blank",
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    };
    await onAdd(eventData);
    resetForm();
    onClose();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

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
                  <Text style={styles.modal_text}>Add New Event</Text>
                  <View style={styles.modal_text_underline} />
                  <TextInput
                    placeholder="Event Name"
                    style={styles.modal_input}
                    placeholderTextColor={"#AAAAAA"}
                    value={eventName}
                    onChangeText={(text) => handleChange("eventName", text)}
                  />

                  <DatePickerButton
                    date={startDate}
                    onPress={showStartPicker}
                    formatDate={formatDate}
                    label="Start Date"
                  />
                  <DateTimePickerModal
                    isVisible={isStartVisible}
                    mode="datetime"
                    onConfirm={confirmStartPicker}
                    onCancel={hideStartPicker}
                    textColor="black"
                    date={startDate}
                  />

                  <DatePickerButton
                    date={endDate}
                    onPress={showEndPicker}
                    formatDate={formatDate}
                    label="End Date"
                  />
                  <DateTimePickerModal
                    isVisible={isEndVisible}
                    mode="datetime"
                    onConfirm={confirmEndPicker}
                    onCancel={hideEndPicker}
                    textColor="black"
                    date={endDate}
                  />

                  <View style={styles.modal_button_container}>
                    <Button
                      title="Cancel"
                      style={styles.cancel_button}
                      onPress={handleCancel}
                      textStyle={styles.button_text}
                    />
                    <Button
                      title="Add"
                      onPress={handleAddEvent}
                      style={[styles.submit_button, loading ? { opacity: 0.3 } : null]}
                      textStyle={styles.button_text}
                    >
                      {loading && <ActivityIndicator size="small" color="#FFF" />}
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EventModal;
