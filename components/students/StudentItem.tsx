import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import { IStudent } from "../../interfaces/students.interface";
import { capitalize } from "../../utils/string";
import { getTime } from "../../utils/date";

type StudentItemProps = {
    student: IStudent;
    onEdit: () => void;
    open: () => void;
};
const getRandomColor = (): string => {
    const colors = ['#FF993C', '#316DE1', '#FE4666', '#A95DFE', '#005C4A', '#07d1f5', '#edf507'];
    return colors[Math.floor(Math.random() * colors.length)];
}


const StudentItem = ({ student, onEdit, open }: StudentItemProps) => {
  return (
    <TouchableOpacity onPress={onEdit} style={styles.student_row}>
      <View style={styles.student_left}>
        <Avatar.Text style={{ backgroundColor: getRandomColor() }} size={40} label={student && student.name && student.name[0].toUpperCase() || 'A'} />
        <View style={styles.student_details}>
          <Text style={styles.student_name}>{capitalize(student.name)}</Text>
          <Text style={styles.student_id}>{student.student_id}</Text>
        </View>
      </View>

      <View style={styles.button_container}>
        {/* <TouchableOpacity style={styles.button} >
          <FontAwesome5 name="pen" size={20} color="black" />
        </TouchableOpacity> */}
        <Text style={styles.date}>{getTime(new Date(student.date))}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  student_row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 10,
    marginHorizontal: 15,
    justifyContent: "space-between",
    height: 60,
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
  },
  student_left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  student_details: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10
  },
  student_name: {
    marginBottom: 5,
  },
  student_id: {
    fontSize: 12,
    color: "#005C4A",    
  },
  button_container: {
    flexDirection: "row",
    alignItems: "flex-start",
    height: '100%',
    paddingTop: 11
  },
  button: {
    marginRight: 10,
    marginLeft: 10,
  },
  date: {
    color: '#99999e',
    fontWeight: '500',
    fontSize: 11
  }
});

export default StudentItem;
