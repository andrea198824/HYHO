import axios from "axios";
import { useState } from "react";

export function getAllTemperaments(){
    return async function (dispatch){
        try {
            var json = await axios.get("http://localhost:3001/temperament");
            return dispatch({
                type: 'GET_ALLTEMPERAMENTS',
                payload: json.data
            })   
        } catch (error) {
            return dispatch({
                type: 'GET_ALLTEMPERAMENTS',
                payload: error
            })   
        }

    }
}

export function getAllBreeds(){
    return async function (dispatch){
        try {
            var json = await axios.get("http://localhost:3001/dogs");
            return dispatch({
                type: 'GET_ALLBREEDS',
                payload: json.data
            })   
        } catch (error) {
            return dispatch({
                type: 'GET_ALLBREEDS',
                payload: error
            })   
        }

    }
}

export function getDetail (id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/dogs/" + id);

            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (err) {
            return dispatch({
                type: 'GET_DETAILS',
                payload: err
            })   
        }
    }
}

export function setTemperaments(payload) {
    return {
        type: 'SET_TEMPERAMENTS',
        payload
    }
}

export function resetStore(payload) {
    return {
        type: 'RESET_STORE',
        // payload
    }
}

export function setBreeds(payload) {
    // // console.log('payload', payload)
    return {
        type: 'SET_BREEDS',
        payload
    }
}

export function postBreed(payload) {
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/dog",payload);
        // // console.log(response)
        return response;
    }
}