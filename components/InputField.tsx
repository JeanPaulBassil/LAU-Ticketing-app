import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
    containerStyle?: object;
}

const InputField: React.FC<InputFieldProps> = ({ containerStyle, ...props }) => {
    return (
        <TextInput
            className="border-b-[1px] border-gray w-full mt-5"
            style={[styles.input, containerStyle]}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 20,
    }
})

export default InputField;