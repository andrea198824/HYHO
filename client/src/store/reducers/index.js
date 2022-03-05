import { GET_PRODUCTS, SEARCH_PRODUCTS } from "../actions";

const initialState = {
    products: [],
    searchProducts: [],

}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {...state, products: action.payload}
        case SEARCH_PRODUCTS:
            return {...state, searchProducts: state.products.filter(item => item.fullname.toLowerCase().includes(action.payload.toLowerCase()))}
        default:
            return state;
    }
}