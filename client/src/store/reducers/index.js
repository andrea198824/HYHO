import { GET_DETAILS, GET_PRODUCTS, SEARCH_PRODUCTS, ORDER_BY_PRICE } from "../actions";

const initialState = {
    products: [],
    searchProducts: [],
    details: [],

}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...state, products: action.payload }
        case SEARCH_PRODUCTS:
            return { ...state, searchProducts: state.products.filter(item => item.fullname.toLowerCase().includes(action.payload.toLowerCase())) }
        case GET_DETAILS:
            return { ...state, details: state.products.filter(item => item.id === parseInt(action.payload))}
        case ORDER_BY_PRICE : 
            if(action.payload === 'desc'){
                 return {...state, products: [...state.products].sort((prev,next) => prev.price - next.price)}
               }
                  
            if(action.payload === 'asc'){
                return {...state, products: [...state.products].sort((prev,next) => next.price - prev.price)}
                } 
        default:
            return state;
    }
}