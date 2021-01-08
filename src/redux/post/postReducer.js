import {
    POST_REQUEST,
    POST_GET_SUCCESS,
    POST_GET_FAILURE,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAILURE,
    SET_POST,
} from "./postTypes";

const initialState = {
    posts: [],
    loading: false,
    error: "",
    idpost: "",
    post: {},
    mensaje: "",
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case POST_GET_SUCCESS:
            return {
                posts: action.payload,
                loading: false,
                error: "",
            };
        case POST_GET_FAILURE:
            return {
                posts: [],
                loading: false,
                error: action.payload,
            };
        case SET_POST: {
            const post = state.posts.filter(
                (post) => post.idpost === action.payload
            );
            return {
                ...state,
                post: post[0],
                error: "",
                mensaje: "",
                loading: false,
            };
        }
        case POST_UPDATE_SUCCESS:
            return {
                ...state,
                mensaje: action.payload,
                loading: false,
            };
        case POST_UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default postReducer;
