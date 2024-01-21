import React from 'react';
import { FlatList } from 'react-native';
import StudentItem from './StudentItem';
import { IStudent } from '../../interfaces/students.interface';
import { StyleSheet } from "react-native";



type Props = {
    loading: boolean;
    error: string;
    students: IStudent[];
    onEditStudent: (student: IStudent) => void;
};
const getKey = (item: IStudent, index: number) => item._id ? item._id.toString() : index.toString();

const fake_students: IStudent[] = [
    {
        student_id: 202208080,
        _id: 1,
        name: 'John Doe',
        date: '2021-08-08',
    },
    {
        student_id: 202208081,
        _id: 2,
        name: 'ahmad naser',
        date: '2021-08-08',
    },
    {
        student_id: 202208082,
        _id: 3,
        name: 'Erick Kosseify',
        date: '2021-08-08',
    },
    {
        student_id: 202208083,
        _id: 4,
        name: 'Layal Doe',
        date: '2021-08-08',
    },
    {
        student_id: 202208088,
        _id: 9,
        name: 'Amer Daou',
        date: '2021-08-08',
    },
    {
        student_id: 202208080,
        _id: 11,
        name: 'Toufic nasser',
        date: '2021-08-08',
    },
    {
        student_id: 202208083,
        _id: 14,
        name: 'Samir sanjab',
        date: '2021-08-08',
    },
]
const StudentList: React.FC<Props> = ({ loading, error, students, onEditStudent }) => {
    if (error || loading || Array.isArray(students) && students.length === 0) {
        return null;
    }
    
    return (
        <FlatList
            data={fake_students}
            keyExtractor={getKey}
            renderItem={({ item }) => (
                <StudentItem
                    student={item}
                    onEdit={() => onEditStudent(item)}
                />
            )}
            style={styles.student_list}
        />
    );
};

export default StudentList;




const styles = StyleSheet.create({
    student_list: {
        width: '100%',
        height: '100%',
        zIndex: -1,
        paddingBottom: 60,
    }
});