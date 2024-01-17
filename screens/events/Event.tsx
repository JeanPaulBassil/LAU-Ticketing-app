import React, { useEffect, useRef, useState } from 'react';
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

const EventDetailScreen = ({ route }: any) => {
    const { event } = route.params;
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [scanData, setScanData] = useState(null);
    const [error, setError] = useState('');
    const [showNameModal, setShowNameModal] = useState<boolean>(false);
    const cameraRef = useRef<Camera>(null);
    const [currentStudentId, setCurrentStudentId] = useState<number | null>(null);
    const [newName, setNewName] = useState('');
    const { values: formValues, handleChange, resetForm } = useForm({ studentName: '' });
    const cameraModal = useModal();
    const editModal = useModal();
    const nameModal = useModal();
    const { hasPermission, type, toggleCameraType, flashMode, toggleFlashMode, isCameraVisible, openCameraModal, closeCameraModal } = useCamera();


    const handleStudentNameSubmit = async () => {
        try {
            const studentData = { student_id: parseInt(data), name: formValues.studentName };
            const response = await api.addStudent(studentData, event._id);
    
            resetForm(); 
            nameModal.closeModal(); 
        } catch (error) {
            console.error('Error adding student with name:', error);
            setError(error.response.data.message);
        }
    };
    
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.getEventAttendees(event._id);
                setStudents(response.data.attendees);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    
    


    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }
    

    const handleEditSubmit = async () => {
        try {
            const response = await api.editStudent(currentStudentId, newName);    
            editModal.closeModal(); 
        } catch (error: any) {
            console.error('Error editing student:', error);
            setError(error.response.data.message);
        }
    };
    

    const renderStudentItem = ({ item }: any) => (
        <StudentItem 
            name={item.name} 
            onEdit={() => {
                console.log('Editing student with ID:', item.student_id); // Debugging log
                setCurrentStudentId(item.student_id);
                setNewName(item.name);
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
            {cameraModal.visible && <View style={StyleSheet.absoluteFillObject}>
                <Camera
                    style={cameraStyles.camera}
                    type={type}
                    flashMode={flashMode}
                    ref={cameraRef}
                    autoFocus={AutoFocus.on}
                    onBarCodeScanned={ async (scan) => {
                        setScanData(scan.data);
                        console.log(scan.data);
                        cameraModal.closeModal();
                        try {
                            const studentData = { student_id: parseInt(scan.data) };
                            console.log(studentData.id, typeof studentData.id)
                            const response = await api.addStudent(studentData, event._id);
                            console.log('Student added:', response);
                        } catch (error: any) {
                            console.error('Error adding student:', error.response.data.message);
                            const regex = /^Student with ID \d{9} not found, Please provide a name$/;
                            if(regex.test(error.response.data.message)){
                                console.log("Here")
                                setShowNameModal(true);
                            } else {
                                setError(error.response.data.message);
                            }
                        } 
                    }}
                >
                    
                </Camera>
                <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 20,
                        backgroundColor: 'black',
                    }}>
                        <CameraButton icon={'retweet'} onPress={toggleCameraType}/>
                        <CameraButton icon={'flash'} onPress={toggleFlashMode}/>
                        <CameraButton icon={'close'} onPress={cameraModal.closeModal}/>
                    </View>
            </View>}
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
                onSubmit={handleStudentNameSubmit}
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