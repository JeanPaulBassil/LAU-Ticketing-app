import React from "react";
import styles from "../../styles/home/no-data";
import { View, Text, Image } from "react-native";

interface NoStudentsProps { 
    loading: boolean;
    error: string;
}

const NoStudents = ({ loading, error }: NoStudentsProps) => {
    if (error || loading) {
        return null;
    }

    return (
        <View style={[styles.container, styles.margin]}>
            <Image style={styles.image} source={require("../../assets/events/no-events-found.png")} />
            <Text style={styles.notFoundMessage}>There are no registered students for this event.</Text>
        </View>
    );
}

export default NoStudents;
