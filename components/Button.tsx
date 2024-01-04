import React from 'react';
import {TouchableOpacity, GestureResponderEvent, StyleSheet, Text} from 'react-native';

type ButtonProps = {
    onPress: (event: GestureResponderEvent) => void;
    title: string;
    style?: object;
    textStyle?:object;
}

const Button: React.FC<ButtonProps> = ({ onPress, title, style, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'green',
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
    }
})

export default Button;