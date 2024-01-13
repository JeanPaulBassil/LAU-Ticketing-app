import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, Modal, FlatList, TextInput, ActivityIndicator } from 'react-native';
import Button from '../components/Button';
import EventItem from '../components/EventItem';
import styles from '../components/styles/HomeScreenStyles';
import { createEventData } from '../interfaces/events.interface';
import useEvents from '../hooks/useEvents';
import useModal from '../hooks/useModal';
import useDatePicker from '../hooks/useDatePicker';
import useForm from '../hooks/useForm';
import { HelperText } from 'react-native-paper';
import EventModal from '../components/EventModal';

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

            {error && (
                    <HelperText
                      padding="none"
                      style={styles.errorText}
                      type="error"
                      visible={!!error}
                    >
                      {error}
                    </HelperText>
            )}

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

            <EventModal
                visible={visible}
                onClose={closeModal}
                onAdd={addEvent}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
