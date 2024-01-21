import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { capitalize } from "../../utils/string";
import { getTime } from "../../utils/date";
import { IEvent } from "../../interfaces/events.interface";
import { MaterialIcons } from '@expo/vector-icons';

type EventItemProps = {
    event: IEvent;
    onDelete: (event_id: string) => void;
};


const EventItem = ({ event, onDelete }: EventItemProps) => {
  return (
    <View  style={styles.event_row}>
      <View style={styles.event_left}>
        <View style={styles.event_details}>
          <Text style={styles.event_name}>{capitalize(event.name)}</Text>
          <Text style={styles.event_time}>{new Date(event.start_date).toDateString()}</Text>
          <Text style={styles.event_time}>{getTime(new Date(event.start_date))} - {getTime(new Date(event.end_date))}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => onDelete(event._id)} style={styles.button_container}>
        <MaterialIcons name="delete-outline" size={20} color="#CC2400" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  event_row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 10,
    justifyContent: "space-between",
    height: 70,
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
    padding: 20
  },
  event_left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  event_details: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  event_name: {
    marginBottom: 5,
  },
  event_time: {
    fontSize: 12,
    marginBottom: 5,
    color: "#005C4A",    
  },
  button_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    height: '100%',
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

export default EventItem;
