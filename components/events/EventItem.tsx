import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../../styles/home/event-item';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IEvent } from '../../interfaces/events.interface';
import { Ionicons } from '@expo/vector-icons';

interface EventItemProps {
  event: IEvent;
  onPress: () => void;
}
const getTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
};

const EventItem: React.FC<EventItemProps> = ({ event, onPress }) => {
  if (!event) {
    return null;
  }
  console.log(event);

  return (
    <TouchableOpacity style={styles.event_container} onPress={onPress}>
      <View>
        <Text style={styles.event_name}>{event.name}</Text>
        <View>
        <View style={[styles.event_detail, { marginTop: 13 }]}>
          <Fontisto name="date" size={14} color="#005C4A" />
            <Text style={styles.event_detail_text}>{new Date(event.start_date).toDateString()}</Text>
          </View>    
          <View style={styles.event_detail}>
            <MaterialCommunityIcons name="clock" size={14} color="#005C4A" />   
            <Text style={styles.event_detail_text}>{getTime(new Date(event.start_date))} - {getTime(new Date(event.end_date))}</Text>
          </View>  
          <View style={styles.event_detail}>
            <Ionicons name="person" size={14} color="#005C4A" />
            <Text style={styles.event_detail_text}>30 attendees</Text>

          </View> 
        </View>
      </View>

      <Text style={styles.event_arrow}>→</Text>
    </TouchableOpacity>
  );
};

export default EventItem;
