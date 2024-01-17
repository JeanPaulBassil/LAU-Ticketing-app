import React from "react";
import { IEvent } from "../../interfaces/events.interface";
import styles from "../../styles/home/no-events";
import { View, Text, Image } from "react-native";

interface NoEventsProps { 
    loading: boolean;
    error: string;
    events: IEvent[];
}

const NoEvents = ({ events, loading, error }: NoEventsProps) => {
    if (loading || events.length > 0) {
        return null;
    }

    let content = <Text style={[styles.eventsText]}>There are no upcoming events at this time.</Text>;

    if (error) {
        content = <Text style={[styles.eventsText, styles.errorText]}>Error loading events. Try Again.</Text>;
    }

    return (
        <View style={styles.container}>
            {content}
            <Image style={styles.image} source={require("../../assets/no-events-found.png")} />
            
        </View>
    );
}

export default NoEvents;
