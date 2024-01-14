import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, Modal, FlatList, TextInput, ActivityIndicator } from 'react-native';
import Button from '../components/Button';
import styles from '../components/styles/HomeScreenStyles';
import { createEventData } from '../interfaces/events.interface';
import useEvents from '../hooks/useEvents';
import useModal from '../hooks/useModal';
import useDatePicker from '../hooks/useDatePicker';
import useForm from '../hooks/useForm';
import EventModal from '../components/EventModal';
import EventList from '../components/EventList';
import ErrorDisplay from '../components/ErrorDisplay';

const HomeScreen = () => {
    const { events, loading, fetchEvents, addEvent, error } = useEvents();
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
                    title={loading ? "" : "Add Event"}
                    disabled={loading}
                    style={[styles.addButton, loading ? styles.buttonDisabled : undefined]}
                >
                    {loading && <ActivityIndicator size="small" color="#FFF" />}
                </Button>
                
            </View>

            <ErrorDisplay error={error} />

            <EventList events={events} />

            <EventModal
                visible={visible}
                onClose={closeModal}
                onAdd={addEvent}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
