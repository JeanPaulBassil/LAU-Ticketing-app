import React from 'react';
import { FlatList, View } from 'react-native';
import EventItem from './EventItem';
import { IEvent } from '../../interfaces/events.interface';
import { StyleSheet } from "react-native";

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

    const renderItem = ({ item } : { item: IEvent } ) => {
        return (
        <EventItem 
            event={item}
            onPress={() => navigation.navigate('Event', { event: item })}
        />
    )};

    return (
        <View style={styles.events_list}>
            <FlatList
                data={events}
                keyExtractor={(event) => event._id}
                renderItem={renderItem}
                style={styles.events_list}
            />
        </View>
    );
};

export default EventList;


const styles = StyleSheet.create({
    events_list: {
        width: '100%',
        height: '100%',
        zIndex: -1,
        paddingBottom: 60,
    }
});
