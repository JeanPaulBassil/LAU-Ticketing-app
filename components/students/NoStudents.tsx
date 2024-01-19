import React from "react";
import styles from "../../styles/home/no-events";
import { View, Text, Image } from "react-native";
import { IStudent } from "../../interfaces/students.interface";

interface NoStudentsProps { 
    loading: boolean;
    error: string;
    students: IStudent[];
}

const NoStudents = ({ students, loading, error }: NoStudentsProps) => {
    if (error || loading || students.length > 0) {
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
