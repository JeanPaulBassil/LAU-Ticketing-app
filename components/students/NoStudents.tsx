import React from "react";
import styles from "../../styles/home/no-data";
import { View, Text, Image } from "react-native";
import { IStudentScan } from "../../interfaces/students.interface";

interface NoStudentsProps { 
    loading: boolean;
    error: string;
    students: IStudentScan[];
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
