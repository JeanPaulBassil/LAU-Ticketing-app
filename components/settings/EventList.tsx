import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import EventItem from './EventItem';
import { StyleSheet, Text, ScrollView } from "react-native";
import { IEvent } from '../../interfaces/events.interface';
import useEvents from '../../hooks/useEvents';
import { RefreshControl } from 'react-native-gesture-handler';

type Props = {
    loading: boolean;
    error: string;
    events: IEvent[];
    onDelete: (event_id: string) => void ;
    onEdit: (event_id: string) => void;
};

const getKey = (item: IEvent, index: number) => item._id ? item._id.toString() : index.toString();

const EventsList: React.FC<Props> = ({ loading, error, events, onDelete, onEdit }) => {
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const { fetchEvents } = useEvents();
    
    if (error || loading) {
        return null;
    }
    if (Array.isArray(events) && events.length === 0) {
        return <Text style={styles.no_events_text}>There are no events registered for this club.</Text>;
    }

    const onRefresh = async () => {
        setIsRefreshing(true);
        await fetchEvents();
        setIsRefreshing(false);
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
            {events.map((item: IEvent) => (
                <EventItem 
                    key={item._id}
                    event={item}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ScrollView>
    );
};

export default EventsList;




const styles = StyleSheet.create({
    events_list: {
        width: '100%',
        zIndex: -1,
        marginBottom: 60,
    },
    no_events_text: {
        color: '#aaa',
        fontSize: 14,
        marginTop: 20,
        paddingLeft: 20,
    }
});