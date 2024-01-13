import React from 'react';
import { FlatList, View } from 'react-native';
import EventItem from '../components/EventItem';
import styles from './styles/HomeScreenStyles';
import { IEvent } from '../interfaces/events.interface';

const EventList = ({ events }: {events: IEvent[]}) => {
    const renderItem = ({ item }: { item: IEvent }) => (
        <EventItem 
            name={item.name} 
            onPress={() => {
                // TODO: Handle event press here
            }} 
        />
    );

    return (
        <View style={styles.eventsList}>
            <FlatList
                data={events}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                style={styles.eventsList}
            />
        </View>
    );
};

export default EventList;
