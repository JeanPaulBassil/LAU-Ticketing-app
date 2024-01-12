import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Modal, FlatList, Pressable, Image } from 'react-native';
import Button from '../components/Button';
import styles from '../components/styles/HomeScreenStyles';
import api from '../services/api';
import { IEvent } from '../interfaces/events.interface';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';


const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [eventName, setEventName] = useState('');
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const formatDate = (date) => dayjs(date).format('DD MMM YYYY hh:mm A');

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const response = await api.getEvents();
                if (response.data.events) {
                    setEvents(response.data.events);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

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
                    <TouchableOpacity style={styles.eventitem}>
                        <Text style={styles.eventName}>{item.name}</Text>
                        <Text style={styles.arrowIcon}>→</Text>
                    </TouchableOpacity>
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

                        <Pressable onPress={() => setShowStartDatePicker(true)} style={styles.dateInputButton}>
                            <Text>{startDate ? `Start Date: ${formatDate(startDate)}` : 'Select Start Date'}</Text>
                        </Pressable>
                        <DateTimePickerModal
                            isVisible={showStartDatePicker}
                            mode="datetime"
                            onConfirm={(date) => {
                                setStartDate(date);
                                setShowStartDatePicker(false);
                            }}
                            onCancel={() => setShowStartDatePicker(false)}
                            textColor="black"
                        />

                        <Pressable onPress={() => setShowEndDatePicker(true)} style={styles.dateInputButton}>
                            <Text>{endDate ? `End Date: ${formatDate(endDate)}` : 'Select End Date'}</Text>
                        </Pressable>
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
                            <Button title='Cancel' style={styles.cancelButton} textStyle={styles.cancelButtonTextStyle} onPress={() => setModalVisible(false)} />
                            <Button title='Add' style={styles.addEventButton} onPress={() => {/* Add event logic here */}} />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default HomeScreen;
