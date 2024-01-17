import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles/home/home';

interface EventItemProps {
  name: string;
  onPress: () => void;
}

const EventItem: React.FC<EventItemProps> = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={styles.eventitem} onPress={onPress}>
      <Text style={styles.eventName}>{name}</Text>
      <Text style={styles.arrowIcon}>→</Text>
    </TouchableOpacity>
  );
};

export default EventItem;
