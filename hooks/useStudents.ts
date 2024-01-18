import { useState, useEffect } from 'react';
import api from '../services/api';
import { IStudent } from '../interfaces/students.interface';
import { AxiosResponse } from 'axios';

const useStudents = (eventId: string) => {
    const [students, setStudents] = useState<IStudent[]>([]);
    const [studentError, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response: AxiosResponse = await api.getEventAttendees(eventId);
            setStudents(response.data.attendees);
            setLoading(false);
        } catch (error: any) {
            console.error('Error fetching students:', error);
            setError(error.response.data.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [eventId]);

    const addStudent = async (studentData: { student_id: number; name: string }) => {
        try {
            console.log("Student data: ", studentData);
            await api.addStudent(studentData, eventId);
            fetchStudents(); // Refresh the student list
        } catch (error: any) {
            console.error('Error adding student:', error);
            setError(error.response.data.message);
        }
    };

    const editStudent = async (studentId: number, newName: string) => {
        try {
            console.log("newName: ", newName)
            console.log("studentId: ", studentId)
            await api.editStudent(studentId, newName);
            fetchStudents();
        } catch (error: any) {
            console.error('Error editing student:', error);
            setError(error.response.data.message);
        }
    };

    return {
        students,
        studentError,
        loading,
        addStudent,
        editStudent,
        fetchStudents
    };
};

export default useStudents;
