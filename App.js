import React from "react";
import { Provider } from "react-redux";

import App from "./src";
import store from "./src/redux/store";

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);
