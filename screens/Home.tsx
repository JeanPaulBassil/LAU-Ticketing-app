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


const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [eventName, setEventName] = useState('');
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [refreshEvents, setRefreshEvents] = useState<boolean>(false);

    const handleAddEvent = async () => {
        const eventData: createEventData = {
            name: eventName,
            description: 'blank',
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
        };

        try {
            await api.createEvent(eventData);
            setModalVisible(false);
            setRefreshEvents(prev => !prev);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const response = await api.getEvents();
                setEvents(response.data.events);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [refreshEvents]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Events</Text>
                <Button
                    onPress={() => setModalVisible(true)}
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
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Add Event</Text>
                        <TextInput
                            placeholder='Event Name'
                            style={styles.modalInput}
                            placeholderTextColor={'#AAAAAA'}
                            value={eventName}
                            onChangeText={setEventName}
                        />

                        <DatePickerButton 
                          date={startDate} 
                          onPress={() => setShowStartDatePicker(true)} 
                          formatDate={formatDate} 
                          label="Start Date"
                        />
                        <DateTimePickerModal
                            isVisible={showStartDatePicker}
                            mode="datetime"
                            onConfirm={(date) => {
                                setStartDate(date);
                                setShowStartDatePicker(false);
                            }}
                            onCancel={() => setShowStartDatePicker(false)}
                            textColor='black'
                        />

                        <DatePickerButton 
                          date={endDate} 
                          onPress={() => setShowEndDatePicker(true)} 
                          formatDate={formatDate} 
                          label="End Date"
                        />
                        <DateTimePickerModal
                            isVisible={showEndDatePicker}
                            mode="datetime"
                            onConfirm={(date) => {
                                setEndDate(date);
                                setShowEndDatePicker(false);
                            }}
                            onCancel={() => setShowEndDatePicker(false)}
                            textColor='black'
                        />

                        <View style={styles.modalButtons}>
                            <Button 
                              title='Cancel' 
                              style={styles.cancelButton} 
                              textStyle={styles.cancelButtonTextStyle} 
                              onPress={() => setModalVisible(false)} 
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
