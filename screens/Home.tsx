import Button from '../components/Button';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import styles from '../components/styles/HomeScreenStyles';
import api from '../services/api';
import { IEvent } from '../interfaces/events.interface';
const eventsData = [
    { id: '1', name: 'Software Engineering' },
    { id: '2', name: 'Computer Science' },
];


const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [eventName, setEventName] = useState('');
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(false);

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
