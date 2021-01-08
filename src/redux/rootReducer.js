import { combineReducers } from "redux";
import postReducer from "./post/postReducer";
import sessionReducer from "./session/sessionReducer";

const rootReducer = combineReducers({
    post: postReducer,
    session: sessionReducer
});

export default rootReducer;
