import React, { useEffect, useRef, useState, useReducer } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, StyleSheet, Modal, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from '../../components/styles/HomeScreenStyles';
import Constants from 'expo-constants';
import ErrorDisplay from '../../components/ErrorDisplay';
import Button from '../../components/Button';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, AutoFocus } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import CameraButton from '../../components/CameraButtons';
import api from '../../services/api';
import StudentNameModal from '../../components/StudentNameModal';
import StudentItem from '../../components/StudentItem';
import { IStudent } from '../../interfaces/students.interface';
import useForm from '../../hooks/useForm';
import useModal from '../../hooks/useModal';
import useCamera from '../../hooks/useCamera';
import useStudents from '../../hooks/useStudents';
import { useEventDetailReducer } from '../../hooks/useEventDetailReducer';
import CameraComponent from '../../components/CameraComponent';

const EventDetailScreen = ({ route }: any) => {
    const { event } = route.params;
    const { students, studentError, loading, addStudent, editStudent } = useStudents(event._id);
    const [{ error, scanData, currentStudentId, newName, showNameModal }, dispatch] = useEventDetailReducer();
    const cameraRef = useRef<Camera>(null);
    const { values: formValues, handleChange, resetForm } = useForm({ studentName: '' });
    const cameraModal = useModal();
    const editModal = useModal();
    const nameModal = useModal();
    const { hasPermission, type, toggleCameraType, flashMode, toggleFlashMode, isCameraVisible, openCameraModal, closeCameraModal } = useCamera();

    const handleStudentScan = async (scannedData: number): Promise<void> => {
        dispatch({ type: 'SET_SCAN_DATA', payload: scannedData });
        cameraModal.closeModal();
        await addScannedStudent(scannedData);
    };

    const addScannedStudent = async (scannedData: number): Promise<void> => {
        try {
            const studentData = { student_id: scannedData };
            const response = await api.addStudent(studentData, event._id);
            console.log('Student added:', response);
        } catch (error: any) {
            handleStudentAddError(error);
        }
    };

    const handleStudentAddError = (error: any): void => {
        console.error('Error adding student:', error.response.data.message);
        const regex = /^Student with ID \d{9} not found, Please provide a name$/;
        if (regex.test(error.response.data.message)) {
            nameModal.openModal();
        } else {
            dispatch({ type: 'SET_ERROR', payload: error.response.data.message });
        }
    };
    
    const handleStudentEdit = async (studentId: number | null, newName: string): Promise<void> => {
        try {
            if (studentId !== null) {
                await editStudent(studentId, newName);
                editModal.closeModal();
                dispatch({ type: 'SET_CURRENT_STUDENT_ID', payload: null });
                dispatch({ type: 'SET_NEW_NAME', payload: '' });
            }
        } catch (error: any) {
            dispatch({ type: 'SET_ERROR', payload: error.response.data.message });
        }
    };
    


    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }
    

    const handleEditSubmit = async (newName: string) => {
        await editStudent(currentStudentId, newName);
        editModal.closeModal(); 
    };
    
    const handleCloseCamera = () => {
        cameraModal.closeModal();
    }

    const renderStudentItem = ({ item }: any) => (
        <StudentItem 
            name={item.name} 
            onEdit={() => {
                dispatch({ type: 'SET_CURRENT_STUDENT_ID', payload: item.student_id });
                dispatch({ type: 'SET_NEW_NAME', payload: item.name });
                editModal.openModal();
            }}
        />
    );

    return (
        <SafeAreaView style={styles.container}>

            
            <View style={styles.header}>
                <Text style={styles.headerText}>{event.name}</Text>
                <Button
                    onPress={cameraModal.openModal}
                    title={loading ? "" : "Scan"}
                    disabled={loading}
                    style={[styles.addButton, loading ? styles.buttonDisabled : undefined]}
                >
                    {loading && <ActivityIndicator size="small" color="#FFF" />}
                </Button>                
            </View>
            {error && <ErrorDisplay error={error} />}
            {cameraModal.visible && 
            <CameraComponent
                onBarCodeScanned={(data) => handleStudentScan(parseInt(data))}
                cameraType={type} 
                flashMode={flashMode}
                toggleCameraType={toggleCameraType} 
                toggleFlashMode={toggleFlashMode} 
                onClose={handleCloseCamera}
            />}
            <StudentNameModal
                visible={editModal.visible}
                onClose={() => editModal.closeModal}
                onSubmit={handleEditSubmit}
                studentName={newName}          
                setStudentName={(name: string) => handleChange('studentName', name)}    
            />

            <StudentNameModal
                visible={nameModal.visible}
                onClose={() => nameModal.closeModal}
                onSubmit={addStudent}
                studentName={formValues.studentName}
                setStudentName={(name: string) => handleChange('studentName', name)}
            />

        <View style={styles.eventsList}>
            <FlatList
                data={students}
                keyExtractor={(item: any) => item._id} 
                renderItem={renderStudentItem}
            />
        </View>
        </SafeAreaView>
    );
};

const cameraStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingBottom: 20,
        zIndex: 1,
    },
    camera: {
        flex: 1,
    },
});

export default EventDetailScreen;