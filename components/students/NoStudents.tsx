import React from "react";
import { IEvent } from "../../interfaces/events.interface";
import styles from "../../styles/home/no-events";
import { View, Text, Image } from "react-native";

interface NoStudentsProps { 
    loading: boolean;
    error: string;
    events: IEvent[];
}

const NoStudents = ({ events, loading, error }: NoStudentsProps) => {
    if (error || loading || events.length > 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/events/no-events-found.png")} />
            <Text style={styles.notFoundMessage}>There are no registered students for this event.</Text>
        </View>
    );
}

export default NoStudents;
