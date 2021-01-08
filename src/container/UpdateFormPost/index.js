import React from "react";
import { View, Image, KeyboardAvoidingView, Alert } from "react-native";

// Redux
import { connect } from "react-redux";
import { updatePost } from "../../redux/";

// Custom hooks
import useForm from "../../hooks/useForm";

// Mis componentes
import { TextInput, Button, LoadingView } from "../../components/";

function UpdateFormPost({
    post,
    updatePost,
    navigation,
    loading,
    mensaje,
    error,
}) {
    //Estado inicial de los inputs
    const initialState = {
        idpost: post.idpost,
        nombre: post.nombre,
        descripcion: post.descripcion,
    };

    // Aqui ira la funcion de actualizar el registro
    const onSubmit = (values) => {
        updatePost(values);
    };

    // useForm para el manejo del formulario
    const { handleSubmit, inputs, subscribe } = useForm(initialState, onSubmit);

    if (loading) {
        return <LoadingView />;
    } else if (error !== "") {
        <>
            {Alert.alert(null, error, [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.navigate("Home");
                    },
                },
            ])}
        </>;
    } else if (mensaje !== "") {
        return (
            <>
                {Alert.alert(null, mensaje, [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.navigate("AuthLoading");
                        },
                    },
                ])}
            </>
        );
    } else {
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                {/* Contenedor de la imagen */}
                <View
                    style={{
                        flex: 4,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        source={require("../../../assets/ImageOfUpdatePost.png")}
                        style={{
                            height: "100%",
                            resizeMode: "contain",
                        }}
                    />
                </View>
                {/* Contenedor de los inputs */}
                <View
                    style={{
                        flex: 5,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TextInput
                        placeholder="nombre"
                        onChangeText={subscribe("nombre")}
                        value={inputs.nombre}
                    />
                    <TextInput
                        placeholder="descripcion"
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={subscribe("descripcion")}
                        value={inputs.descripcion}
                        styleInput={{
                            textAlignVertical: "top",
                        }}
                    />
                </View>
                {/* Contenedor del boton de guardar */}
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button title="Guardar" onPress={handleSubmit} />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

//Saca el post especifico del estado
const mapStateToProps = (state) => {
    return {
        post: state.post.post,
        loading: state.post.loading,
        mensaje: state.post.mensaje,
        error: state.post.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePost: (post) => {
            dispatch(updatePost(post));
        },
    };
};

//Conecta el componente con redux y extrae el estado
export default connect(mapStateToProps, mapDispatchToProps)(UpdateFormPost);
