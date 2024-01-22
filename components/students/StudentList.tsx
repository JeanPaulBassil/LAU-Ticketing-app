import React from 'react';
import { FlatList } from 'react-native';
import StudentItem from './StudentItem';
import { IStudentScan, Attendee, IStudent } from '../../interfaces/students.interface';
import { StyleSheet } from "react-native";



type Props = {
    loading: boolean;
    error: string;
    students: IStudentScan[];
    onEditStudent: (student: IStudent) => void;
};
const getKey = (item: IStudent, index: number) => item._id ? item._id.toString() : index.toString();


const StudentList: React.FC<Props> = ({ loading, error, students, onEditStudent }) => {
    console.log(students);
    if (error || loading || Array.isArray(students) && students.length === 0) {
        return null;
    }
    
    return (
        <FlatList
            data={students}
            keyExtractor={getKey}
            renderItem={({ item }) => (
                <StudentItem
                    student={item.student}
                    onEdit={() => onEditStudent(item.student)}
                    date={item.date}
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
        marginBottom: 50
    }
});