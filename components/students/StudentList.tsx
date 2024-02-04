import React, { useState, useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import StudentItem from './StudentItem';
import { IStudent, IStudentScan } from '../../interfaces/students.interface';
import { StyleSheet } from "react-native";

type Props = {
    loading: boolean;
    error: string;
    students: IStudentScan[];
    onEditStudent: (student: IStudent) => void;
    fetchStudents: () => Promise<void>;
};

const StudentList: React.FC<Props> = ({ loading, error, students, onEditStudent, fetchStudents }) => {
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const onRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await fetchStudents();
        setIsRefreshing(false);
    }, [fetchStudents]);

    if (error || (Array.isArray(students) && students.length === 0)) {
        return null;
    }

    return (
        <FlatList
            data={students}
            keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()}
            renderItem={({ item }) => (
                <StudentItem
                    student={item.student}
                    onEdit={() => onEditStudent(item.student)}
                    date={item.date}
                />
            )}
            style={styles.student_list}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            }
        />
    );
};

const styles = StyleSheet.create({
    student_list: {
        width: '100%',
        height: '100%',
        zIndex: -1,
        marginBottom: 50
    }
});

export default StudentList;
