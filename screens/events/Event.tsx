import React from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import styles from '../../styles/home/home';
import ErrorDisplay from '../../components/common/ErrorDisplay';
import Button from '../../components/common/Button';
import api from '../../services/api';
import StudentNameModal from '../../components/students/StudentNameModal';
import useForm from '../../hooks/useForm';
import useModal from '../../hooks/useModal';
import useCamera from '../../hooks/useCamera';
import useStudents from '../../hooks/useStudents';
import { useEventDetailReducer } from '../../hooks/useEventDetailReducer';
import CameraComponent from '../../components/scans/CameraComponent';
import StudentList from '../../components/students/StudentList';
import NoStudents from '../../components/students/NoStudents';


const EventDetailScreen = ({ route }: any) => {
    const { event } = route.params;
    const { students, studentError, loading, addStudent, editStudent } = useStudents(event._id);
    const [{ error, scanData, currentStudentId, newName, showNameModal }, dispatch] = useEventDetailReducer();
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

    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }
    

    const handleEditSubmit = async (newName: string) => {
        console.log('currentStudentId', currentStudentId)
        await editStudent(currentStudentId, newName);
        editModal.closeModal(); 
    };
    
    const handleCloseCamera = () => {
        cameraModal.closeModal();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{event.name}</Text>
                <View style={styles.header_underline} />
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
                onClose={() => editModal.closeModal()}
                onSubmit={handleEditSubmit}
                studentName={newName}          
                setStudentName={(name: string) => handleChange('studentName', name)}    
            />

            <StudentNameModal
                visible={nameModal.visible}
                onClose={() => nameModal.closeModal()}
                onSubmit={addStudent}
                studentName={formValues.studentName}
                setStudentName={(name: string) => handleChange('studentName', name)}
            />
            <NoStudents students={students} loading={loading} error={error} />
            <StudentList
                students={students}
                onEditStudent={(item) => {
                    dispatch({ type: 'SET_CURRENT_STUDENT_ID', payload: item.student_id });
                    dispatch({ type: 'SET_NEW_NAME', payload: item.name });
                    editModal.openModal();
                }}
            />
        </SafeAreaView>
    );
};

export default EventDetailScreen;