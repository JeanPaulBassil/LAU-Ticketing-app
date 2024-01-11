import React from 'react';
import {TouchableOpacity, GestureResponderEvent, StyleSheet, Text} from 'react-native';

type ButtonProps = {
    onPress: (event: GestureResponderEvent) => void;
    title: string;
    style?: object;
    textStyle?:object;
    disabled?: boolean;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onPress, title, style, textStyle, disabled, children }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[styles.button, style]}
            disabled={disabled}
        >
            {children ? children : <Text style={[styles.text, textStyle]}>{title}</Text>}
        </TouchableOpacity>
    )
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
        fontSize: 21,
    },
    
})

export default Button;