import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../../styles/home/home';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IEvent } from '../../interfaces/events.interface';

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


  return (
    <TouchableOpacity style={styles.eventitem} onPress={onPress}>
      <View style={styles.eventDetails}>
        <Text style={styles.eventName}>{event.name}</Text>
        <View>
        <View style={[styles.subDetail, { marginTop: 13 }]}>
          <Fontisto name="date" size={14} color="#005C4A" />
            <Text style={styles.light}>{new Date(event.start_date).toDateString()}</Text>
          </View>    
          <View style={styles.subDetail}>
            <MaterialCommunityIcons name="clock" size={14} color="#005C4A" />   
            <Text style={styles.light}>{getTime(new Date(event.start_date))} - {getTime(new Date(event.end_date))}</Text>
          </View>   
        </View>
      </View>

      <Text style={styles.arrowIcon}>→</Text>
    </TouchableOpacity>
  );
};

export default EventItem;
