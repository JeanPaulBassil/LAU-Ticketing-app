import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, Modal, FlatList, TextInput, ActivityIndicator, Image } from 'react-native';
import Button from '../components/common/Button';
import styles from '../styles/home/home';
import common from '../styles/common';
import useEvents from '../hooks/useEvents';
import useModal from '../hooks/useModal';
import EventModal from '../components/events/EventModal';
import EventList from '../components/events/EventList';
import ErrorDisplay from '../components/common/ErrorDisplay';
import NoEvents from '../components/events/NoEvents';
import useAuth from '../contexts/auth';
import { capitalize } from '../utils/string';

const HomeScreen = ({ navigation }: any) => {
    const { events, loading, fetchEvents, addEvent, error, setEvents } = useEvents();
    const { visible, openModal, closeModal} = useModal();
    const { state } = useAuth();
    
    useEffect(() => {
        fetchEvents();
        // testing purposes
        // setEvents([]);  
    }, []);

    return (
        <SafeAreaView style={common.container}>
            <View style={common.header}>
                <View style={styles.header_left}>
                    <Text style={common.headerText}>{capitalize(state.club?.name)}</Text>
                    <View style={common.header_underline} />
                </View>
                <Button
                    onPress={openModal}
                    title={loading ? "" : "Add Event"}
                    disabled={loading}
                    style={[styles.addButton, loading ? styles.buttonDisabled : undefined]}
                >
                    {loading && <ActivityIndicator size="small" color="#FFF" />}
                </Button>
                
            </View>

            <ErrorDisplay loading={loading} error={error} handleError={fetchEvents}/>

            <EventList loading={loading} error={error} events={events} navigation={navigation} />

            <NoEvents events={events} loading={loading} error={error} />
            
            {loading && <View style={styles.loadingContainer}>
                <ActivityIndicator style={styles.loader} size="large" color="#005C4A" />
            </View>}
            <EventModal
                visible={visible}
                onClose={closeModal}
                onAdd={addEvent}
                loading={loading}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
