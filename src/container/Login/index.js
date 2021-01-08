// Librerias de React para que todo funcione bien
import React from "react";
import { Alert, ToastAndroid, Platform } from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
// Funciones de la session
import { login, endRequest } from "../../redux";

// Mis componentes
import { TextInput, Container, LoadingView } from "../../components";

// Custom Hooks
import useForm from "../../hooks/useForm";

//Componente principal
export default function Login({ navigation }) {
    // Variables del estado de redux
    const { loading, error } = useSelector((state) => state.session);

    // Hook para despachar acciones
    const dispatch = useDispatch();

    //Estado inicial para los inputs
    const initialState = {
        email: "",
        pass: "",
    };

    //Funcion que se ejecuta al pulsar el boton
    const onSubmit = async (values) => {
        if (values.email !== "" && values.pass !== "") {
            // Despacha la accion de login de redux
            dispatch(login(values, navigation));
        } else {
            Platform.OS === "ios"
                ? Alert.alert("Importante", "No puede dejar campos vacios")
                : ToastAndroid.show(
                      "No puede dejar campos vacios",
                      ToastAndroid.SHORT
                  );
        }
    };

    // Declaracion del custom hook
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
                        navigation.navigate("AuthLoading");
                    },
                },
            ])}
        </>
    ) : (
        // Si no se esta cargando nada muestra el formulario de login
        <Container
            initialState={initialState}
            action={onSubmit}
            pressButton={handleSubmit}
            linkNavigate="Register"
            navigation={navigation}
            imagen={require("../../../assets/login.png")}
            labelButton="Iniciar sesion"
            labelLink="Registrarse"
        >
            {/* El contenedor recibe los inputs */}
            {/* Input de correo electronico */}
            <TextInput
                placeholder="correo electronico"
                type="emailAddress"
                value={inputs.email}
                onChangeText={subscribe("email")}
            />
            {/* Input de la pass */}
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
