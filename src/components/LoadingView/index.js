import React from "react";
import { View, ActivityIndicator } from "react-native";

// Vista de carga
const LoadingView = () => (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator color="#6c63ff" size="large" />
    </View>
);

export default LoadingView;
