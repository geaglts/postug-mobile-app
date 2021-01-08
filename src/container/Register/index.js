// Librerias de React para que todo funcione
import React from "react";
import { Alert, Platform, ToastAndroid } from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
// Acciones de redux
import { register, endRequest } from "../../redux";

// Mis componentes
import { TextInput, Container, LoadingView } from "../../components";

// Custom hooks
import useForm from "../../hooks/useForm";

// Componente Principal
export default function Register({ navigation }) {
    // Variables del estado de redux
    const { loading, error } = useSelector((state) => state.session);

    // declaracion de useDispatch
    const dispatch = useDispatch();

    // Estado inicial de los inputs
    const initialState = {
        username: "",
        email: "",
        pass: "",
    };

    // Funcion que se ejecuta al pulsar el boton de registrar
    const onSubmit = async (values) => {
        if (
            values.username !== "" &&
            values.email !== "" &&
            values.pass !== ""
        ) {
            // Despacha la accion de login de redux
            dispatch(register(values, navigation));
        } else {
            Platform.OS === "ios"
                ? Alert.alert("Importante", "No puede dejar campos vacios")
                : ToastAndroid.show(
                      "No puede dejar campos vacios",
                      ToastAndroid.SHORT
                  );
        }
    };

    // Declaracion del hook useForm
    const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

    // Si esta cargando
    return loading ? (
        // Muestra el componente de carga
        <LoadingView />
    ) : error !== "" ? (
        // Si los datos no son correctos le menda un mensaje de error
        <>
            {Alert.alert(null, error, [
                {
                    text: "OK",
                    onPress: () => {
                        dispatch(endRequest());
                        navigation.navigate("Register");
                    },
                },
            ])}
        </>
    ) : (
        // Si no se esta cargando nada muestra el formulario de login
        <Container
            initialState={initialState}
            action={onSubmit}
            linkNavigate="Login"
            navigation={navigation}
            pressButton={handleSubmit}
            imagen={require("../../../assets/register.png")}
            labelButton="Registrar"
            labelLink="Ya tengo una cuenta"
        >
            {/* El contenedor recibe los inputs */}
            {/* Input para el nombre de usuario */}
            <TextInput
                placeholder="nombre de usuario"
                value={inputs.username}
                onChangeText={subscribe("username")}
            />
            {/* Input para el correo electronico */}
            <TextInput
                placeholder="correo electronico"
                type="emailAddress"
                value={inputs.email}
                onChangeText={subscribe("email")}
            />
            {/* Input para la contraseña */}
            <TextInput
                placeholder="contraseña"
                secure={true}
                type="password"
                value={inputs.pass}
                onChangeText={subscribe("pass")}
            />
        </Container>
    );
}
