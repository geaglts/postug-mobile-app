import React from "react";
import {
    View,
    KeyboardAvoidingView,
    Image,
    Alert,
    AsyncStorage,
} from "react-native";

// Mis componentes
import { TextInput, Button, Link } from "../../components";

import useForm from "../../hooks/useForm";

import { styles } from "./styles";

function Modal({ navigation }) {
    const initialState = {
        nombre: "",
        descripcion: "",
    };

    const onSubmitAdd = async (values) => {
        const token = await AsyncStorage.getItem("token");

        if (token === null) {
            return console.log("no deberias estar aqui");
        }

        const data = await fetch("https://postug.herokuapp.com/api/post", {
            method: "POST",
            headers: {
                authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        const json = await data.json();

        json !== "guardado exitoso"
            ? Alert.alert("Estado", json)
            : navigation.navigate("Home");
    };

    const onSubmitUpdate = (idpost) => {
        navigation.navigate("Home");
    };

    const { subscribe, inputs, handleSubmit } = useForm(
        initialState,
        onSubmitAdd,
        onSubmitUpdate
    );

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 11, marginTop: "5.8%" }}
            >
                <View style={styles.salirContainer}>
                    <Link
                        onPress={() => {
                            navigation.navigate("Home");
                        }}
                        label="regresar"
                    />
                </View>
                {/* Contenedor la imagen */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../../../assets/newpost.png")}
                        style={{
                            height: 220,
                            width: 220,
                            resizeMode: "contain",
                        }}
                    ></Image>
                </View>
                {/* Contenedor de los inputs */}
                <View style={styles.inputsContainer}>
                    <TextInput
                        placeholder="Titulo de la nota"
                        value={inputs.nombre}
                        onChangeText={subscribe("nombre")}
                    />
                    <TextInput
                        styleInput={{
                            textAlignVertical: "top",
                            paddingVertical: 12,
                        }}
                        multiline={true}
                        numberOfLines={7}
                        placeholder="Contenido de la nota"
                        value={inputs.descripcion}
                        onChangeText={subscribe("descripcion")}
                    />
                </View>
            </KeyboardAvoidingView>
            {/* Contenedor del los botones */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Agregar Nota"
                    onPress={() => {
                        handleSubmit();
                    }}
                />
            </View>
        </View>
    );
}

export default Modal;
