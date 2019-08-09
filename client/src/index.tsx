import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import "./config/appConfig";
import { persistor, store } from "./config/redux";
import apiClient from "./network/apiClient";


const onBeforeLift = () => {
    apiClient.setAuthTokenInHeader(store.getState().auth.token);
};



ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} onBeforeLift={onBeforeLift}>
            <App />
        </PersistGate>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
