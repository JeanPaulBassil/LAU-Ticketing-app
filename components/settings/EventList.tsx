import React from 'react';
import { FlatList } from 'react-native';
import EventItem from './EventItem';
import { StyleSheet, Text } from "react-native";
import { IEvent } from '../../interfaces/events.interface';


type Props = {
    loading: boolean;
    error: string;
    events: IEvent[];
    onDelete: (event_id: string) => void ;
    onEdit: (event_id: string) => void;
};

const getKey = (item: IEvent, index: number) => item._id ? item._id.toString() : index.toString();

const EventsList: React.FC<Props> = ({ loading, error, events, onDelete, onEdit }) => {
    if (error || loading) {
        return null;
    }
    if (Array.isArray(events) && events.length === 0) {
        return <Text style={styles.no_events_text}>There are no events registered for this club.</Text>;
    }
    
    return (
        <FlatList
            data={events}
            keyExtractor={getKey}
            renderItem={({ item }) => (
                <EventItem
                    event={item}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            )}
            style={styles.events_list}
        />
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