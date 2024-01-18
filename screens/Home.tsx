import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, Modal, FlatList, TextInput, ActivityIndicator, Image } from 'react-native';
import Button from '../components/common/Button';
import styles from '../styles/home/home';
import useEvents from '../hooks/useEvents';
import useModal from '../hooks/useModal';
import EventModal from '../components/events/EventModal';
import EventList from '../components/events/EventList';
import ErrorDisplay from '../components/common/ErrorDisplay';
import NoEvents from '../components/events/NoEvents';

const HomeScreen = ({ navigation }: any) => {
    const { events, loading, fetchEvents, addEvent, error, setEvents } = useEvents();
    const { visible, openModal, closeModal} = useModal();

    useEffect(() => {
        fetchEvents();
        // testing purposes
        // setEvents([]);
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

            <EventList error={error} events={events} navigation={navigation}/>

            <NoEvents events={events} loading={loading} error={error} />
            
            {loading && <View style={styles.loadingContainer}>
                <ActivityIndicator style={styles.loader} size="large" color="#005C4A" />
            </View>}
            <EventModal
                visible={visible}
                onClose={closeModal}
                onAdd={addEvent}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
