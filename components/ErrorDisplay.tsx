import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/home/home';
import { HelperText } from 'react-native-paper';

const ErrorDisplay = ({ error }: {error: string}) => {
    if (!error) {
        return null;
    }

    return (
        <HelperText
            padding="none"
            style={styles.errorText}
            type="error"
            visible={!!error}
        >
            {error}
        </HelperText>
    );
};

export default ErrorDisplay;
