import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, View, Text, Modal, FlatList, TextInput, ActivityIndicator, Image } from 'react-native';
import Button from '../components/common/Button';
import styles from '../styles/home/home';
import common from '../styles/common';
import useEvents from '../hooks/useEvents';
import useHookModal from '../hooks/useModal';
import EventModal from '../components/events/EventModal';
import EventList from '../components/events/EventList';
import ErrorDisplay from '../components/common/ErrorDisplay';
import NoEvents from '../components/events/NoEvents';
import useAuth from '../contexts/auth';
import { capitalize } from '../utils/string';
import { useModal } from '../contexts/modal';

const HomeScreen = ({ navigation }: any) => {
    const { events, loading, fetchEvents, addEvent, error, setEvents } = useEvents();
    const { visible, openModal, closeModal} = useHookModal();
    const { state } = useAuth();
    const { isModalVisible, setModalVisible } = useModal();


    const close = useCallback(() => {
        setModalVisible(false);
        closeModal();
    },[]);

    useEffect(() => {
        fetchEvents();  
    }, []);

    return (
        <SafeAreaView style={common.container}>
            <View style={[common.header, error ? { display: 'none' }: undefined ]}>
                <View style={styles.header_left}>
                    <Text style={common.header_text}>{capitalize(state.club?.name)}</Text>
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
                visible={visible || isModalVisible}
                onClose={close}
                onAdd={addEvent}
                loading={loading}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
