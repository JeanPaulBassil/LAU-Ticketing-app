import React from 'react';
import { FlatList, View } from 'react-native';
import EventItem from './EventItem';
import styles from '../../styles/home/home';
import { IEvent } from '../../interfaces/events.interface';

interface EventListProps {
    events: IEvent[];
    navigation: any;
    error: string;
    loading: boolean;
}

const EventList = ({ events, navigation, error, loading }: EventListProps) => {
    if (error || loading || Array.isArray(events) && events.length === 0) {
        return null;
    }
    console.log("EventList.tsx: events: ", events);

    const renderItem = ({ item }: { item: IEvent }) => (
        <EventItem 
            name={item.name} 
            onPress={() => navigation.navigate('Event', { event: item })}
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
