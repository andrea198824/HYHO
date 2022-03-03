const initialState = {
    allBreeds : [],
    allTemperaments: [],
    breeds : [],
    temperaments: [],
    details: {},
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALLTEMPERAMENTS':
            return {
                ...state,
                allTemperaments: action.payload,
                temperaments: action.payload
            }
        case 'GET_ALLBREEDS':
            return {
                ...state,
                allBreeds: action.payload,
                breeds: action.payload
            }
        case 'SET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }
        case 'SET_BREEDS':
            return {
                ...state,
                breeds: action.payload
            }
        case 'GET_DETAILS':
            return {
                ...state,
                details: action.payload[0]
            }
        case 'RESET_STORE':
            return {
                ...state,
                allBreeds : [],
                allTemperaments: [],
                breeds : [],
                temperaments: []
            }
        default: return state;
    }
}

export default rootReducer