import axios from 'axios';
import {} from 'redux-promise-middleware'
//initial state
const initialState = {
    trip: null
}


//constants
const ADD_BREWERIES = 'ADD_BREWERIES';
const ADD_CITIES = 'ADD_CITIES';




//action creator
export function addBreweriesToTrip (breweries) {
    return {
        type: ADD_BREWERIES,
        payload: breweries
    };
};
    
export function addCitiesToTrip(cities) {
    return {
        type: ADD_CITIES,
        payload: cities
    }
}






//reducer
export default function reducer (state = initialState, action) {
    switch (action.type) {
        case ADD_BREWERIES:
            return {
                ...state,
                breweries: action.payload
            }
        case ADD_CITIES:
            return {
                ...state, 
                cities: action.payload
            }
        default:
            return state;
    }
}