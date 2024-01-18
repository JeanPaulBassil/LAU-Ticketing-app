import React from 'react';
import { FlatList } from 'react-native';
import StudentItem from './StudentItem';
import { IStudent } from '../interfaces/students.interface';

type Props = {
    students: IStudent[];
    onEditStudent: (student: IStudent) => void;
};

const StudentList: React.FC<Props> = ({ students, onEditStudent }) => {
    const getKey = (item: IStudent, index: number) => item.id ? item.id.toString() : index.toString();

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
        />
    );
};

export default StudentList;
