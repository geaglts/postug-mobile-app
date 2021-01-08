import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Alert, AsyncStorage } from "react-native";

import { setPost } from "../../redux/";

//Componentes
import Superior from "./Superior";
import Botonera from "./Botonera";

//Estilos de la targeta
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#6c63ff",
        width: "100%",
        flex: 1,
        borderRadius: 2
    }
});

const Card = ({ item, navigation, searchPost }) => {
    //Alerta de confirmacion para eliminar
    const confirmacion = id => {
        Alert.alert("confirmar", "esta seguro que desea eliminar esta nota?", [
            {
                text: "SI",
                onPress: () => {
                    eliminar(id);
                }
            },
            { text: "NO", style: "cancel" }
        ]);
    };

    const eliminar = async id => {
        try {
            const token = await AsyncStorage.getItem("token");

            if (token === null) {
                return console.log("no se que paso");
            }

            await fetch(`https://postug.herokuapp.com/api/post/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: token
                }
            });

            navigation.navigate("AuthLoading");
        } catch (error) {
            Alert.alert(null, "no se que paso");
        }
    };

    const actualizar = idpost => {
        searchPost(idpost);
        navigation.navigate("UpdateScreen");
    };

    return (
        <View style={styles.card}>
            <Superior item={item} />
            <Botonera
                item={item}
                eliminar={() => {
                    confirmacion(item.idpost);
                }}
                actualizar={() => {
                    actualizar(item.idpost);
                }}
            />
        </View>
    );
};

const mapDispatchToProps = dispatch => ({
    searchPost: idpost => dispatch(setPost(idpost))
});

export default connect(null, mapDispatchToProps)(Card);
