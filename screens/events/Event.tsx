import React, { useContext } from "react";
import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import styles from "../../styles/home/home";
import common from "../../styles/common";
import ErrorDisplay from "../../components/common/ErrorDisplay";
import Button from "../../components/common/Button";
import api from "../../services/api";
import StudentNameModal from "../../components/students/StudentNameModal";
import useForm from "../../hooks/useForm";
import useModal from "../../hooks/useModal";
import useCamera from "../../hooks/useCamera";
import useStudents from "../../hooks/useStudents";
import { useEventDetailReducer } from "../../hooks/useEventDetailReducer";
import CameraComponent from "../../components/scans/CameraComponent";
import StudentList from "../../components/students/StudentList";
import NoStudents from "../../components/students/NoStudents";
import useAuth from "../../contexts/auth";
import { capitalize } from "../../utils/string";
import { EventDetailContext } from "../../contexts/EventDetails";

const isError = (error: string, studentError: string) => {
  return error || studentError;
}

const EventDetailScreen = ({ route }: any) => {
  const { state } = useAuth();

  const { event } = route.params;
  const {
    students,
    studentError,
    loading,
    addStudent,
    editStudent,
    fetchStudents,
  } = useStudents(event._id);
  const { eventState, dispatch } = useContext(EventDetailContext);
  const { error, scanData, currentStudentId, newName, showNameModal } = eventState;

  const {
    values: formValues,
    handleChange,
    resetForm,
  } = useForm({ studentName: "" });
  const cameraModal = useModal();
  const editModal = useModal();
  const nameModal = useModal();
  const {
    hasPermission,
    type,
    toggleCameraType,
    flashMode,
    toggleFlashMode,
    isCameraVisible,
    openCameraModal,
    closeCameraModal,
  } = useCamera();

  const handleStudentScan = async (scannedData: number): Promise<void> => {
    dispatch({ type: "SET_SCAN_DATA", payload: scannedData });
    cameraModal.closeModal();
    await addScannedStudent(scannedData);
  };

  const addScannedStudent = async (scannedData: number): Promise<void> => {
    try {
      const studentData = { student_id: scannedData };
      const response = await api.addStudent(studentData, event._id);
      
    } catch (error: any) {
      handleStudentAddError(error);
    } finally {
      fetchStudents();
    }
  };

  const handleStudentAddError = (error: any): void => {
    const regex = /^Student with ID \d{9} not found, Please provide a name$/;
    if (regex.test(error.response.data.message)) {
      nameModal.openModal();
    } else {
      dispatch({ type: "SET_ERROR", payload: error.response.data.message });
    }
  };

  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  const handleEditSubmit = async (newName: string) => {
    editModal.closeModal();
    await editStudent(currentStudentId, newName);
  };

  const handleCloseCamera = () => {
    cameraModal.closeModal();
  };

  const handleError = async () => {
    dispatch({ type: "SET_ERROR", payload: "" });
    fetchStudents();
  };
  if (cameraModal.visible){
    return (
        <CameraComponent
          onBarCodeScanned={(data) => handleStudentScan(parseInt(data))}
          cameraType={type}
          flashMode={flashMode}
          toggleCameraType={toggleCameraType}
          toggleFlashMode={toggleFlashMode}
          onClose={handleCloseCamera}
        />
    )
  }

  return (
    <SafeAreaView style={common.container}>
      <View style={[common.header, error || studentError ? { display: 'none' }: undefined ]}>
        <View style={styles.header_left}>
          <Text style={common.header_text}>{capitalize(event.name)}</Text>
          <View style={common.header_underline} />
        </View>
        <Button
          onPress={cameraModal.openModal}
          title={loading ? "" : "Scan"}
          disabled={loading}
          style={[
            styles.addButton,
            loading ? styles.buttonDisabled : undefined,
          ]}
        >
          {loading && <ActivityIndicator size="small" color="#FFF" />}
        </Button>
      </View>

      <ErrorDisplay loading={loading} error={error || studentError} handleError={handleError} />

      <StudentList
        loading={loading}
        error={error || studentError}
        students={students}
        onEditStudent={(item) => {
          dispatch({
            type: "SET_CURRENT_STUDENT_ID",
            payload: item.student_id,
          });
          dispatch({ type: "SET_NEW_NAME", payload: item.name });
          editModal.openModal();
        }}
      />
      {/* <Info loading={loading} error={error || studentError} students={students} /> */}
      
      <NoStudents students={students} loading={loading} error={error || studentError} />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#005C4A"
          />
        </View>
      )}

      <StudentNameModal
        visible={editModal.visible}
        onClose={() => editModal.closeModal()}
        onSubmit={handleEditSubmit}
        studentName={newName}
        setStudentName={(name: string) => handleChange("studentName", name)}
      />

      <StudentNameModal
        visible={nameModal.visible}
        onClose={() => nameModal.closeModal()}
        onSubmit={(name: string) => {
          addStudent({ name, student_id: scanData });
          nameModal.closeModal();
        }}
        studentName={formValues.studentName}
        setStudentName={(name: string) => handleChange("studentName", name)}
      />
    </SafeAreaView>
  );
};

export default EventDetailScreen;
