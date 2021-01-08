import React, { useEffect } from "react";
import { View, ScrollView, Alert } from "react-native";

// Redux
import { connect } from "react-redux";
import { getPosts } from "../../redux";

// Componentes propios
import { Button, Card, LoadingView } from "../../components";

// Estilos
import { styles } from "./styles";

// Muestra la lista de post cuando ya esten disponibles
const PostListView = ({ posts, navigation }) => {
    // Contenedor de la lista
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 90 }}>
                {/* Lista de posts */}
                <ScrollView>
                    {/* Saca los post del arreglo */}
                    {posts.map((item) => (
                        <View
                            key={item.idpost}
                            style={styles.cardViewContainer}
                        >
                            {/* Genera una targeta por cada post que encuentre */}
                            <Card item={item} navigation={navigation} />
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
                <View style={{ flexDirection: "row" }}>
                    {/* Renderiza el boton de "nuevo" */}
                    <Button
                        title="nuevo"
                        onPress={() => {
                            navigation.navigate("FormPost");
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

// Muestra un mensaje si los post no se cargan
const ErrorView = ({ error, navigation }) => (
    <View>
        {Alert.alert("Error", error, [
            {
                text: "OK",
                onPress: () => {
                    navigation.navigate("Login");
                },
            },
        ])}
    </View>
);

// Funcion principal del componente
function Home({ post, getPosts, navigation }) {
    useEffect(getPosts, []);

    return post.loading ? (
        // Muestra una pantalla de carga al momento de traer los datos del servidor
        <LoadingView />
    ) : post.error !== "" ? (
        // Si ocurre un error salta una alerta
        <ErrorView error={post.error} navigation={navigation} />
    ) : (
        // Si todo sale bien se muestra el componente de la vista
        <PostListView posts={post.posts} navigation={navigation} />
    );
}

// Mapeo del estado del componente como propiedades
const mapStateToProps = (state) => {
    return { post: state.post };
};

// Mapeo de las funciones de redux como propiedades
const mapDispatchToProps = (dispatch) => ({
    getPosts: () => {
        dispatch(getPosts());
    },
});

// Conexion del componente con Redux
export default connect(mapStateToProps, mapDispatchToProps)(Home);
