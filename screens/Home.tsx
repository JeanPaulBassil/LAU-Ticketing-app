import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, Modal, FlatList, TextInput, ActivityIndicator } from 'react-native';
import Button from '../components/Button';
import styles from '../styles/home/home';
import { createEventData } from '../interfaces/events.interface';
import useEvents from '../hooks/useEvents';
import useModal from '../hooks/useModal';
import useDatePicker from '../hooks/useDatePicker';
import useForm from '../hooks/useForm';
import EventModal from '../components/EventModal';
import EventList from '../components/EventList';
import ErrorDisplay from '../components/ErrorDisplay';
import NoEvents from '../components/events/NoEvents';

const HomeScreen = ({ navigation }: any) => {
    const { events, loading, fetchEvents, addEvent, error, setEvents } = useEvents();
    const { visible, openModal, closeModal} = useModal();
    const { date: startDate, isPickerVisible: isStartVisible, showPicker: showStartPicker, hidePicker: hideStartPicker, handleConfirm: confirmStartPicker } = useDatePicker();
    const { date: endDate, isPickerVisible: isEndVisible, showPicker: showEndPicker, hidePicker: hideEndPicker, handleConfirm: confirmEndPicker } = useDatePicker();
    const { values, handleChange, resetForm } = useForm({eventName: ''});
    const { eventName } = values;


    useEffect(() => {
        fetchEvents();
        setEvents([]);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Events</Text>
                <View style={styles.header_underline} />
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

            <EventList events={events} navigation={navigation}/>

            <NoEvents events={events} loading={loading} error={error} />

            <EventModal
                visible={visible}
                onClose={closeModal}
                onAdd={addEvent}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
