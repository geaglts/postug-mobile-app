import { START_REQUEST, END_REQUEST, REQUEST_FAILURE } from "./sessionTypes";

const initialState = {
    loading: false,
    error: ""
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_REQUEST:
            return {
                ...state,
                loading: true
            };
        case REQUEST_FAILURE:
            return {
                loading: false,
                error: action.payload
            };
        case END_REQUEST:
            return {
                loading: false,
                error: ""
            };
        default:
            return state;
    }
};

export default sessionReducer;
