import React from 'react';
import ReactDOM from 'react-dom';
// import { Auth0Provider } from '@auth0/auth0-react'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/index'
//import dotenv from "dotenv";
//dotenv.config();
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            {/* <Auth0Provider
                domain='dev-6-pd01tf.us.auth0.com'
                clientId='CoqjB60NK71zxNxmcmcxX9kXZVQ5l4C0'
                redirectUri={window.location.origin}
            > */}
            <App />
            {/* </Auth0Provider> */}
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
