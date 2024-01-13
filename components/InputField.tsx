import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, StyleSheet, ViewStyle } from 'react-native';

type InputFieldProps = TextInputProps & {
  containerStyle?: ViewStyle;
};

const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ containerStyle, ...props }, ref) => {
    return (
      <TextInput
        className="border-b-[1px] border-gray w-full mt-5"
        style={[styles.input, containerStyle]}
        ref={ref}
        {...props}
      />
    );
  }
);

const styles = StyleSheet.create({
  input: {
    // Your input styles here
  },
});

export default InputField;
