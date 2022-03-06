import axios from 'axios';
import { products } from '../../data.js'

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS'
export const GET_DETAILS = 'GET_DETAILS';
export const ORDER_BY_PRICE = "ORDER_BY_PRICE"

export const getProducts = () => {
    return {
        type: GET_PRODUCTS,
        payload: products,
    }
}


export const searchProducts = (input) => {
    return {
        type: SEARCH_PRODUCTS,
        payload: input,
    }
}

export const getDetails = (id) => {
    return {
        type: GET_DETAILS,
        payload: id,
    }
}
export const orderByPrice = (type) =>{
    return{
        type: ORDER_BY_PRICE,
        payload: type,
    }
}