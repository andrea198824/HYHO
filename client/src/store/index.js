import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {
    products: [],
    details: [],
    categories: [],
    filteredProducts: [],
    shoppingCart: [],
}
const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(thunk)));

export default store;