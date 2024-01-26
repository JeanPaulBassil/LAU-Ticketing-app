import React from 'react';
import {TouchableOpacity, GestureResponderEvent, StyleSheet, Text, View} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';


type ButtonProps = {
    onPress: (event: GestureResponderEvent) => void;
    title: string;
    style?: object;
    textStyle?:object;
    disabled?: boolean;
    children?: React.ReactNode;
    iconName?: string | any;
}

const Button: React.FC<ButtonProps> = ({ onPress, title, style, textStyle, disabled, iconName, children }) => {
    return (
        <TouchableOpacity 
          onPress={onPress} 
          style={[styles.button, style]}
          disabled={disabled}
        >
          {children ? children : (
            <View style={styles.flex}>
              <Text style={[styles.text, textStyle]}>{title}</Text>
              {iconName && <SimpleLineIcons name={iconName} size={15} color="white" />}
            </View>
          )}
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#005C4A',
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3
    },
    text: {
        color: 'white',
        fontSize: 17,
        marginRight: 10
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    }
})

export default Button;