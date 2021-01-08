import React from "react";
import { TextInput } from "react-native";

import { styles } from "./style";

const Input = ({
    placeholder,
    secure,
    type,
    value,
    onChangeText,
    multiline,
    numberOfLines,
    styleInput,
}) => (
    <TextInput
        style={[styles.input, styleInput]}
        placeholder={placeholder}
        autoCapitalize="none"
        secureTextEntry={secure}
        textContentType={type}
        placeholderTextColor="#b9b5ff"
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
    />
);

export default Input;
