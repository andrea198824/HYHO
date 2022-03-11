import axios from 'axios';
import { products, productCategory } from '../../data.js'

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const GET_DETAILS = 'GET_DETAILS';
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const ADD_TO_CART = 'ADD_TO_CART';


export const getProducts = () => {
    return {
        type: GET_PRODUCTS,
        payload: products,
    }
}
export const getCategories = () => {
    return {
        type: GET_CATEGORIES,
        payload: productCategory
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
export const orderByPrice = (type) => {
    return {
        type: ORDER_BY_PRICE,
        payload: type,
    }
}
export const filterByCategory = (category) => {
    return {
        type: FILTER_BY_CATEGORY,
        payload: parseInt(category),
    }
}

export const addToCart = (productID) => {
    return {
        type: ADD_TO_CART,
        payload: productID,
    }
}

