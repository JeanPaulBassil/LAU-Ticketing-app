import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, StyleSheet } from 'react-native';
import Button from './Button';
import styles from './styles/HomeScreenStyles'; 

const StudentNameModal = ({ visible, onClose, onSubmit, studentName, setStudentName }: any) => {
    const [localName, setLocalName] = useState(studentName);

    useEffect(() => {
        setLocalName(studentName);
    }, [studentName]);

    const handleSubmit = async () => {
        onSubmit(localName);
        setLocalName(''); 
    };

    const handleCancel = () => {
        setLocalName('');
        onClose();
    };

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enter Student Name</Text>
                    <TextInput
                        placeholder='Student Name'
                        style={styles.modalInput}
                        placeholderTextColor={'#AAAAAA'}
                        value={localName}
                        onChangeText={setLocalName}
                    />
                    <View style={styles.modalButtons}>
                        <Button 
                          title='Cancel' 
                          style={styles.cancelButton} 
                          onPress={handleCancel} 
                          textStyle={styles.cancelButtonText}
                        />
                        <Button 
                          title='Submit' 
                          style={styles.addEventButton} 
                          onPress={handleSubmit} 
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default StudentNameModal;
