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