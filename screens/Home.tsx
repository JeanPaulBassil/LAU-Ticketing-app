import Button from '../components/Button';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import styles from '../components/styles/HomeScreenStyles';
import apiService from '../services/apiServices';

const eventsData = [
    { id: '1', name: 'Software Engineering' },
    { id: '2', name: 'Computer Science' },
];


interface Event {
    attendees: any[];
    _id: string;
    name: string;
    description: string;
    scan_type: string;
    start_date: string;
    end_date: string;
    clubs: string[];
    __v: number;
}

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [eventName, setEventName] = useState('');
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const eventsResponse = await apiService.getEvents();
                if (eventsResponse && eventsResponse.events) {
                    setEvents(eventsResponse.events);
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
                  onPress={() => apiService.getEvents()}
                  title="Add Event"
                  style={styles.addButton}
                  textStyle={styles.addButtonText}
                />
            </View>
            <FlatList
                data={events}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.eventitem}>
                        <Text style={styles.eventName}>{item.name}</Text>
                        <Text style={styles.arrowIcon}>→</Text>
                    </TouchableOpacity>
                )}
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
                        />
                        <View style={styles.modalButtons}>
                            <Button title='Cancel' style={styles.cancelButton} textStyle={styles.cancelButtonTextStyle}/>
                            <Button title='Add' style={styles.addEventButton}/>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};



export default HomeScreen;
