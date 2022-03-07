import { GET_DETAILS, GET_PRODUCTS, SEARCH_PRODUCTS, ORDER_BY_PRICE, FILTER_BY_CATEGORY, GET_CATEGORIES } from "../actions";

const initialState = {
    products: [],
    details: [],
    categories: [],
    filteredProducts: [],

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
                return { ...state, filteredProducts: [...state.filteredProducts].sort((prev, next) => next.price - prev.price), products: [...state.products].sort((prev, next) => next.price - prev.price) }
            }
            break;
        case GET_CATEGORIES:
            return { ...state, categories: action.payload }
        case FILTER_BY_CATEGORY:
            if(action.payload === "default"){
                return {...state, filteredProducts: state.products}
            }
            return { ...state, filteredProducts: state.products.filter(product => product.category === action.payload) }
        default:
            return state;
    }
}