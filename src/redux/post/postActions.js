import {
    POST_REQUEST,
    POST_GET_SUCCESS,
    POST_GET_FAILURE,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAILURE,
    SET_POST,
} from "./postTypes";
import axios from "axios";
import { AsyncStorage, Alert } from "react-native";

//Acciones para la peticion get de los posts
const postRequest = () => {
    return {
        type: POST_REQUEST,
    };
};

const postGetSuccess = (posts) => {
    return {
        type: POST_GET_SUCCESS,
        payload: posts,
    };
};

const postGetFailure = (error) => {
    return {
        type: POST_GET_FAILURE,
        payload: error,
    };
};

// Accion de la funcion para traer un post
export const setPost = (idpost) => {
    return {
        type: SET_POST,
        payload: idpost,
    };
};

//funcion para hacer traer los posts
export const getPosts = (_) => async (dispatch) => {
    dispatch(postRequest());

    const token = await AsyncStorage.getItem("token");

    !token
        ? Alert.alert(null, "No deberias estar aqui")
        : axios
              .get("https://postug.herokuapp.com/api/post", {
                  headers: {
                      authorization: token,
                  },
              })
              .then((posts) => {
                  dispatch(postGetSuccess(posts.data));
              })
              .catch((e) => {
                  dispatch(
                      postGetFailure(
                          "No pudimos conectarnos al servidor, intentelo mas tarde"
                      )
                  );
              });
};

// Acciones para la funcion de actualizacion del post
const postUpdateRequest = () => {
    return {
        type: POST_UPDATE_REQUEST,
    };
};

const postUpdateSuccess = (mensaje) => {
    return {
        type: POST_UPDATE_SUCCESS,
        payload: mensaje,
    };
};

const postUpdateFailure = (error) => {
    return {
        type: POST_UPDATE_FAILURE,
        payload: error,
    };
};

//Funcion para actualizar el post
export const updatePost = (post) => async (dispatch) => {
    dispatch(postRequest());

    const token = await AsyncStorage.getItem("token");

    !token
        ? Alert.alert(null, "No deberias estar aqui")
        : axios
              .put(
                  `https://postug.herokuapp.com/api/post/${post.idpost}`,
                  { nombre: post.nombre, descripcion: post.descripcion },
                  {
                      headers: {
                          authorization: token,
                      },
                  }
              )
              .then((response) => {
                  dispatch(postUpdateSuccess(response.data));
              })
              .catch((e) => {
                  console.log(e);
                  dispatch(postUpdateFailure("Esto no debio pasar"));
              });
};
