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
const getKey = (item: IStudent, index: number) => item.id ? item.id.toString() : index.toString();

const StudentList: React.FC<Props> = ({ loading, error, students, onEditStudent }) => {
    if (error || loading || Array.isArray(students) && students.length === 0) {
        return null;
    }

    return (
        <FlatList
            data={students}
            keyExtractor={getKey}
            renderItem={({ item }) => (
                <StudentItem
                    name={item.name}
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