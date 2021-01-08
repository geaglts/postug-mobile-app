import React from "react";
import { TouchableOpacity, Text } from "react-native";

import { styles } from "./style";

const Link = ({ onPress, label, colorFont }) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.4}
        style={[styles.container]}
    >
        <Text
            style={[
                styles.link,
                colorFont ? { color: colorFont } : { color: "#6c63ff" },
            ]}
        >
            {label}
        </Text>
    </TouchableOpacity>
);

export default Link;
