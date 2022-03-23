import {
    GET_PRODUCTS,
    ADD_PRODUCT,
    PUT_PRODUCT,
    DELETE_PRODUCT,
    GET_DETAILS,
    SEARCH_PRODUCTS,
    ORDER_BY_PRICE,
    FILTER_BY_CATEGORY,
    GET_CATEGORIES,
    CREATE_ADMIN,
    GET_TOKEN,
    GET_USERS,
    ADD_USER,
    GET_NEWSLETTER,
    DONATE_PRODUCT,
    GET_DONATION,
} from "../actions";

const initialState = {
    products: [],
    details: [],
    categories: [],
    filteredProducts: [],
    users:[],
    newsletter: [],
    donateProduct: [],
    token: "",
    productsDonate :[],

    shoppingCart: JSON.parse(localStorage.getItem('shoppingCart')) || [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TOKEN:
            return {...state, token:action.payload};
        case GET_PRODUCTS:
            return { ...state, products: action.payload };
            case GET_DONATION:
                return {...state, productsDonate: action.payload};
        case ADD_PRODUCT:
            return { ...state, products: state.products.concat(action.payload)};
        case PUT_PRODUCT:
            return state;
        case DELETE_PRODUCT:
            return {  ...state, products: state.products.filter(
                (product) => product.id != action.payload
              )
            };
        case SEARCH_PRODUCTS:
            return { ...state, filteredProducts: state.products.filter(item => item.fullname.toLowerCase().includes(action.payload.toLowerCase())) };
        case GET_DETAILS:
            return { ...state, details: state.products.filter(item => item.id === parseInt(action.payload)) };
        case ORDER_BY_PRICE:
            if (action.payload === 'desc') {
                return { ...state, filteredProducts: [...state.filteredProducts].sort((prev, next) => prev.price - next.price), products: [...state.products].sort((prev, next) => prev.price - next.price) }
            };

            if (action.payload === 'asc') {
                return { ...state, filteredProducts: [...state.filteredProducts].sort((prev, next) => next.price - prev.price), products: [...state.products].sort((prev, next) => next.price - prev.price) }
            };
            break;
        case GET_CATEGORIES:
            return { ...state, categories: action.payload };
        case FILTER_BY_CATEGORY:
            if (action.payload === "default") {
                return { ...state, filteredProducts: state.products }
            };
            return { ...state, filteredProducts: state.products.filter(product => product.category === action.payload) };
        case CREATE_ADMIN:
            return state;
        // case ADD_TO_CART:
        //     if (state.shoppingCart.some(el => el.id === parseInt(action.payload))) return state;
        //     return { ...state, shoppingCart: state.shoppingCart.concat(state.products.filter(product => product.id === parseInt(action.payload))) };
     
        case GET_USERS: 
            return {...state, users: action.payload  };
        case ADD_USER: 
            return state;
        case GET_NEWSLETTER: 
            return { ...state, newsletter: action.payload };
        case DONATE_PRODUCT: 
            return { ...state, donateProduct: action.payload};
        default:
            return state;
    }
}