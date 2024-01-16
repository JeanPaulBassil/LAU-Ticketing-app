import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const StudentItem = ({ name, onEdit, onDelete }) => {
    return (
        <View style={styles.studentItem}>
            <Text style={styles.studentName}>{name}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onEdit}>
                    <FontAwesome5 name="pen" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onDelete}>
                    <FontAwesome name="trash" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    studentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 15,
        marginTop: 10,
        marginHorizontal: 15,
        justifyContent: 'space-between',
        height: 60,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
    },
    studentName: {
        fontSize: 20,
        flex: 1, 
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginRight: 10,
        marginLeft: 10,
    },
});

export default StudentItem;
