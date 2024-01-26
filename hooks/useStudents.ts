import { useState, useEffect } from 'react';
import api from '../services/api';
import { IStudentScan } from '../interfaces/students.interface';
import { AxiosResponse } from 'axios';

const useStudents = (eventId: string) => {
    const [students, setStudents] = useState<IStudentScan[]>([]);
    const [studentError, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response: AxiosResponse = await api.getEventAttendees(eventId);
            setStudents(response.data.attendees);
            console.log(students)
        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [eventId]);

    const addStudent = async (studentData: { student_id: number | null; name: string }) => {
        try {
            await api.addStudent(studentData, eventId);
        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            fetchStudents();
        }
    };

<<<<<<< HEAD
    const editStudent = async (studentId: number | null, newName: string) => {
        if (!studentId) return setError('No student selected');
=======
    const editStudent = async (studentId: number, newName: string) => {
        console.log(studentId, newName)
>>>>>>> b662b713d830ed130e7a9d4fb5d46563511a3800
        try {
            await api.editStudent(studentId, newName);
            fetchStudents();
        } catch (error: any) {
            setError(error.response.data.message);
        }
    };

    return {
        students,
        studentError,
        loading,
        addStudent,
        editStudent,
        fetchStudents,
    };
};

export default useStudents;
