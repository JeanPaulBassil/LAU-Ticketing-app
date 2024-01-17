import React from "react";
import { IEvent } from "../../interfaces/events.interface";
import styles from "../../styles/home/no-events";
import { View, Text, Image } from "react-native";

interface NoEventsProps { 
    loading: boolean;
    error: string;
    events: IEvent[]
}

const NoEvents = ({ events, loading, error }: NoEventsProps) => {
    if (loading || error || !events || !events.length) {
        return null;
    }

    console.log('events', events)
    console.log('loading', loading);
    console.log('error', error);
    console.log('events.length', events.length);
    console.log('events.length === 0', events.length === 0);

    return (
        <View style={styles.noEvents}>
            <Image source={require("../../assets/no-events-found.svg")} />
            <Text style={styles.noEventsText}>There are no upcoming events at this time.</Text>
        </View>
    );
    
}

export default NoEvents;