import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IStudent } from "../../interfaces/students.interface";

interface InfoProps { 
    loading: boolean;
    error: string;
    students: IStudent[];
}

const Info = ({ students, loading, error }: InfoProps) => {
    if (error || loading || students.length === 0) {
        return null;
    }

    return (
        <View style={styles.info_container}>
            <Text style={styles.info_text}>
                Tap on a student to edit their details.
            </Text>
        </View>
    );
}

export default Info;

const styles = StyleSheet.create({
    info_container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
        backgroundColor: 'red',
        flex: 0.1
    },
    info_text: {
        fontSize: 14,
        marginBottom: 10,
        color: '#666',
    },
}) ;

