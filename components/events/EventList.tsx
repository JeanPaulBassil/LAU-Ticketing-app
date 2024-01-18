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
    if (events.length === 0 || error || loading) {
        return null;
    }

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
