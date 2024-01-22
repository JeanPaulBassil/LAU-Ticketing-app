import React, { useState, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import EventItem from './EventItem';
import { IEvent } from '../../interfaces/events.interface';
import { StyleSheet, RefreshControl } from "react-native";
import useEvents from '../../hooks/useEvents';

interface EventListProps {
    events: IEvent[];
    navigation: any;
    error: string;
    loading: boolean;
}

const EventList = ({ events, navigation, error, loading }: EventListProps) => {
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const { fetchEvents } = useEvents();

    const onRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await fetchEvents();
        setIsRefreshing(false);
    }, []);



    if (error || loading && !isRefreshing || Array.isArray(events) && events.length === 0) {
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
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
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
