import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles/home/event-item";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IEvent } from "../../interfaces/events.interface";
import { Ionicons } from "@expo/vector-icons";
import { getTime } from "../../utils/date";

interface EventItemProps {
  event: IEvent;
  onPress: () => void;
}
const isActive = (event: IEvent): boolean => {
  const currentDate = new Date();
  const eventDate = new Date(event.start_date);
  return eventDate < currentDate;
};



const EventItem: React.FC<EventItemProps> = ({ event, onPress }) => {
  if (!event) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.event_container}
      onPress={onPress}
      disabled={!isActive(event)}
    >
      <View style={styles.event_left}>
        <Text style={styles.event_name}>{event.name}</Text>
        <View>
          <View style={[styles.event_detail, { marginTop: 13 }]}>
            <Fontisto name="date" size={14} color="#005C4A" />
            <Text style={styles.event_detail_text}>
              {new Date(event.start_date).toDateString()}
            </Text>
          </View>
          <View style={styles.event_detail}>
            <MaterialCommunityIcons name="clock" size={14} color="#005C4A" />
            <Text style={styles.event_detail_text}>
              {getTime(new Date(event.start_date))} -{" "}
              {getTime(new Date(event.end_date))}
            </Text>
          </View>
          <View style={styles.event_detail}>
            <Ionicons name="person" size={14} color="#005C4A" />
            <Text style={styles.event_detail_text}>{isActive(event) ? '30 attendees' : 'Not yet active.'}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.event_arrow_container, !isActive(event) && styles.event_arrow_container_inactive]}>
        <Text style={styles.event_arrow}>→</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventItem;
