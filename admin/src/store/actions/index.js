import axios from 'axios';
// import { products, productCategory } from '../../data.js'

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const PUT_PRODUCT = 'PUT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const GET_DETAILS = 'GET_DETAILS';

export const ORDER_BY_PRICE = "ORDER_BY_PRICE";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const GET_CATEGORIES = "GET_CATEGORIES";

export const CREATE_ADMIN = 'CREATE_ADMIN';
export const GET_TOKEN = 'GET_TOKEN';

export const GET_USERS = 'GET_USERS';
export const ADD_USER = 'ADD_USER';
// export const PUT_USER = 'PUT_USER';
// export const DELETE_USER = 'DELETE_USER';

// export const GET_ORDERS = 'GET_ORDERS';
export const GET_NEWSLETTER = 'GET_NEWSLETTER';
export const DONATE_PRODUCT = 'DONATE_PRODUCT';
export const GET_DONATION = " GET_DONATION" ;

export const getProducts = () => {
    return async function (dispatch) {
      try {
        const products = await axios.get('/products')
        dispatch({
           type: GET_PRODUCTS,
           payload: products.data,
        })
      } catch (err) {
          console.log(err)
      }
    }
}

export const getDonation = (token) => {
    return async function (dispatch) {
      try {
        const products = await axios.get('/donate-products', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        dispatch({
           type: GET_DONATION,
           payload: products.data,
        })
      } catch (err) {
          console.log(err)
      }
    }
}

export const addProduct = (payload, token) => {
    console.log(payload, token)
    return async function (dispatch) {
        try {
            const response = await axios.post('/product', {
                formId: payload.formId,
                title: payload.title,
                price: payload.price,
                weight: payload.weight,
                descriptions: payload.descriptions,
                image: payload.image,
                stock: payload.stock,
                category: payload.category,
            }, {
               headers: {
                   Authorization: `Bearer ${token}`,
               }
           })
           dispatch({
               type: ADD_PRODUCT,
               payload: response
           })
       }  catch (err) {
           console.log(err)
       }
    }
}

export const putProduct = (id, data, token) => {
    return async function (dispatch) {
        try {
            const response = await axios.put(`/product/modify/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            dispatch({
                type: PUT_PRODUCT,
                payload: response,
            })
        }  catch (err) {
            console.log(err)
        }
    }
}

export const deleteProduct = (id, token) => {
    return async function (dispatch) {
        try {
            const response = await axios.delete(`/product/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            dispatch({
                type: DELETE_PRODUCT,
                payload: id,
            })
        }  catch (err) {
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
        payload: parseInt(category),
    }
}

export const createadmin = (payload, token) => {
    return async function (dispatch) {
        try {
            const response = axios.post('/create-admin', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            dispatch({
                type: CREATE_ADMIN,
                payload: response
            })
        }  catch (err) {
            console.log(err)
        }
    }
}


export const getToken = (token) => {
    return {
        type: GET_TOKEN,
        payload: token
    }
}

export const getUsers = (token) => {
    return async function (dispatch) {
        try {
            const users = await axios.get('/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            dispatch({
               type: GET_USERS,
               payload: users.data,
            })
        }  catch (err) {
            console.log(err)
        }
    }
}

export const addUser = (data, token) => {
    console.log(`Bearer ${token}`)
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
        }  catch (err) {
            console.log(err)
        }
    }
}

// export const putUser = (id, data, token) => {
//     return async function (dispatch) {
//         try {
//            const response = await axios.put(`/modify-user/${id}`, data, {
//                headers: {
//                    Authorization: `Bearer ${token}`,
//                }
//            })
//            dispatch({
//                type: PUT_USER,
//                payload: response,
//            })
//         }  catch (err) {
//             console.log(err)
//         }
//     }
// }

// export const deletetUser = (id, data, token) => {
// }

export const getNewsletter = (token) => {
    return async function (dispatch) {
        try {
           const response = await axios.get('/newsletter', {
               headers: {
                   Authorization: `Bearer ${token}`,
               }
           })
           dispatch({
              type: GET_NEWSLETTER,
              payload: response.data,
           })
        }  catch (err) {
            console.log(err)
        }
    }

}

export const donateProduct = (token) => {
    return async function (dispatch) {
        try {
            const products = await axios.get('/donate-products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            dispatch({
               type: DONATE_PRODUCT,
               payload: products,
            })
        }  catch (err) {
            console.log(err)
        }
    }
}

// export const getOrders = (token) => {


// }