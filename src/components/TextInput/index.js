import React from "react";
import { TextInput } from "react-native";

import { styles } from "./style";

const Input = ({ secure, type, styleInput, ...rest }) => (
    <TextInput
        {...rest}
        style={[styles.input, styleInput]}
        autoCapitalize="none"
        secureTextEntry={secure}
        textContentType={type}
        placeholderTextColor="#746dff"
    />
);

export default Input;
