import axios from "axios";
import { AsyncStorage, Alert } from "react-native";

import { START_REQUEST, END_REQUEST, REQUEST_FAILURE } from "./sessionTypes";

// Solicitud de inicio

const startRequest = () => {
    return {
        type: START_REQUEST
    };
};

// Solicitud de fin

export const endRequest = () => {
    return {
        type: END_REQUEST
    };
};

// Ocurrio un problema al realizar la solicitud

const requestFailure = error => {
    return {
        type: REQUEST_FAILURE,
        payload: error
    };
};

//!FUNCION DE LOGIN
export const login = (values, navigation) => async dispatch => {
    dispatch(startRequest());
    // Peticion al servidor
    const { data: response } = await axios.post(
        "https://postug.herokuapp.com/api/auth/login",
        values
    );

    //Extrae el token del resultado de la peticion
    const { token } = response;

    if (token) {
        try {
            // Guarda el token en memoria
            await AsyncStorage.setItem("token", token);
            // Va al Home y termina la solicitud
            // Si todo salio bien
            navigation.navigate("Home");
            dispatch(endRequest());
        } catch (e) {
            console.log("error en login: ", e);
            // Si ocurre un error al guardar el token le mande un mensaje
            dispatch(requestFailure("No se que paso"));
        }
    } else {
        // Si no metio los datos bien le envia un mensaje
        dispatch(requestFailure(response));
    }
};

//!FUNCION DE REGISTRO
export const register = (values, navigation) => async dispatch => {
    // Despacha el la solicitud de inicio
    dispatch(startRequest());

    // Hace una peticion post al servidor con los datos de los inputs
    const { data: response } = await axios.post(
        "https://postug.herokuapp.com/api/auth/register",
        values
    );

    if (response !== "registro exitoso") {
        // Si la respuesta del servidor no fue "registro exitoso"
        // Despacha la funcion de que ocurrio un error en la solicitud
        dispatch(requestFailure(response));
    } else {
        // Si todo salio bien regresa al login
        Alert.alert(null, response, [
            {
                title: "ok",
                onPress: () => {
                    // Despacha la funcion de que se pudo registrar el usuario
                    dispatch(endRequest());
                    navigation.navigate("Login");
                }
            }
        ]);
    }
};
