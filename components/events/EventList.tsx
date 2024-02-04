import React, { useState, useCallback } from 'react';
import { ScrollView, RefreshControl, StyleSheet, View, Text } from 'react-native';
import EventItem from './EventItem';
import { IEvent } from '../../interfaces/events.interface';
import useEvents from '../../hooks/useEvents';
import NoEvents from './NoEvents';

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

    const content = () => {
        if (events.length === 0) {
            return <NoEvents error={error} loading={loading}/>;
        } else {
            return events.map((item: IEvent) => (
                <EventItem
                    key={item._id}
                    event={item}
                    onPress={() => navigation.navigate('Event', { event: item })}
                />
            ));
        }
    };

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
            {content()}
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
