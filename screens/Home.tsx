import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Modal, FlatList, TextInput } from 'react-native';
import Button from '../components/Button';
import EventItem from '../components/EventItem';
import DatePickerButton from '../components/DatePickerButton';
import { formatDate } from '../utils/date';
import styles from '../components/styles/HomeScreenStyles';
import api from '../services/api';
import { IEvent, createEventData } from '../interfaces/events.interface';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useEvents from '../hooks/useEvents';
import useModal from '../hooks/useModal';
import useDatePicker from '../hooks/useDatePicker';
import useForm from '../hooks/useForm';

const HomeScreen = () => {
    const { events, loading, fetchEvents, addEvent } = useEvents();
    const { visible, openModal, closeModal} = useModal();
    const { date: startDate, isPickerVisible: isStartVisible, showPicker: showStartPicker, hidePicker: hideStartPicker, handleConfirm: confirmStartPicker } = useDatePicker();
    const { date: endDate, isPickerVisible: isEndVisible, showPicker: showEndPicker, hidePicker: hideEndPicker, handleConfirm: confirmEndPicker } = useDatePicker();
    const { values, handleChange, resetForm } = useForm({eventName: ''});
    const { eventName } = values;

    const handleAddEvent = async () => {
        const eventData: createEventData = {
            name: eventName,
            description: 'blank',
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
        };
        closeModal();
        await addEvent(eventData);
        resetForm();
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Events</Text>
                <Button
                    onPress={openModal}
                    title="Add Event"
                    style={styles.addButton}
                    textStyle={styles.addButtonText}
                />
            </View>

            <FlatList
                data={events}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <EventItem 
                      name={item.name} 
                      onPress={() => {/* Handle event press */}} 
                    />
                )}
                style={styles.eventsList}
            />

            <Modal
                animationType='fade'
                transparent={true}
                visible={visible}
                onRequestClose={closeModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Add Event</Text>
                        <TextInput
                            placeholder='Event Name'
                            style={styles.modalInput}
                            placeholderTextColor={'#AAAAAA'}
                            value={eventName}
                            onChangeText={(text) => handleChange('eventName', text)}
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
                            textColor='black'
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
                            textColor='black'
                        />

                        <View style={styles.modalButtons}>
                            <Button 
                              title='Cancel' 
                              style={styles.cancelButton} 
                              textStyle={styles.cancelButtonTextStyle} 
                              onPress={closeModal} 
                            />
                            <Button 
                              title='Add' 
                              style={styles.addEventButton} 
                              onPress={handleAddEvent} 
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default HomeScreen;
