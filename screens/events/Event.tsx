import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from '../../components/styles/HomeScreenStyles';
import Constants from 'expo-constants';
import ErrorDisplay from '../../components/ErrorDisplay';
import Button from '../../components/Button';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from 'expo-camera';
import { FlashMode } from 'react-native-camera';
import { MaterialIcons } from '@expo/vector-icons';
import CameraButton from '../../components/CameraButtons';
import api from '../../services/api';
import StudentNameModal from '../../components/StudentNameModal';
import StudentItem from '../../components/StudentItem';
import { IStudent } from '../../interfaces/students.interface';

const EventDetailScreen = ({ route }: any) => {
    const { event } = route.params;
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [scanData, setScanData] = useState(null);
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [error, setError] = useState('');
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [data, setData] = useState<string>('');
    const [type, setType] = useState<CameraType>(Camera.Constants.Type.back);
    const [flash, setFlash] = useState<FlashMode>(Camera.Constants.FlashMode.off);
    const [showNameModal, setShowNameModal] = useState<boolean>(false);
    const cameraRef = useRef<Camera>(null);
    

    const handleStudentNameSubmit = async (name) => {
        try {
            const studentData = { student_id: parseInt(data), name };
            const response = await api.addStudent(studentData, event._id);
            console.log('Student added with name:', response);
        } catch (error) {
            console.error('Error adding student with name:', error);
            setError(error.response.data.message);
        }
        setShowNameModal(false);
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.getEventAttendees(event._id);
                console.log(response.data.attendees)
                setStudents(response.data.attendees);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    


    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }


    const handleDeleteStudent = (studentId: number) => {
    };

    const handleEditStudent = (studentId: number) => {
    };


    const renderStudentItem = ({ item }: any) => (
        <StudentItem 
            name={item.name} 
            onEdit={() => handleEditStudent(item.id)}
            onDelete={() => handleDeleteStudent(item.id)}
        />
    );
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{event.name}</Text>
                <Button
                    onPress={() => setIsCameraVisible(true)}
                    title={loading ? "" : "Scan"}
                    disabled={loading}
                    style={[styles.addButton, loading ? styles.buttonDisabled : undefined]}
                >
                    {loading && <ActivityIndicator size="small" color="#FFF" />}
                </Button>                
            </View>
            {error && <ErrorDisplay error={error} />}
            {isCameraVisible && <View style={StyleSheet.absoluteFillObject}>
                <Camera
                    style={cameraStyles.camera}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                    autoFocus={Camera.Constants.AutoFocus.on}
                    onBarCodeScanned={async (scan) => {
                        if (scan.data !== data) {
                            setData(scan.data);
                            console.log(scan.data);
                    
                            try {
                                const studentData = { student_id: parseInt(scan.data) };
                                console.log(studentData.id, typeof studentData.id)
                                const response = await api.addStudent(studentData, event._id);
                                console.log('Student added:', response);
                                // Handle the response as needed
                            } catch (error: any) {
                                console.error('Error adding student:', error.response.data.message);
                                if(error.response.data.message === 'Student with ID 202101772 not found, Please provide a name'){
                                    setShowNameModal(true);
                                } else
                                setError(error.response.data.message);
                                // Handle the error as needed
                            } 
                    
                            setIsCameraVisible(false);
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
                        <CameraButton icon={'retweet'} onPress={() => {
                            setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
                        }}/>
                        <CameraButton icon={'flash'} onPress={() => {
                            setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off)
                        }}/>
                        <CameraButton icon={'close'} onPress={() => {
                            setIsCameraVisible(false);
                            setData('');
                        }}/>
                    </View>
            </View>}

            <StudentNameModal
                visible={showNameModal}
                onClose={() => setShowNameModal(false)}
                onSubmit={handleStudentNameSubmit}
            />

        <View style={styles.eventsList}>
            <FlatList
                data={students}
                keyExtractor={(item) => item._id} 
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
        paddingBottom: 20
    },
    camera: {
        flex: 1,
    },
});

export default EventDetailScreen;
