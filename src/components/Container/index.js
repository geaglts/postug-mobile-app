import React from "react";
import { View, KeyboardAvoidingView, Image } from "react-native";

import Button from "../Button";
import Link from "../Link";

import { styles } from "./styles";

const Container = ({
    children,
    pressButton,
    linkNavigate,
    navigation,
    imagen,
    labelLink,
    labelButton,
}) => {
    return (
        <View style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 11, marginTop: "5.8%" }}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={imagen}
                        style={{
                            height: "80%",
                            marginTop: "10%",
                            resizeMode: "contain",
                        }}
                    ></Image>
                </View>
                <View style={styles.inputsContainer}>{children}</View>
            </KeyboardAvoidingView>
            <View style={styles.buttonContainer}>
                <Button title={labelButton} onPress={pressButton} />
                <Link
                    onPress={() => {
                        navigation.navigate(linkNavigate);
                    }}
                    label={labelLink}
                />
            </View>
        </View>
    );
};

export default Container;
