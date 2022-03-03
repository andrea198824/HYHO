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
        
        default: return state;
    }
}

export default rootReducer