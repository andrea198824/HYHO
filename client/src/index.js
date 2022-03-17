import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/index'
import axios from 'axios';
import { Auth0Provider } from "@auth0/auth0-react";

//axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Auth0Provider
                domain="dev-b75rcpfv.us.auth0.com"
                clientId="NBMOqa8iTFpzpEIMRj8slobadJnL6DuC"
                redirectUri={window.location.origin}
                audience='http://localhost:3001'
                scope="read:current_user"
            >
                <App />
            </Auth0Provider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
