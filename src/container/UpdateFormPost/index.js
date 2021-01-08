import React from "react";
import { View, Image, Alert, StyleSheet } from "react-native";

// Styles
const styles = StyleSheet.create({
    flexCenter: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 210,
        height: 210,
        resizeMode: "contain",
    },
    saveButton: {
        position: "absolute",
        bottom: 11,
        left: 10,
    },
});

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
            <View style={{ flex: 1 }}>
                {/* Contenedor de la imagen */}
                <View style={styles.flexCenter}>
                    <Image
                        source={require("../../../assets/ImageOfUpdatePost.png")}
                        style={styles.image}
                    />
                </View>
                {/* Contenedor de los inputs */}
                <View style={styles.flexCenter}>
                    <TextInput
                        placeholder="Titulo de la nota"
                        onChangeText={subscribe("nombre")}
                        value={inputs.nombre}
                    />
                    <TextInput
                        placeholder="Contenido de la nota"
                        multiline={true}
                        numberOfLines={7}
                        onChangeText={subscribe("descripcion")}
                        value={inputs.descripcion}
                        styleInput={{
                            textAlignVertical: "top",
                        }}
                    />
                </View>
                {/* Contenedor del boton de guardar */}
                <View style={styles.flexCenter}>
                    <Button title="Guardar cambios" onPress={handleSubmit} />
                </View>
            </View>
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
