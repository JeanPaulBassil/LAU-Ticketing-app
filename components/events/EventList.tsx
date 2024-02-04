import React, { useState, useCallback } from 'react';
import { ScrollView, View, RefreshControl, StyleSheet } from 'react-native';
import EventItem from './EventItem';
import { IEvent } from '../../interfaces/events.interface';
import useEvents from '../../hooks/useEvents';

interface EventListProps {
    events: IEvent[];
    navigation: any;
    error: string;
    loading: boolean;
    fetchStudents: () => Promise<void>;
}

const EventList = ({ events, navigation, error, loading, fetchStudents }: EventListProps) => {
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

    return (
        <ScrollView
            style={styles.events_list}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            {events.map((item: IEvent) => (
                <EventItem 
                    key={item._id}
                    event={item}
                    onPress={() => navigation.navigate('Event', { event: item })}
                />
            ))}
        </ScrollView>
    );
};

export default EventList;

const styles = StyleSheet.create({
    events_list: {
        flex: 1,
        paddingBottom: 60,
    }
});
