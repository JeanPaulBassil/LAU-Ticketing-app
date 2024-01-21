import React from "react";
import { IEvent } from "../../interfaces/events.interface";
import styles from "../../styles/home/no-data";
import { View, Text, Image } from "react-native";

interface NoEventsProps { 
    loading: boolean;
    error: string;
    events: IEvent[];
}

const NoEvents = ({ events, loading, error }: NoEventsProps) => {
    if (error || loading || Array.isArray(events) && events.length > 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/events/no-events-found.png")} />
            <Text style={styles.notFoundMessage}>There are no upcoming events at this time.</Text>
        </View>
    );
}

export default NoEvents;
