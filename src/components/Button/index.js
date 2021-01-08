import React from "react";
import { TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";

const Button = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
        <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
);

export default Button;
