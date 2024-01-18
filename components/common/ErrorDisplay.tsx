import React from 'react';
import styles from '../../styles/home/home';
import { HelperText } from 'react-native-paper';
import { Image, View } from 'react-native';

const ErrorDisplay = ({ error }: {error: string}) => {
    if (!error) {
        return null;
    }

    return (
        <View style={styles.errorContainer}>
        <Image source={require('../../assets/events/error.png')} style={styles.errorImage} />
        <HelperText
            padding="none"
            style={styles.errorText}
            type="error"
            visible={!!error}
        >
            {error} try again later 
        </HelperText>
        </View>
    );
};

export default ErrorDisplay;
