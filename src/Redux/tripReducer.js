
//initial state
const initialState = {
    trip: null
}


//constants
const ADD_CITIES = 'ADD_CITIES';




//action creator
export function addCitiesToTrip(cities) {
    return {
        type: ADD_CITIES,
        payload: cities
    }
}








//reducer
export default function reducer (state = initialState, action) {
    switch (action.type) {
        case ADD_CITIES:
            return {
                ...state, 
                cities: action.payload
            }
        default:
            return state;
    }
}