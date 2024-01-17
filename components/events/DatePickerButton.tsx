import React from 'react';
import { Pressable, Text } from 'react-native';
import styles from '../../styles/home/home';

interface DatePickerButtonProps {
  date: Date;
  onPress: () => void;
  formatDate: (date: Date) => string;
  label: string;
}

const DatePickerButton: React.FC<DatePickerButtonProps> = ({ date, onPress, formatDate, label }) => {
  return (
    <Pressable onPress={onPress} style={styles.dateInputButton}>
      <Text>{date ? `${label}: ${formatDate(date)}` : `Select ${label}`}</Text>
    </Pressable>
  );
};

export default DatePickerButton;
