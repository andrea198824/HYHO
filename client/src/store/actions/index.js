import axios from 'axios';
import { products, productCategory } from '../../data.js'

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const GET_DETAILS = 'GET_DETAILS';

export const ORDER_BY_PRICE = "ORDER_BY_PRICE"
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY"
export const GET_CATEGORIES = "GET_CATEGORIES"
export const ADD_TO_CART = 'ADD_TO_CART';
export const CREATE_ADMIN = 'CREATE_ADMIN';
export const POST_CART_INFO = 'POST_CART_INFO';
export const GET_TOKEN = 'GET_TOKEN';
export const ADD_USER = 'ADD_USER';
export const MODIFY_QUANTITY = 'MODIFY_QUANTITY';
export const MODIFY_QUANTITY_DETAILS = 'MODIFY_QUANTITY_DETAILS';
export const ADD_TO_CART_FROM_DETAILS = 'ADD_TO_CART_FROM_DETAILS';
export const GET_SHOP_CART = 'GET_SHOP_CART';
export const CONCAT_SHOP_CART = 'CONCAT_SHOP_CART';
export const DELETE_SHOP_CART = 'DELETE_SHOP_CART';
export const PUT_SHOP_CART = 'PUT_SHOP_CART';
export const DELETE_LOCAL_SHOP_CART = 'DELETE_LOCAL_SHOP_CAR';
export const COMPARE_PRODUCTS_SHOP_CART = 'COMPARE_PRODUCTS_SHOP_CART';
export const MODIFY_USER = 'MODIFY_USER'


export const modifyuser = (data, user, token) => {
    let shipping_address = {
        street: data.street,
        number: data.number,
        state: data.state,
        city: data.city
     }
    //console.log('desde Action',data, token)
    return async function (dispatch) {
        const response = await axios.put('/modify-user', {
            email: user.email,
            nickname: user.nickname,
            picture: user.picture,
            given_name: user.given_name,
            family_name: user.family_name,
            billing_address: 'x',
            shipping_address: JSON.stringify(shipping_address),
            phone: data.phone

        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        dispatch({
            type: MODIFY_USER,
            payload: response
        })

    }
}



export const getProducts = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get('/products')
            dispatch({
                type: GET_PRODUCTS,
                payload: response.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}
export const getCategories = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get('/category')
            dispatch({
                type: GET_CATEGORIES,
                payload: response.data
            })
        } catch (err) {
            console.log(err)
        }
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
        payload: category,
    }
}

export const createadmin = (payload) => {
    return async function (dispatch) {
        const response = axios.post('/create-admin', payload)
        dispatch({
            type: CREATE_ADMIN,
            payload: response
        })
    }
}

export const getToken = (token) => {
    return {
        type: GET_TOKEN,
        payload: token
    }
}

export const addUser = (data, token) => {
    return async function (dispatch) {
        try {
            const response = await axios.post('/register', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }

            })
            dispatch({
                type: ADD_USER,
                payload: response
            })
        } catch (err) {
            return
        }
    }
}
export const addToCart = (productID) => {
    return {
        type: ADD_TO_CART,
        payload: productID
    }
}

export const modifyQuantity = (id, value) => {
    return {
        type: MODIFY_QUANTITY,
        id,
        value
    }
}

export const modifyQuantityDetails = (value) => {
    return {
        type: MODIFY_QUANTITY_DETAILS,
        value
    }
}

export const addToCartFromDetails = (details) => {
    return {
        type: ADD_TO_CART_FROM_DETAILS,
        payload: details
    }
}


export const getShopCart = (email, token) => {
    return async function (dispatch) {
        const response = await axios.get(`/cart/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        dispatch({
            type: GET_SHOP_CART,
            payload: response.data
        })
    }
}

export const postShopCart = (email, cart, token) => {
    cart = JSON.stringify(cart)
    return async function (dispatch) {
        const response = await axios.post('/cart', { email, cart }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        dispatch({
            type: POST_CART_INFO,
            payload: response
        })
    }
}

export const putShopCart = (email, cart, token) => {
    cart = JSON.stringify(cart)
    return async function (dispatch) {
        const response = await axios.put('/putCart', { email, cart }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        dispatch({
            type: PUT_SHOP_CART,
            payload: response
        })
    }
}

export const concatShopCart = () => {

}

export const deleteShopCart = (email, token) => {
    return async function (dispatch) {
        const response = await axios.delete(`/deleteCart`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                email
            }
        })
        dispatch({
            type: DELETE_SHOP_CART,
            payload: response
        })
    }
}

export const deleteLocalShopCart = () => {
    return {
        type: DELETE_LOCAL_SHOP_CART
    }
}

export const compareProductsShopCart = () => {
    return {
        type: COMPARE_PRODUCTS_SHOP_CART,
    }
}



