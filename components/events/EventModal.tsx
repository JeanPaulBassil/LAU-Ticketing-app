import React from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
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
}: {
  visible: boolean;
  onClose: () => void;
  onAdd: (eventData: any) => Promise<void>;
}) => {
  const { values, handleChange, resetForm } = useForm({ eventName: "" });
  const { eventName } = values;
  const {
    date: startDate,
    isPickerVisible: isStartVisible,
    showPicker: showStartPicker,
    hidePicker: hideStartPicker,
    handleConfirm: confirmStartPicker,
  } = useDatePicker();
  const {
    date: endDate,
    isPickerVisible: isEndVisible,
    showPicker: showEndPicker,
    hidePicker: hideEndPicker,
    handleConfirm: confirmEndPicker,
  } = useDatePicker();

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
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Add New Event</Text>
                  <View style={styles.modalText_underline} />
                  <TextInput
                    placeholder="Event Name"
                    style={styles.modalInput}
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
                  />

                  <View style={styles.modalButtons}>
                    <Button
                      title="Cancel"
                      style={styles.cancelButton}
                      onPress={handleCancel}
                      textStyle={styles.cancelButtonText}
                    />
                    <Button
                      title="Add"
                      style={styles.addEventButton}
                      onPress={handleAddEvent}
                    />
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
