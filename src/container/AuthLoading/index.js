import React, { useEffect } from "react";
import { View, ActivityIndicator, AsyncStorage } from "react-native";

import { styles } from "./styles";

const AuthLoading = ({ navigation }) => {
    useEffect(() => {
        AsyncStorage.getItem("token").then((token) => {
            navigation.navigate(token ? "Home" : "Login");
        });
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator color="#6c63ff" size="large" />
        </View>
    );
};

export default AuthLoading;
