import {
    GET_DETAILS,
    GET_PRODUCTS,
    SEARCH_PRODUCTS,
    ORDER_BY_PRICE,
    FILTER_BY_CATEGORY,
    GET_CATEGORIES,
    CREATE_USER,
    CREATE_ADMIN,
    LOGIN_USER,
    ADD_TO_CART,
    LOGOUT_USER,
    GET_USER_STATUS
} from "../actions";

const initialState = {
    products: [],
    details: [],
    categories: [],
    filteredProducts: [],
    shoppingCart: JSON.parse(localStorage.getItem('shoppingCart')) || [],
    userIsLogin: false,
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...state, products: action.payload }
        case SEARCH_PRODUCTS:
            return { ...state, filteredProducts: state.products.filter(item => item.fullname.toLowerCase().includes(action.payload.toLowerCase())) }
        case GET_DETAILS:
            return { ...state, details: state.products.filter(item => item.id === parseInt(action.payload)) }
        case ORDER_BY_PRICE:
            if (action.payload === 'desc') {
                return { ...state, filteredProducts: [...state.filteredProducts].sort((prev, next) => prev.price - next.price), products: [...state.products].sort((prev, next) => prev.price - next.price) }
            }

            if (action.payload === 'asc') {
                return { ...state, filteredProducts: [...state.filteredProducts].sort((prev, next) => next.price - prev.price), products: [...state.products].sort((prev, next) => next.price - prev.price) };
            }
            break;
        case GET_CATEGORIES:
            return { ...state, categories: action.payload };
        case FILTER_BY_CATEGORY:
            if (action.payload === "default") {
                return { ...state, filteredProducts: state.products };
            }
            return { ...state, filteredProducts: state.products.filter(product => product.category === action.payload) }
        case CREATE_USER:
            return state;
        case LOGIN_USER:
            console.log("LOGIN - REDUCER", action.payload)
            return state;
        case LOGOUT_USER:
            console.log("LOGOUT", action.payload)
            return state;
        case CREATE_ADMIN:
            return state;
        case GET_USER_STATUS:
            console.log(action.payload.data.info)
            return {...state, userIsLogin: true};
        case ADD_TO_CART:
            if (state.shoppingCart.some(el => el.id === parseInt(action.payload))) return state;
            return { ...state, shoppingCart: state.shoppingCart.concat(state.products.filter(product => product.id === parseInt(action.payload))) };
        default:
            return state;
    }
}